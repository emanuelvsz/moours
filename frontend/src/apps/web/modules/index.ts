import { getRoutes as UnauthRoutes } from "../modules/unauth/routes";
import { getRoutes as FreelancerRoutes } from "../modules/freelancer/routes";
import { getRoutes as ChiefRoutes } from "../modules/chief/routes";
import { getRoutes as SharedRoutes } from "../modules/shared/routes";
import {
  userProfileIsAdmin,
  userProfileIsChief,
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
    return [...FreelancerRoutes(), ...SharedRoutes()];
  } else if (account && userProfileIsChief(account)) {
    return [...ChiefRoutes(), ...SharedRoutes()];
  }
  return UnauthRoutes();
};

export const getAllModulesRoutes = (): Route[] => [
  ...UnauthRoutes(),
  ...FreelancerRoutes(),
  ...SharedRoutes(),
  ...ChiefRoutes(),
];
