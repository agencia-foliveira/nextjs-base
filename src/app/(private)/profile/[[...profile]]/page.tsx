'use client';
import { UserProfile } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ProfilePage() {
  return (
    <div className="flex justify-center py-8">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Ver Perfil</Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Perfil do Usuário</DialogTitle>
          </DialogHeader>
          <UserProfile
            routing="path"
            path="/profile"
            appearance={{
              elements: {
                rootBox: 'w-full max-w-4xl',
              },
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
