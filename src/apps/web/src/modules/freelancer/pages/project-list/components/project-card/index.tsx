import { ChevronRight } from "lucide-react";
import Badge from "@web/components/badge";
import type { Project } from "@core/domain/project";

interface Props {
  project: Project;
  onClick: (id: string) => void;
}

export const ProjectCard = ({ project, onClick }: Props) => {
  return (
    <button
      onClick={() => onClick(project.id)}
      className="group relative p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all text-left"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 font-bold text-lg group-hover:scale-110 transition-transform">
          {project.name.charAt(0)}
        </div>

        <div className="p-2 bg-slate-50 rounded-full text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
          <ChevronRight size={18} />
        </div>
      </div>

      <h3 className="font-bold text-lg text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">
        {project.name}
      </h3>

      <p className="text-sm text-slate-500 mb-4">
        Client: {project.clientName}
      </p>

      <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
        <Badge color="purple">
          {project.currency} {project.hourlyRate}/h
        </Badge>
      </div>
    </button>
  );
};
