"use client"
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/logout";

interface LogoutButtonProps {
    children?: React.ReactNode;
}
export default function LogoutButton({children}: LogoutButtonProps) {
    return (
        <Button variant="outline" onClick={()=>{
            logout();
        }} className="w-full">
            {children}
        </Button>
    );
}
