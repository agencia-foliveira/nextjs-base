import { getPermissions, type UserRoles } from '../auth';
import { AUTH_ROUTES, PRIVATE_ROUTES } from './routes.constants';
import type { RouteObject } from './routes.types';

export function getPrivateRoutes() {
  return Object.values(PRIVATE_ROUTES);
}

export function getAuthRoutes() {
  return Object.values(AUTH_ROUTES);
}

export function getRoute(path: string): RouteObject | undefined {
  return [...getPrivateRoutes(), ...getAuthRoutes()].find((r) => r.path === path);
}

export function isPrivateRoute(route: string) {
  return getPrivateRoutes().some((r) => {
    if (r.children) return r.path.startsWith(route);

    return r.path === route;
  });
}

export function isAuthRoute(route: string) {
  return getAuthRoutes().some((r) => r.path === route);
}

export function canAccessRoute(role: UserRoles, route: string) {
  if (isPrivateRoute(route)) {
    const routeObj = getRoute(route);

    if (!routeObj) return false;

    if (routeObj.permissions && routeObj.permissions.length > 0) {
      const hasPermission = routeObj.permissions.some((permission) => {
        const allowedRoles = getPermissions(permission)?.read as string[];
        return allowedRoles.includes(role);
      });

      if (!hasPermission) return false;
    }
  }

  return true;
}
