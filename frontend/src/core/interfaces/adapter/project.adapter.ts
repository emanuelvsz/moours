import type { Project } from "../../domain/project";

export interface ProjectAdapter {
  list(): Promise<Project[]>;
  create(data: Omit<Project, "id">): Promise<void>;
  update(id: string, data: Partial<Omit<Project, "id">>): Promise<void>;
}
