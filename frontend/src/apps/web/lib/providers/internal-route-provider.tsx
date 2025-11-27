import { useMemo, type PropsWithChildren } from "react";
import { InternalRouteCTX } from "./internal-route-context";
import { matchRoutes, useLocation } from "react-router-dom";
import type { Route, SingleRoute } from "../types/route";
import { createMockedFreelancerUserProfile } from "../../../../infra/in-memory/user-profile/data";
import { getModuleRoutesByAccount } from "../../modules";

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
  const account = createMockedFreelancerUserProfile();
  const routes = getModuleRoutesByAccount(account);
  const location = useLocation();

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
