import { matchRoutes, useLocation } from "react-router";
import { getModuleRoutesByAccount } from "../../../modules";
import { createMockedFreelancerUserProfile } from "../../../../../infra/in-memory/user-profile/data";

export const useActiveRoute = () => {
  const account = createMockedFreelancerUserProfile();
  const routes = getModuleRoutesByAccount(account);
  const location = useLocation();
  const routeMatch = matchRoutes(routes, location);
  return routeMatch?.[0]?.route ?? null;
};
