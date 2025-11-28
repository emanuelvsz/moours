import type { UserProfile } from "../../../core/domain/user-profile";
import type { AuthAdapter } from "../../../core/interfaces/adapter/auth.adapter";
import { createMockedUserProfiles } from "../user-profile/data";

class AuthInMemory implements AuthAdapter {
  private static userProfiles: UserProfile[] = createMockedUserProfiles();
  private authenticatedAccount: UserProfile | null = null;

  async login(email: string, password: string): Promise<boolean> {
    const user = AuthInMemory.userProfiles.find(
      (item) => item.email === email && item.password === password
    );

    if (user) {
      this.authenticatedAccount = user;
      localStorage.setItem("moours_auth_session", JSON.stringify(user));
      return true;
    }
    return false;
  }

  async logout(): Promise<void> {
    this.authenticatedAccount = null;
    localStorage.removeItem("moours_auth_session");
  }

  async findAuthenticatedAccount(): Promise<UserProfile | null> {
    if (this.authenticatedAccount) {
      return this.authenticatedAccount;
    }
    const storedSession = localStorage.getItem("moours_auth_session");
    if (storedSession) {
      const user = JSON.parse(storedSession) as UserProfile;
      this.authenticatedAccount = user;
      return user;
    }
    return null;
  }
}

export default AuthInMemory;
