import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"


export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    pages:{
        signIn: "/auth/login",
        error: "/auth/error"
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

            console.log({ sessionToken: token })
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token;
            token.role = existingUser.role
            return token
        },
    }, 
    session:{
        strategy: "jwt",
    }
})