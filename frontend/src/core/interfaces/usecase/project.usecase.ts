import type { Project } from "../../domain/project";

abstract class ProjectUseCase {
  abstract list(): Promise<Project[]>;
}

export default ProjectUseCase;
