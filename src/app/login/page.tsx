"use client";
import LoginButton from "@/features/auth/ui/LoginButton";
import LogoutButton from "@/features/auth/ui/LogoutButton";
import { useAuth } from "@/features/auth/model/useAuth";
import UserInfo from "@/features/user/ui/UserInfo";

export default function LoginPage() {
    const { user } = useAuth();

    if (user)
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <UserInfo />
                <LogoutButton />
            </div>
        );

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <LoginButton />
        </div>
    );
}
