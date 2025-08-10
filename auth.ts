import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getAccountByUserId } from "./actions/accounts"


export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    pages:{
        error: "/auth/error",
        signIn: "/auth/login",
        signOut: "/auth/login",
    },
    events:{
        async linkAccount({ user }) {
            await db.user.update({
                where :{ id : user.id },
                data : {emailVerified : new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") {
                return true; // Allow sign in for other providers
            }

            if (!user.id) return false; // User is not defined

            const existingUser = await getUserById(user.id);

            if (!existingUser?.emailVerified) {
                return false; // Prevent Signin with out email verification
            }
            
            // Two factor authentication logic if enabled
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmation) {
                    return false
                }
                // Delete two factor confirmation for next sign in
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                })
            }
            return true; // Allow sign in
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                if (token.role === "ADMIN" || token.role === "USER") {
                    session.user.role = token.role;
                }
            }
            if (session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if (session.user && token.name && token.email) {
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.isOAuth = token.isOAuth as boolean;  
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token;

            const existingAccount = await getAccountByUserId(existingUser.id)

            token.role = existingUser.role
            token.name = existingUser.name
            token.email = existingUser.email
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled
            token.isOAuth = !!existingAccount;

            return token
        },
    }, 
    session:{
        strategy: "jwt",
    }
})