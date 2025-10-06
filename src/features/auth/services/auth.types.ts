import type { UserRole } from '@prisma/client';
import type { PERMISSIONS } from './auth.constants';

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
};

export type PermissionKeys<T> = {
  [K in keyof T]: T[K] extends Array<any> // se for array, para aqui
    ? Extract<K, string>
    : T[K] extends object // se for objeto, continua a recursão
      ? `${Extract<K, string>}.${PermissionKeys<T[K]>}`
      : Extract<K, string>;
}[keyof T];

export type PermissionPath = PermissionKeys<typeof PERMISSIONS>;
