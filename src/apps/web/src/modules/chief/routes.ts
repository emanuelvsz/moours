import { LayoutDashboard } from "lucide-react";
import type { Route } from "@lib/types/route";
import DashboardScreen from "./pages/dashboard";
import ProjectsScreen from "./pages/projects";

export const getRoutes = (): Route[] => [
  {
    key: "admin-dashboard",
    title: "Dashboard",
    path: DashboardScreen.route,
    page: DashboardScreen,
    hidden: false,
    icon: LayoutDashboard,
  },
  {
    key: "admin-projects",
    title: "Projects",
    path: ProjectsScreen.route,
    page: ProjectsScreen,
    hidden: false,
    icon: LayoutDashboard,
  },
];
