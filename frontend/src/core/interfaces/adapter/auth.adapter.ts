import type { UserProfile } from "../../domain/user-profile";

export interface AuthAdapter {
  login(email: string, password: string): Promise<boolean>;
  logout(): Promise<void>;
  findAuthenticatedAccount(): Promise<UserProfile | null>;
}
