import { Session } from "inspector";
import NextAuth, {
    DefaultSession,
    Account,
    User,
    CallbacksOptions
} from "next-auth"
import JWT from "next-auth/jwt";
import { UserMeData } from "@interfaces/user";

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        graphql: UserMeData;
    }
}

declare module "next-auth" {
    interface Session {
        accessToken: string;
    }
    interface Account {
        access_token: string;
    }
}
