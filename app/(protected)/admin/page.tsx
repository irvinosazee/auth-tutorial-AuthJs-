"use client"

import { UserRole } from "@prisma/client";
import { toast } from "sonner";

import RoleGate from "@/components/auth/RoleGate";
import FormSuccess from "@/components/FormSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { admin } from "@/actions/admin";

export default function AdminPage() {


    const onApiRouteClick = async () => {
        fetch('/api/admin', {
            method: 'GET',
        }).then(response => {
            if (response.ok){
                toast.success("Allowed Api Route");
            } else {
                toast.error("Forbidden Api Route");
            }
        });
    }
    const onServerActionClick = async () => {
        admin()
        .then(response => {
            if (response.success) {
                toast.success(response.success);
            } else if (response.error)  {
                toast.error(response.error);
            }
        });
    }

    return (
        <Card className="w-[600px] ">
            <CardHeader>
                <p className="text-2xl font-semibold text-center">
                    🔑 Admin
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <RoleGate allowedRole={UserRole.ADMIN}>
                    <FormSuccess message="You are allowed to see this content!" />
                </RoleGate>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only API Route
                    </p>
                    <Button onClick={onApiRouteClick}>
                        Click to test
                    </Button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
                    <p className="text-sm font-medium">
                        Admin-only Server Action
                    </p>
                    <Button onClick={onServerActionClick}>
                        Click to test
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
