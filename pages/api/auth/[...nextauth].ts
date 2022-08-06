import NextAuth, { NextAuthOptions } from "next-auth"
import VKProvider from "next-auth/providers/vk";

export const authOptions: NextAuthOptions = {
    providers: [
        VKProvider({
          clientId: process.env.VK_ID || '',
          clientSecret: process.env.VK_SECRET || '',
        }),
        // ...add more providers here
      ],
      secret: "3yiQG0mWoQc5BkS3Um/ZZGAfOBBQzN4NyNvK04cis7Y="
}

export default NextAuth(authOptions);