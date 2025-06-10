"use client";
import { ReactNode } from "react";
import { useProtectedRoute } from "@/shared/hooks/useProtectedRoute";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, isLoading } = useProtectedRoute();

    if (isLoading) return <div>Loading...</div>;
    if (!user) return null;

    return <>{children}</>;
}
