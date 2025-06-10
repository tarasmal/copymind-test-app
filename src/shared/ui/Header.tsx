"use client";
import UserInfo from "@/features/user/ui/UserInfo";
import LogoutButton from "@/features/auth/ui/LogoutButton";
import {useAuth} from "@/features/auth/model/useAuth";

export default function Header() {
    const {user} = useAuth();
    if (!user) return null;
    return (
        <header className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 bg-white shadow z-10">
        <div className="text-xl font-bold tracking-wide">AI-Powered Decision Journal</div>
            <div className="flex items-center gap-4">
        <UserInfo />
        <LogoutButton />
        </div>
        </header>
);
}
