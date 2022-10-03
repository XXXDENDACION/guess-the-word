import { Session } from "inspector";
import NextAuth, {
    DefaultSession,
    Account,
    User,
    CallbacksOptions
} from "next-auth"
import JWT from "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
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