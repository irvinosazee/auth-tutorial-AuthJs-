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
        // async signIn({ user }) {
        //     if (!user.id) {
        //         return false; // User ID is missing
        //     }
        //     const existingUser = await getUserById(user.id);

        //     if (!existingUser || !existingUser?.emailVerified) {
        //         return false; // User not found
        //     }
            
        //     return true; // Allow sign in
        // },
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