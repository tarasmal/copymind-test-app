"use client";

import { useAuth } from "@/features/auth/model/useAuth";
import { useUserProfile } from "../model/useUserProfile";

export default function UserInfo() {
    const { user } = useAuth();
    const { profile } = useUserProfile(user?.uid);

    if (!user) return null;
    if (!profile) return <div>Loading...</div>;

    return (
        <div className="flex items-center gap-4 p-4 bg-gray-100 rounded">
            <img src={profile.photoURL} alt="avatar" className="w-10 h-10 rounded-full" />
            <div>
                <div className="font-bold">{profile.displayName}</div>
                <div className="text-sm text-gray-500">{profile.email}</div>
            </div>
        </div>
    );
}
