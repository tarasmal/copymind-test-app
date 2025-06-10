"use client";
import { ReactNode } from "react";
import { useGuestRoute } from "@/shared/hooks/useGuestRoute";

export default function GuestRoute({ children }: { children: ReactNode }) {
    const { user, isLoading } = useGuestRoute();

    if (isLoading) return <div>Loading...</div>;
    if (user) return null;

    return <>{children}</>;
}
