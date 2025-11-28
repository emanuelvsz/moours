import { matchRoutes, useLocation } from "react-router";
import { getModuleRoutesByAccount } from "../../../modules";
import { useAuthenticatedAccount } from "../auth/use-get-authenticated-account";

export const useActiveRoute = () => {
  const { user } = useAuthenticatedAccount();
  const location = useLocation();

  if (!user) return null;

  const routes = getModuleRoutesByAccount(user);
  const routeMatch = matchRoutes(routes, location);
  return routeMatch?.[0]?.route ?? null;
};
