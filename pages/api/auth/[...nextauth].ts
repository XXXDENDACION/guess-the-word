import NextAuth, { NextAuthOptions, Session } from "next-auth"
import { JWT } from "next-auth/jwt";
import type { JwtPayload } from "jsonwebtoken";
import dayjs from "dayjs";
// import VKProvider from "next-auth/providers/vk";
import GoogleProvider from "next-auth/providers/google";

import { initializeApollo } from "../../../graphql/apollo";
import { verifyJWT } from "../../../server/common/jwt-helpers";

import {RefreshAccessTokenDocument, SignInDocument} from "@gql-types/generated";
import {UserData, UserMeData} from "@interfaces/user";

const apolloClient = initializeApollo();

export const refreshAccessToken = async (token: JWT) => {
  try {
    const { data } = await apolloClient.query({
      query: RefreshAccessTokenDocument,
      variables: {
        refreshToken: token.refreshToken
      }
    })
    return {
      ...data.refresh
    }
  } catch (err) {
    return {
      ...token, error: "RefreshAccessTokenError"
    }
  }
}

export const authOptions: NextAuthOptions = {
    providers: [
        // VKProvider({
        //   clientId: process.env.VK_ID || '',
        //   clientSecret: process.env.VK_SECRET || '',
        //   authorization: { params: { scope: "openid email profile status" } },
        // }),
        GoogleProvider({
          clientId: process.env.GOOGLE_ID || '',
          clientSecret: process.env.GOOGLE_SECRET || '',
          authorization: {
            params:
              {
                prompt: "consent", access_type: "offline", response_type: "code"
              },
            url: "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code"
          },
          accessTokenUrl: "https://oauth2.googleapis.com/token",
        })
      ],
      secret: process.env.JWT_SECRET,
      session: {
        maxAge: 172800
      },
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          try {
            const userData: UserData = {
              provider: account.provider.toLowerCase(),
              name: user.name || '',
              email: user.email || '',
              socialId: account.providerAccountId
            };

            // Request to custom backend for get access/refresh tokens
            const { data } = await apolloClient.mutate({
              mutation: SignInDocument,
              variables: {
                input: userData,
              }
            });

            // Write data from backend to object <<me>>
            user.me = {
              ...data.login,
              ...userData
            };
          } catch (error) {
            console.error(error);
            return false;
          }
          return true
        },
        async jwt({ token, user, account, profile, isNewUser }): Promise<JWT> {
          if (user) {
            // This conditional always calls first time after signIn
            const details = (<UserMeData>user.me || user);
            const payload = await verifyJWT(String(details.accessToken));
            const expirationToken = (typeof payload === 'string') ? new Date().getTime() : payload.exp;

            // Extends token object with data from backend
            token.graphql = { ...details, exp: expirationToken };
            return token;
          }

          const { exp = 0 } = token.graphql as JwtPayload;

          if (dayjs().unix() < exp) return token;

          // Refresh token from custom backend when accessToken is invalid
          return await refreshAccessToken(token);
        },
        async session({ session, token, user }): Promise<Session> {
          if (session.user) {
            // Extend session object with data from custom backend
            // This usefully for client side logic
            const { graphql: infoByServer } = token;
            session = { ...session, ...session.user };
            session.user = undefined;
            session.id = infoByServer.socialId;
            session.name = infoByServer.name;
            session.expires = dayjs
                .unix(+String(infoByServer.exp))
                .toDate()
                .toISOString()
          }

          return session;
        },
        async redirect({ url, baseUrl }) {
          return baseUrl
        },
      }
}

export default NextAuth(authOptions);
