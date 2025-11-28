import type { UserProfile } from "../../domain/user-profile";
import type { AuthAdapter } from "../../interfaces/adapter/auth.adapter";
import type AuthUseCase from "../../interfaces/usecase/auth.usecase";

class AuthService implements AuthUseCase {
  protected readonly adapter: AuthAdapter;

  constructor(adapter: AuthAdapter) {
    this.adapter = adapter;
  }

  async login(email: string, password: string): Promise<boolean> {
    return this.adapter.login(email, password);
  }

  async logout(): Promise<void> {
    return this.adapter.logout();
  }

  async findAuthenticatedAccount(): Promise<UserProfile | null> {
    return this.adapter.findAuthenticatedAccount();
  }
}

export default AuthService;
