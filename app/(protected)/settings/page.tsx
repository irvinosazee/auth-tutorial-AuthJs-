import {auth, signOut} from "@/auth";
export default async function SettingsPage() {
    const session = await auth();

    console.log("Session:", session);
    return (
        <div>
            <h1>Settings</h1>
            {JSON.stringify(session)}
            <form action={async () =>{
                "use server"
                await signOut()
            }}>
                <button type="submit">
                    Sign Out
                </button>
            </form>
        </div>
    )
}
