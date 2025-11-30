import { ArrowLeft, Plus } from "lucide-react";
import Badge from "@web/components/badge";
import type { Project } from "@core/domain/project";

interface Props {
  project: Project;
  onBack: () => void;
  onNewSession?: () => void;
  canCreate?: boolean;
}

const ProjectHeader = ({
  project,
  onBack,
  onNewSession,
  canCreate = false,
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Back to projects"
        >
          <ArrowLeft size={24} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            {project.name}
            <Badge color="purple">Workspace</Badge>
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your work logs and payments.
          </p>
        </div>
      </div>

      {canCreate && onNewSession && (
        <button
          onClick={onNewSession}
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <Plus size={18} />
          New Session
        </button>
      )}
    </div>
  );
};

export default ProjectHeader;
