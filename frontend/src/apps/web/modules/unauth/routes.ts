import type { Route } from "../../lib/types/route";
import LoginScreen from "./pages/login";

export const getRoutes = (): Route[] => [
  {
    key: 1,
    title: "Login",
    path: LoginScreen.route,
    page: LoginScreen,
    hidden: true,
  },
];
