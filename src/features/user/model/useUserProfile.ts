"use client";

import { useEffect, useState } from "react";
import { db } from "@/shared/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export const useUserProfile = (uid: string | undefined) => {
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        if (!uid) return;

        const ref = doc(db, "users", uid);
        const unsub = onSnapshot(ref, (snap) => {
            setProfile(snap.exists() ? snap.data() : null);
        });
        return () => unsub();
    }, [uid]);

    return { profile };
};