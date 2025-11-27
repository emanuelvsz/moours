import type { Project } from "../../domain/project";
import type { ProjectAdapter } from "../../interfaces/adapter/project.adapter";
import type ProjectUseCase from "../../interfaces/usecase/project.usecase";

class ProjectService implements ProjectUseCase {
  protected readonly adapter: ProjectAdapter;

  constructor(adapter: ProjectAdapter) {
    this.adapter = adapter;
  }

  async list(): Promise<Project[]> {
    return this.adapter.list();
  }
}

export default ProjectService;
