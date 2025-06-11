'use client';

import { useAuth } from '@/features/auth/model/useAuth';
import { useUserProfile } from '../model/useUserProfile';
import Image from 'next/image';

export default function UserInfo() {
  const { user } = useAuth();
  const { profile } = useUserProfile(user?.uid);
  if (!user || !profile) return null;

  return (
    <div className="flex items-center gap-2">
      <Image src={profile.photoURL} alt="avatar" className="w-8 h-8 rounded-full border" />
      <span className="font-medium">{profile.displayName}</span>
    </div>
  );
}
