"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import { poppins } from "@/components/font";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/auth/UserButton";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
            <div className={`flex gap-x-2 ${poppins.className} font-light`}>
                <Button
                    asChild
                    variant={pathname === "/client" ? "default" : "outline"}>
                    <Link href="/client">Client</Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/server" ? "default" : "outline"}>
                    <Link href="/server">Server</Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/settings" ? "default" : "outline"}>
                    <Link href="/settings">Settings</Link>
                </Button>
                <Button
                    asChild
                    variant={pathname === "/admin" ? "default" : "outline"}>
                    <Link href="/admin">Admin</Link>
                </Button>
            </div>
            <UserButton />
        </div>
    );
}
