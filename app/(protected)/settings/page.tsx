"use client";

import {useCurrentUser} from "@/hooks/use-current-user";
// import { signOut } from "next-auth/react"; // client method import
// import { logout } from "@/actions/logout"; // server action import

export default function SettingsPage() {
    const user = useCurrentUser();

    // Client side method of using signOut
    // const onClick = () => {
    //     signOut();
    // };
    console.log("User:", user);
    return (
        <div className=" bg-white p-10 rounded-xl">
            {/* <button type="button" onClick={()=>{
                logout(); // Using server action
                // onClick(); // Using client method
            }}>
                Sign Out
            </button> */}
            Settings
        </div>
    )
}
