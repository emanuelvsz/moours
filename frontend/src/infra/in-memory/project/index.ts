import type { ProjectAdapter } from "../../../core/interfaces/adapter/project.adapter";
import type { Project } from "../../../core/domain/project";
import { createMockedProjects } from "./data";

class ProjectInMemory implements ProjectAdapter {
  private static projects: Project[] = createMockedProjects();

  list(): Promise<Project[]> {
    return Promise.resolve(ProjectInMemory.projects);
  }
}

export default ProjectInMemory;
