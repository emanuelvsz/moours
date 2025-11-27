import type { UserProfile } from "../../domain/user-profile";
import type { UserProfileAdapter } from "../../interfaces/adapter/user-profile.adapter";
import type UserProfileUseCase from "../../interfaces/usecase/user-profile.usecase";

class UserProfileService implements UserProfileUseCase {
  protected readonly adapter: UserProfileAdapter;

  constructor(adapter: UserProfileAdapter) {
    this.adapter = adapter;
  }

  async list(): Promise<UserProfile[]> {
    return this.adapter.list();
  }

  async find(id: string): Promise<UserProfile | null> {
    return this.adapter.find(id);
  }
}

export default UserProfileService;
