import {useAuth} from "@/features/auth/model/useAuth";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import {ROUTES} from "@/shared/constants/routes";

export function useGuestRoute() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) router.replace(ROUTES.HOME);
    }, [user, router]);

    return { user, isLoading: user === undefined };
}