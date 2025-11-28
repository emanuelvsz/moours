import { Calendar, LayoutDashboard } from "lucide-react";
import type { Route } from "@lib/types/route";
import DashboardScreen from "./pages/dashboard";
import SessionsScreen from "./pages/sessions";

export const getRoutes = (): Route[] => [
  {
    key: "dashboard",
    title: "Dashboard",
    path: DashboardScreen.route,
    page: DashboardScreen,
    hidden: false,
    icon: LayoutDashboard,
  },
  {
    key: "work-sessions",
    title: "Work Sessions",
    path: SessionsScreen.route,
    page: SessionsScreen,
    hidden: false,
    icon: Calendar,
  },
];
