import { UserRole } from '@prisma/client';

export const PERMISSIONS = {
  dashboard: {
    read: [UserRole.SUPER_ADMIN],
    write: [UserRole.SUPER_ADMIN],
  },
  profile: {
    read: [],
    write: [],
  },
};
