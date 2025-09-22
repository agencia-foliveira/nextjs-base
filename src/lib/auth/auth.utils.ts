import { PERMISSIONS } from './auth.constants';
import type { PermissionPath } from './auth.types';

export function getPermissions<Path extends PermissionPath>(path: Path) {
  return path.split('.').reduce((acc, key) => acc?.[key], PERMISSIONS as any);
}
