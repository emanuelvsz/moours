import DashboardScreen from "./pages/dashboard";
import type { Route } from "../../lib/types/route";
import SessionsScreen from "./pages/sessions";

export const getRoutes = (): Route[] => [
  {
    key: 1,
    title: "Dashboard",
    path: DashboardScreen.route,
    page: DashboardScreen,
    hidden: true,
  },
  {
    key: 2,
    title: "Work Sessions",
    path: SessionsScreen.route,
    page: SessionsScreen,
    hidden: true,
  },
];
