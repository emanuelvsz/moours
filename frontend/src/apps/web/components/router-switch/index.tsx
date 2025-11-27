import { Route, Routes } from "react-router-dom";
import { getAllModulesRoutes } from "../../modules";
import { useRedirectionWatcher } from "../../lib/hooks/routing/use-redirection-watcher";

export const RouterSwitch = () => {
  const routes = getAllModulesRoutes()
    .map((route) => route.children ?? route)
    .flat();

  useRedirectionWatcher();

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.key} path={route.path} element={<route.page />} />
      ))}
    </Routes>
  );
};
