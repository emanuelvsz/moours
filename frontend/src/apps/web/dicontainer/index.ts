import ProjectService from "../../../core/services/project";
import WorkSessionService from "../../../core/services/work-session";
import ProjectInMemory from "../../../infra/in-memory/project";
import WorkSessionInMemory from "../../../infra/in-memory/work-session";

const DIContainer = {
  getProjectUseCase: () => new ProjectService(new ProjectInMemory()),
  getWorkSessionUseCase: () =>
    new WorkSessionService(new WorkSessionInMemory()),
};

export default DIContainer;
