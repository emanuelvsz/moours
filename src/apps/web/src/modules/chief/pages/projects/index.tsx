import { useState } from "react";
import { Plus, Pencil, FolderOpen } from "lucide-react";
import Badge from "@components/badge";
import { useGetProjects } from "@lib/hooks/project/use-get-projects";
import type { Project } from "@core/domain/project";
import { ProjectFormModal } from "./project-form-modal";
import { useCreateProject } from "@lib/hooks/project/use-create-project";
import { useUpdateProject } from "@lib/hooks/project/use-update-project";
import { useNavigate } from "react-router-dom";

const ProjectsScreen = () => {
  const navigate = useNavigate();
  const { projects, finding } = useGetProjects();
  const { createProject, isPending: isCreating } = useCreateProject();
  const { updateProject, isPending: isUpdating } = useUpdateProject();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingProject) {
      const { id, ...rest } = data;
      updateProject(
        { id, data: rest },
        { onSuccess: () => setIsModalOpen(false) }
      );
    } else {
      const newProject = {
        ...data,
      };

      createProject(newProject, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  if (finding) {
    return (
      <div className="h-full flex flex-col justify-center items-center text-slate-400 animate-pulse gap-3">
        <FolderOpen size={40} className="opacity-50" />
        <span>Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">My Projects</h2>
          <p className="text-slate-500">
            Manage your clients and hourly rates.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg transition-all active:scale-95"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 min-h-[300px]">
        {!projects || projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <FolderOpen size={32} />
            </div>
            <p className="text-slate-500 font-medium">No projects found.</p>
            <button
              onClick={handleOpenCreate}
              className="text-emerald-600 font-bold text-sm hover:underline mt-2"
            >
              Create Project Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group cursor-pointer relative p-6 border border-slate-200 rounded-2xl hover:border-emerald-400 transition-all bg-slate-50 hover:bg-white hover:shadow-lg"
                onClick={() => navigate(`/projects/${p.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-lg shadow-sm">
                    {p.name.charAt(0)}
                  </div>
                  <button
                    onClick={(e) => handleOpenEdit(e, p)} // Passando o evento para o stopPropagation
                    className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Pencil size={18} />
                  </button>
                </div>

                <h3 className="font-bold text-lg text-slate-800 mb-1 truncate">
                  {p.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  Client:{" "}
                  <span className="font-medium text-slate-700">
                    {p.clientName}
                  </span>
                </p>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <Badge color="emerald">
                    {p.currency} {p.hourlyRate}/h
                  </Badge>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Active Project
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingProject}
        isPending={isCreating || isUpdating}
      />
    </div>
  );
};

ProjectsScreen.route = "/projects";

export default ProjectsScreen;
