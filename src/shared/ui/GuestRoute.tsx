'use client';
import { ReactNode } from 'react';
import { useGuestRoute } from '@/shared/hooks/useGuestRoute';
import LoadingScreen from '@/shared/ui/LoadingScreen';

export default function GuestRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useGuestRoute();

  if (isLoading) return <LoadingScreen />;
  if (user) return null;

  return <>{children}</>;
}
