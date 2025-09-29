'use client';
import ErrorPage from '@/features/commons/pages/ErrorPage';
import type { CustomError } from '@/lib/errors';

export default function AuthError({
  error,
  reset,
}: {
  error: CustomError & { digest?: string };
  reset: () => void;
}) {
  console.error(error.code);
  return <ErrorPage error={error} reset={reset} />;
}
