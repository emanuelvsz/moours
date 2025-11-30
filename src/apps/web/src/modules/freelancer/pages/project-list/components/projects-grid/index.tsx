import type { Project } from "@core/domain/project";
import { ProjectCard } from "../project-card";

interface Props {
  projects: Project[];
  onSelect: (id: string) => void;
}

export const ProjectsGrid = ({ projects, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onClick={onSelect} />
      ))}
    </div>
  );
};
