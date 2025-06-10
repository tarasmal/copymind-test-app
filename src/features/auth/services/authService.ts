"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/shared/lib/firebase";

export const loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout error:", error);
    }
};
