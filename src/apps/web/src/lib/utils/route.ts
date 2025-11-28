import type { Route, SingleRoute } from "../types/route";

export const wrapRoutesWithModulePath = (
  routes: Route[],
  modulePath: string
): Route[] =>
  routes.map((route) => {
    if (route.children) {
      return {
        ...route,
        children: wrapRoutesWithModulePath(
          route.children,
          modulePath
        ) as SingleRoute[],
      };
    }

    return {
      ...route,
      path: `${modulePath}${(route as SingleRoute).path}`,
    };
  });