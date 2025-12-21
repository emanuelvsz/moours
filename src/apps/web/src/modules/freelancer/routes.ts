import { Calendar, LayoutDashboard, Briefcase } from "lucide-react";
import type { Route } from "../../lib/types/route";
import DashboardScreen from "./pages/dashboard";
import SessionsScreen from "./pages/sessions";
import ProjectManagementScreen from "./pages/project-management";
import ProjectsScreen from "../chief/pages/projects";

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
  {
    key: "my-projects",
    title: "My Projects",
    path: ProjectsScreen.route,
    page: ProjectsScreen,
    hidden: false,
    icon: Briefcase,
  },
  {
    key: "project-payment-manage",
    title: "Project Management",
    path: ProjectManagementScreen.route,
    page: ProjectManagementScreen,
    hidden: true,
  },
];
