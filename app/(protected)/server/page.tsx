import UserInfo from "@/components/UserInfo";
import { currentUser } from "@/lib/auth";

export default async function ServerPage() {
    const user = await currentUser();
    return (
        <div>
            <div className="flex justify-center items-center">
                <UserInfo user={user} label="💻 Server component" />
            </div>
        </div>
    );
}