"use client";

import { useAuth } from "@/features/auth/model/useAuth";
import { useUserProfile } from "../model/useUserProfile";


export default function UserInfo() {
    const { user } = useAuth();
    const { profile } = useUserProfile(user?.uid);

    if (!user || !profile) return null;

    return (
        <div className="flex items-center gap-2">
            <img
                src={profile.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.displayName || "")}`}
                alt="avatar"
                className="w-8 h-8 rounded-full border"
            />
            <span className="font-medium">{profile.displayName}</span>
        </div>
    );
}
