"use client"
import UserInfo from "@/components/UserInfo";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function ClientPage() {
    const user = useCurrentUser();
    return (
        <div>
            <div className="flex justify-center items-center">
                <UserInfo user={user} label="📱 Client component" />
            </div>
        </div>
    );
}