import NextAuth, { NextAuthOptions, Session } from "next-auth"
import { JWT } from "next-auth/jwt";
import VKProvider from "next-auth/providers/vk";
import GoogleProvider from "next-auth/providers/google";

const apiVersion = '5.131';

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
      secret: "3yiQG0mWoQc5BkS3Um/ZZGAfOBBQzN4NyNvK04cis7Y=",
      callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
          return true
        },
        async redirect({ url, baseUrl }) {
          return baseUrl
        },
        async jwt({ token, user, account, profile, isNewUser }): Promise<JWT> {
          console.log("@@@", token, user, account, profile, isNewUser);
          if (account) {
            token.accessToken = account?.access_token;
          }
          return token;
        },
        async session({ session, token, user }): Promise<Session> {
          session.accessToken = token.accessToken;
          console.log(session);
          return session;
        },
      }
}

export default NextAuth(authOptions);