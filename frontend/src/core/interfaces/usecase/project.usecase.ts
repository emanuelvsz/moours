import type { Project } from "../../domain/project";

abstract class ProjectUseCase {
  abstract list(): Promise<Project[]>;
  abstract create(data: Omit<Project, "id">): Promise<void>;
  abstract update(
    id: string,
    data: Partial<Omit<Project, "id">>
  ): Promise<void>;
}

export default ProjectUseCase;
