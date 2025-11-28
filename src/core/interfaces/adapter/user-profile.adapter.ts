import type { UserProfile } from "../../domain/user-profile";

export interface UserProfileAdapter {
  list(): Promise<UserProfile[]>;
  find(id: string): Promise<UserProfile | null>;
}
