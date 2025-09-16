// hooks/usePasswordReset.ts
import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';

export function usePasswordReset() {
  const { isLoaded, signIn } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const sendResetEmail = async (email: string) => {
    if (!isLoaded) return false;

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });

      setSuccess(true);
      return true;
    } catch (err: any) {
      setError(err.errors[0]?.message || 'Erro ao enviar email de recuperação');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (code: string, newPassword: string) => {
    if (!isLoaded) return false;

    setLoading(true);
    setError('');

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password: newPassword,
      });

      if (result.status === 'complete') {
        // Password reset successful
        return true;
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || 'Erro ao redefinir senha');
    } finally {
      setLoading(false);
    }

    return false;
  };

  return {
    sendResetEmail,
    resetPassword,
    loading,
    error,
    success,
    isLoaded,
  };
}
