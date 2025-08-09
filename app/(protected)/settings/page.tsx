"use client";

import { useSession } from "next-auth/react";
// import { signOut } from "next-auth/react"; // client method import
import { logout } from "@/actions/logout"; // server action import

export default function SettingsPage() {
    const { data: session } = useSession();

    // Client side method of using signOut
    // const onClick = () => {
    //     signOut();
    // };
    // console.log("Session:", session);
    return (
        <div>
            <h1>Settings</h1>
            {JSON.stringify(session)}
            <button type="button" onClick={()=>{
                logout(); // Using server action
                // onClick(); // Using client method
            }}>
                Sign Out
            </button>
        </div>
    )
}
