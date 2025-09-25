import { UserRole } from '@prisma/client';

export const PERMISSIONS = {
  dashboard: {
    read: [UserRole.ADMIN, UserRole.USER],
    write: [UserRole.ADMIN],
  },
  profile: {
    read: [UserRole.ADMIN, UserRole.USER],
    write: [UserRole.ADMIN, UserRole.USER],
  },
};
