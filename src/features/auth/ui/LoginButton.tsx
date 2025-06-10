"use client";

import { loginWithGoogle } from "../services/authService";
import { createUserIfNotExists } from "@/features/user/services/userService";

export default function LoginButton() {
    const handleLogin = async () => {
        try {
            const user = await loginWithGoogle();
            await createUserIfNotExists(user);
        } catch {
            alert("Login failed");
        }
    };

    return (
        <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded hover:cursor-pointer"
        >
            Sign in with Google
        </button>
    );
}
