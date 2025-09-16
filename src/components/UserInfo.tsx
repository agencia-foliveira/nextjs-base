'use client';

import { useUser } from '@clerk/nextjs';
import { Card } from '@/components/ui/card';

export default function UserInfo() {
  const { user } = useUser();
  if (!user) return <div>Usuário não autenticado</div>;
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold">User Info</h2>
      <p>Name: {user.fullName}</p>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
    </Card>
  );
}
