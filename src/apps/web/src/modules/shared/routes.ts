import { User } from "lucide-react";
import type { Route } from "@lib/types/route";
import ProfileScreen from "./pages/profile";

export const getRoutes = (): Route[] => [
  {
    key: "profile",
    title: "My Profile",
    path: ProfileScreen.route,
    page: ProfileScreen,
    hidden: false,
    icon: User,
  },
];
