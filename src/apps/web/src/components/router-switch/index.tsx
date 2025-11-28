import { Route, Routes } from "react-router-dom";
import { getAllModulesRoutes } from "../../modules";
import { useRedirectionWatcher } from "@lib/hooks/routing/use-redirection-watcher"; 
import type { SingleRoute } from "@lib/types/route";

export const RouterSwitch = () => {
  const routes = getAllModulesRoutes().flatMap((route) => {
    if (route.children) {
      return route.children;
    }
    return route as SingleRoute;
  });

  useRedirectionWatcher();

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.key || route.path}
          path={route.path}
          element={<route.page />}
        />
      ))}
    </Routes>
  );
};
