'use client';
import LoginButton from '@/features/auth/ui/LoginButton';
import GuestRoute from '@/shared/ui/GuestRoute';

export default function LoginPage() {
  return (
    <GuestRoute>
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <LoginButton />
      </div>
    </GuestRoute>
  );
}
