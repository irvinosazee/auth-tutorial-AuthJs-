"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarImage,
    AvatarFallback
} from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa"
import { LogOut } from "lucide-react"
import { useCurrentUser } from "@/hooks/use-current-user"
import LogoutButton from "@/components/auth/LogoutButton"


export default function UserButton() {
    const user = useCurrentUser()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} alt="User Avatar" />
                    <AvatarFallback className="bg-sky-500 ">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32" align="start">
                <LogoutButton>
                    <DropdownMenuItem>
                        <LogOut className="h-4 w-4 mr-2"/>
                        Logout
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}