import type { UserProfile } from "../../../core/domain/user-profile";
import type { UserProfileAdapter } from "../../../core/interfaces/adapter/user-profile.adapter";
import {
  createMockedChiefUserProfile,
  createMockedFreelancerUserProfile,
} from "./data";

class UserProfileInMemory implements UserProfileAdapter {
  private static userProfiles: UserProfile[] = [
    createMockedChiefUserProfile(),
    createMockedFreelancerUserProfile(),
  ];

  list(): Promise<UserProfile[]> {
    return Promise.resolve(UserProfileInMemory.userProfiles);
  }

  find(id: string): Promise<UserProfile | null> {
    return Promise.resolve(
      UserProfileInMemory.userProfiles.find((item) => item.id === id) || null
    );
  }
}

export default UserProfileInMemory;
