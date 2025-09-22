import type { PrivateRoutesType, RouteObject } from './routes.types';

export const PRIVATE_ROUTES: Record<PrivateRoutesType, RouteObject> = {
  dashboard: {
    path: '/dashboard',
    label: 'Dashboard',
    permissions: ['dashboard.read', 'dashboard.write'],
  },
  profile: {
    path: '/profile',
    label: 'Profile',
    permissions: ['profile.read', 'profile.write'],
  },
};

export const AUTH_ROUTES: Record<string, RouteObject> = {
  'sign-in': {
    path: '/sign-in',
    label: 'Sign In',
  },
  'sign-up': {
    path: '/sign-up',
    label: 'Sign Up',
  },
  'forgot-password': {
    path: '/forgot-password',
    label: 'Forgot Password',
  },
  'reset-password': {
    path: '/reset-password',
    label: 'Reset Password',
  },
};
