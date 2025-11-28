import { useMemo, type PropsWithChildren } from "react";
import { InternalRouteCTX } from "./internal-route-context";
import { matchRoutes, useLocation } from "react-router-dom";
import type { Route, SingleRoute } from "../types/route";
import { getModuleRoutesByAccount } from "../../modules";
import { useAuthenticatedAccount } from "../hooks/auth/use-get-authenticated-account";

function getFlatRoutes(routes: Route[]): SingleRoute[] {
  const result: SingleRoute[] = [];
  routes.forEach((r) => {
    if ("children" in r && r.children) {
      result.push(...getFlatRoutes(r.children));
    } else {
      result.push(r);
    }
  });
  return result;
}

const InternalRouteProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuthenticatedAccount();
  const location = useLocation();
  const routes = useMemo(() => {
    if (!user) return [];
    return getModuleRoutesByAccount(user);
  }, [user]);

  const flatRoutes = useMemo(() => getFlatRoutes(routes), [routes]);

  const routeMatch = matchRoutes(flatRoutes, location);
  const activeRoute = routeMatch?.[0]?.route ?? null;

  const value = useMemo(() => ({ activeRoute }), [activeRoute]);

  return (
    <InternalRouteCTX.Provider value={value}>
      {children}
    </InternalRouteCTX.Provider>
  );
};

export default InternalRouteProvider;
