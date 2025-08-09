import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
// Update the import path to the correct relative location
import Navbar from "@/components/Navbar";

interface ProtectedLayoutProps {
    children: React.ReactNode;
}
export default async function ProtectedLayout({
    children,
}: ProtectedLayoutProps) {
    const session = await auth();
    return (
        <div className="h-full w-full flex flex-col gap-y-10 justify-center items-center">
            <SessionProvider session={session}>
                <Navbar/>
                {children}
            </SessionProvider>
        </div>
    );
}