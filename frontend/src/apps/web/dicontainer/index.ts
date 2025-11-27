import ProjectService from "../../../core/services/project";
import UserProfileService from "../../../core/services/user-profile";
import WorkSessionService from "../../../core/services/work-session";
import ProjectInMemory from "../../../infra/in-memory/project";
import UserProfileInMemory from "../../../infra/in-memory/user-profile";
import WorkSessionInMemory from "../../../infra/in-memory/work-session";

const DIContainer = {
  getProjectUseCase: () => new ProjectService(new ProjectInMemory()),
  getWorkSessionUseCase: () =>
    new WorkSessionService(new WorkSessionInMemory()),
  getUserProfileUseCase: () =>
    new UserProfileService(new UserProfileInMemory()),
};

export default DIContainer;
