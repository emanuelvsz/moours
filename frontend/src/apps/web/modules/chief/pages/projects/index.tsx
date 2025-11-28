import { useState } from "react";
import { Plus, Pencil, FolderOpen } from "lucide-react";
import Badge from "../../../../components/badge";
import { useGetProjects } from "../../../../lib/hooks/project/use-get-projects";
import type { Project } from "../../../../../../core/domain/project";
import { ProjectFormModal } from "./project-form-modal";
import { useCreateProject } from "../../../../lib/hooks/project/use-create-project";
import { useUpdateProject } from "../../../../lib/hooks/project/use-update-project";

const ProjectsScreen = () => {
  const { projects, finding } = useGetProjects();
  const { createProject, isPending: isCreating } = useCreateProject();
  const { updateProject, isPending: isUpdating } = useUpdateProject();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleOpenCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: Project | Omit<Project, "id">) => {
    if (editingProject) {
      const { id, ...rest } = data as Project;

      updateProject(
        {
          id,
          data: rest,
        },
        {
          onSuccess: () => setIsModalOpen(false),
        }
      );
    } else {
      createProject(data as Omit<Project, "id">, {
        onSuccess: () => setIsModalOpen(false),
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
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header com Botão de Criar */}
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

      {/* Lista de Projetos */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 min-h-[300px]">
        {!projects || projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
              <FolderOpen size={32} />
            </div>
            <p className="text-slate-500 font-medium">No projects found.</p>
            <p className="text-slate-400 text-sm mb-6">
              Start by creating your first project.
            </p>
            <button
              onClick={handleOpenCreate}
              className="text-emerald-600 font-bold text-sm hover:underline"
            >
              Create Project Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group relative p-6 border border-slate-200 rounded-2xl hover:border-emerald-400 transition-all bg-slate-50 hover:bg-white hover:shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-lg shadow-sm group-hover:scale-110 transition-transform">
                    {p.name.charAt(0)}
                  </div>
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors opacity-0 group-hover:opacity-100"
                    title="Edit Project"
                  >
                    <Pencil size={18} />
                  </button>
                </div>

                <h3
                  className="font-bold text-lg text-slate-800 mb-1 truncate"
                  title={p.name}
                >
                  {p.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4 truncate">
                  Client:{" "}
                  <span className="font-medium text-slate-700">
                    {p.clientName}
                  </span>
                </p>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <Badge color="purple">
                    {p.currency} {p.hourlyRate}/h
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">
                    Active
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
