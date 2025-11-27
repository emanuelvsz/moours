import type { Route } from "../types/route";

export const wrapRoutesWithModulePath = <T extends Route>(
  routes: T[],
  modulePath: string
): Route[] =>
  routes.map((route) =>
    route.children
      ? {
          ...route,
          children: wrapRoutesWithModulePath(route.children, modulePath),
        }
      : {
          ...route,
          path: `${modulePath}${route.path}`,
        }
  );
