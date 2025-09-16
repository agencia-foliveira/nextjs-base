'use client';

import { useSearchParams } from 'next/navigation';
import CustomSignIn from '@/features/auth/components/CustomSignIn';
import PasswordResetSuccess from '@/features/auth/components/PasswordResetSuccess';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  if (message === 'password-reset-success') {
    return <PasswordResetSuccess />;
  }

  return <CustomSignIn />;
}
