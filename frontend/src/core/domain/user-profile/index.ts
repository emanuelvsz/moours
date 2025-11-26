import type { BankDetails } from "../bank-details";
import type { Profile } from "../profile";
import type { RoleDefinition } from "../role";

export interface UserProfile extends Profile {
  role: RoleDefinition;
  bankDetails?: BankDetails;
  taxId?: string; 
  address?: string;
}
