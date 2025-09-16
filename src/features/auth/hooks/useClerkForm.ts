import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useState } from 'react';

export function useClerkForm() {
  const { isLoaded: signInLoaded, signIn, setActive } = useSignIn();
  const { isLoaded: signUpLoaded, signUp, setActive: setActiveSignUp } = useSignUp();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (email: string, password: string) => {
    if (!signInLoaded) return;

    setLoading(true);
    setError('');

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
      } else {
        // Handle additional steps (2FA, email verification, etc.)
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => {
    if (!signUpLoaded) return;

    setLoading(true);
    setError('');

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      if (result.status === 'complete') {
        await setActiveSignUp({ session: result.createdSessionId });
      } else {
        // Handle email verification
        await result.prepareEmailAddressVerification({ strategy: 'email_code' });
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSignIn,
    handleSignUp,
    loading,
    error,
    signIn,
    signUp,
    isLoaded: signInLoaded && signUpLoaded,
  };
}
