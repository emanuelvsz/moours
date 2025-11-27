import { useCallback, useContext, useEffect } from "react";
import { isNil } from "lodash";
import { useLocation, useNavigate } from "react-router-dom";
import { getModuleRoutesByAccount } from "../../../modules";
import { createMockedFreelancerUserProfile } from "../../../../../infra/in-memory/user-profile/data";
import { InternalRouteCTX } from "../../providers/internal-route-context";

export const useRedirectionWatcher = () => {
  const account = createMockedFreelancerUserProfile();
  const routes = getModuleRoutesByAccount(account);
  const navigate = useNavigate();
  const location = useLocation();
  const { activeRoute } = useContext(InternalRouteCTX);

  const redirectToFirstModuleRoute = useCallback(() => {
    const firstRoute = routes[0];
    if (!firstRoute) {
      return;
    }
    if (firstRoute.children) {
      navigate(firstRoute.children[0].path);
    } else {
      navigate(firstRoute.path);
    }
  }, [navigate, routes]);

  const watch = useCallback(() => {
    if (isNil(activeRoute)) {
      redirectToFirstModuleRoute();
      return;
    }
    document.title = `Moours${activeRoute ? ` - ${activeRoute.title}` : ""}`;
  }, [activeRoute, redirectToFirstModuleRoute]);

  useEffect(() => {
    watch();
  }, [location, routes, account, watch]);
};
