import type { Route } from "../../lib/types/route";
import ProfileScreen from "./pages/profile";

export const getRoutes = (): Route[] => [
  {
    key: 1,
    title: "Profile",
    path: ProfileScreen.route,
    page: ProfileScreen,
    hidden: true,
  },
];
