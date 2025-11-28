import type { BankDetails } from "../bank-details";
import type { Profile } from "../profile";
import { RoleCode, type RoleDefinition } from "../role";

export interface UserProfile extends Profile {
  role: RoleDefinition;
  bankDetails?: BankDetails;
  taxId?: string;
  address?: string;
}

export const userProfileIsAdmin = (userProfile?: UserProfile) => {
  return userProfile?.role.code === RoleCode.ADMIN;
};

export const userProfileIsFreelancer = (userProfile?: UserProfile) => {
  return userProfile?.role.code === RoleCode.FREELANCER;
};

export const userProfileIsChief = (userProfile?: UserProfile) => {
  return userProfile?.role.code === RoleCode.CHIEF;
};
