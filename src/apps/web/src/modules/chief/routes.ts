import { LayoutDashboard, Wallet } from "lucide-react";
import type { Route } from "@lib/types/route";
import DashboardScreen from "./pages/dashboard";
import ProjectsScreen from "./pages/projects";
import ProjectDetailsScreen from "./pages/project-details";
import UserMonthlyPaymentScreen from "./pages/user-monthly-payment";
import PaymentsListScreen from "./pages/payments";

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
  {
    key: "admin-project-details",
    title: "Projects",
    path: ProjectDetailsScreen.route,
    page: ProjectDetailsScreen,
    hidden: true,
    icon: LayoutDashboard,
  },
  {
    key: "admin-payment",
    title: "Payments",
    path: UserMonthlyPaymentScreen.route,
    page: UserMonthlyPaymentScreen,
    hidden: true,
    icon: LayoutDashboard,
  },
  {
    key: "admin-payments-list",
    title: "Payments",
    path: PaymentsListScreen.route,
    page: PaymentsListScreen,
    hidden: false,
    icon: Wallet,
  },
];
