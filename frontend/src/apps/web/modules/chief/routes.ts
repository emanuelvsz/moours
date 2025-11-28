import { LayoutDashboard } from "lucide-react";
import type { Route } from "../../lib/types/route";
import DashboardScreen from "./pages/dashboard";

export const getRoutes = (): Route[] => [
  {
    key: 1,
    title: "Dashboard",
    path: DashboardScreen.route,
    page: DashboardScreen,
    hidden: true,
    icon: LayoutDashboard,
  },
];
