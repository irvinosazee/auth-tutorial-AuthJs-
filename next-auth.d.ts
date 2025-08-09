import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            role: "ADMIN" | "USER";
            isTwoFactorEnabled: boolean;
        } & DefaultSession["user"];
    } 
} 