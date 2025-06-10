"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/model/useAuth";
import {ROUTES} from "@/shared/constants/routes";

export function useProtectedRoute() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) router.replace(ROUTES.LOGIN);
    }, [user, router]);

    return { user, isLoading: user === undefined };
}