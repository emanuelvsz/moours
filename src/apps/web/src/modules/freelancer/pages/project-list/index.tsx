import { useNavigate } from "react-router-dom";
import { useGetProjects } from "@web/lib/hooks/project/use-get-projects";
import { ProjectsHeader } from "./components/header";
import { EmptyProjects } from "./components/empty-projects";
import { ProjectsGrid } from "./components/projects-grid";

const ProjectsListScreen = () => {
  const navigate = useNavigate();
  const { projects, finding } = useGetProjects();

  const handleNavigate = (id: string) => navigate(`/projects/${id}`);

  if (finding) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <ProjectsHeader />

      {projects.length === 0 ? (
        <EmptyProjects />
      ) : (
        <ProjectsGrid projects={projects} onSelect={handleNavigate} />
      )}
    </div>
  );
};

ProjectsListScreen.route = "/projects";

export default ProjectsListScreen;
