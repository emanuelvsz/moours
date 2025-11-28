import type { UserProfile } from "../../domain/user-profile";

abstract class AuthUseCase {
  abstract login(email: string, password: string): Promise<boolean>;
  abstract logout(): Promise<void>;
  abstract findAuthenticatedAccount(): Promise<UserProfile | null>;
}

export default AuthUseCase;
