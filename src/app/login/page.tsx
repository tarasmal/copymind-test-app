"use client"
import {loginWithGoogle} from "@/features/auth/services/authService";
import {useAuth} from "@/features/auth/model/useAuth";

export default function LoginPage() {
    const { user } = useAuth();

    const handleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch {
            alert("Login failed");
        }
    };

    if (user === undefined) return <p className="text-center mt-20">Loading...</p>;
    if (user) return <p className="text-center mt-20">Logged in as {user.email}</p>;

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-2xl font-bold">Login with Google</h1>
            <button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
                Sign in with Google
            </button>
        </div>
    );
}