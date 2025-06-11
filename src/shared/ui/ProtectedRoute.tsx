'use client';
import { ReactNode } from 'react';
import { useProtectedRoute } from '@/shared/hooks/useProtectedRoute';
import LoadingScreen from '@/shared/ui/LoadingScreen';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useProtectedRoute();

  if (isLoading) return <LoadingScreen />;
  if (!user) return null;

  return <>{children}</>;
}
