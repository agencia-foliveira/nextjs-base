import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 6;
const MIN_TOKEN_LENGTH = 6;

export const LoginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(MIN_PASSWORD_LENGTH, 'Password must be at least 6 characters long'),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(MIN_PASSWORD_LENGTH, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'Confirm Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const ForgotPasswordSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
});

export const ResetPasswordSchema = z
  .object({
    token: z.string().min(MIN_TOKEN_LENGTH, 'Token is required'),
    password: z.string().min(MIN_PASSWORD_LENGTH, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, 'Confirm Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginRequest = z.infer<typeof LoginSchema>;
export type RegisterRequest = z.infer<typeof RegisterSchema>;
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordSchema>;
