import type { UserProfile } from "../../domain/user-profile";

abstract class UserProfileUseCase {
  abstract list(): Promise<UserProfile[]>;
  abstract find(id: string): Promise<UserProfile | null>;
}

export default UserProfileUseCase;
