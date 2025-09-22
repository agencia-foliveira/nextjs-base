import { UserRoles } from './auth.types';

export const PERMISSIONS = {
  dashboard: {
    read: [UserRoles.ADMIN, UserRoles.USER],
    write: [UserRoles.ADMIN],
  },
  profile: {
    read: [UserRoles.ADMIN, UserRoles.USER],
    write: [UserRoles.ADMIN, UserRoles.USER],
  },
};
