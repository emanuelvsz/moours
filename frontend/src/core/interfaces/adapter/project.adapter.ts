import type { Project } from "../../domain/project";

export interface ProjectAdapter {
  list(): Promise<Project[]>;
}
