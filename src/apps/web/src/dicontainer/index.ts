import AuthService from "@core/services/auth";
import PaymentService from "@core/services/payment";
import ProjectService from "@core/services/project";
import UserProfileService from "@core/services/user-profile";
import WorkSessionService from "@core/services/work-session";
import AuthInMemory from "@infra/in-memory/auth";
import ProjectInMemory from "@infra/in-memory/project";
import UserProfileInMemory from "@infra/in-memory/user-profile";
import WorkSessionInMemory from "@infra/in-memory/work-session";
import PaymentInMemory from "@infra/in-memory/payment";

const DIContainer = {
  getProjectUseCase: () => new ProjectService(new ProjectInMemory()),
  getWorkSessionUseCase: () =>
    new WorkSessionService(new WorkSessionInMemory()),
  getUserProfileUseCase: () =>
    new UserProfileService(new UserProfileInMemory()),
  getAuthAdapter: () => new AuthService(new AuthInMemory()),
  getPaymentAdapter: () => new PaymentService(new PaymentInMemory()),
};

export default DIContainer;
