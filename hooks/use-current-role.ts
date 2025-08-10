import { useCurrentUser } from "@/hooks/use-current-user"; 

export function useCurrentRole() {
    const user = useCurrentUser();
    return user?.role;
}
