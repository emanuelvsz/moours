import { useCallback, useContext, useEffect } from "react";
import { isNil } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { getModuleRoutesByAccount } from "../../../modules";
import { InternalRouteCTX } from "../../providers/internal-route-context";
import { useAuthenticatedAccount } from "../auth/use-get-authenticated-account";

export const useRedirectionWatcher = () => {
  const { user } = useAuthenticatedAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const { activeRoute } = useContext(InternalRouteCTX);

  const redirectToFirstModuleRoute = useCallback(() => {
    if (!user) return;

    const routes = getModuleRoutesByAccount(user);
    const firstRoute = routes[0];

    if (!firstRoute) return;

    if (firstRoute.children) {
      navigate(firstRoute.children[0].path);
    } else {
      navigate(firstRoute.path);
    }
  }, [navigate, user]);

  const watch = useCallback(() => {
    if (!user) return;

    if (isNil(activeRoute)) {
      redirectToFirstModuleRoute();
      return;
    }
    document.title = `Moours${activeRoute ? ` - ${activeRoute.title}` : ""}`;
  }, [activeRoute, redirectToFirstModuleRoute, user]);

  useEffect(() => {
    watch();
  }, [location, user, watch]);
};
