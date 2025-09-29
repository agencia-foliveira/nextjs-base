'use client';
import ErrorPage from '@/features/commons/pages/ErrorPage';
import type { CustomError } from '@/lib/errors';

export default function PrivateError({
  error,
  reset,
}: {
  error: CustomError & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPage error={error} reset={reset} />;
}
