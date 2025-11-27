import { getRoutes as UnauthRoutes } from "../modules/unauth/routes";
import { getRoutes as FreelancerRoutes } from "../modules/freelancer/routes";
import { getRoutes as SharedRoutes } from "../modules/shared/routes";
import {
  userProfileIsAdmin,
  userProfileIsFreelancer,
  type UserProfile,
} from "../../../core/domain/user-profile";
import type { Route } from "../lib/types/route";
import { wrapRoutesWithModulePath } from "../lib/utils/route";

export const getUnauthRoutes = () => wrapRoutesWithModulePath([], "");

export const getModuleRoutesByAccount = (account?: UserProfile): Route[] => {
  if (account && userProfileIsAdmin(account)) {
    return [];
  } else if (account && userProfileIsFreelancer(account)) {
    return [...SharedRoutes(), ...FreelancerRoutes()];
  }
  return UnauthRoutes();
};

export const getAllModulesRoutes = (): Route[] => [
  ...UnauthRoutes(),
  ...FreelancerRoutes(),
  ...SharedRoutes(),
];
