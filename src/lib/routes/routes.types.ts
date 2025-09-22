import type { ReactNode } from 'react';
import type { PermissionPath } from '../auth';

export type PrivateRoutesType = 'dashboard' | 'profile';

export type AuthRoutesType = 'sign-in' | 'sign-up' | 'forgot-password' | 'reset-password';

export type RouteObject = {
  path: string;
  label: string;
  icon?: ReactNode;
  permissions?: PermissionPath[];
  children?: Record<string, RouteObject>[];
};
