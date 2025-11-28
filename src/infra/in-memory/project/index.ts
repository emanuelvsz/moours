import type { ProjectAdapter } from "../../../core/interfaces/adapter/project.adapter";
import type { Project } from "../../../core/domain/project";
import { createMockedProjects } from "./data";

class ProjectInMemory implements ProjectAdapter {
  private static projects: Project[] = createMockedProjects();

  async list(): Promise<Project[]> {
    return Promise.resolve(ProjectInMemory.projects);
  }

  async create(data: Omit<Project, "id">): Promise<void> {
    const newProject: Project = {
      id: crypto.randomUUID(),
      ...data,
    };

    ProjectInMemory.projects.push(newProject);

    return;
  }

  async update(id: string, data: Partial<Omit<Project, "id">>): Promise<void> {
    const index = ProjectInMemory.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Project with id "${id}" not found`);
    }
    const updated: Project = {
      ...ProjectInMemory.projects[index],
      ...data,
    };
    ProjectInMemory.projects[index] = updated;

    return;
  }
}

export default ProjectInMemory;
