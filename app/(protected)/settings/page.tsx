import {auth, signOut} from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
export default async function SettingsPage() {
    const session = await auth();

    if (!session) return null

    console.log("Session:", session);
    return (
        <div>
            <h1>Settings</h1>
            {JSON.stringify(session)}
            <form action={async () =>{
                "use server"
                await signOut(
                    {redirectTo: DEFAULT_LOGIN_REDIRECT}
                )
            }}>
                <button type="submit">
                    Sign Out
                </button>
            </form>
        </div>
    )
}
