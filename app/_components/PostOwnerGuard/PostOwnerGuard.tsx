'use client';

import { useAuth } from '../AuthContext/AuthContext';

interface UserOwnsPostProps {
  userId: string;
  children: React.ReactNode;
}

export default function PostOwnerGuard({
  userId,
  children,
}: UserOwnsPostProps) {
  const { user } = useAuth();
  return (
    <>
      {user?.userInfo.name}
      {user && user.id == userId && children}
    </>
  );
}
