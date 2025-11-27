import { Clock } from "lucide-react";
import type { Project } from "../../../../../../core/domain/project";
import type { WorkSession } from "../../../../../../core/domain/work-session";

interface Props {
  isOpen: boolean;
  projects: Project[];
  formData: WorkSession;
  isPending: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onFieldChange: (field: string, value: string) => void;
}

export const CreateSessionForm = ({
  isOpen,
  projects,
  formData,
  isPending,
  onSubmit,
  onFieldChange,
}: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-2xl shadow-xl border border-emerald-100 ring-4 ring-emerald-50/50 animate-in slide-in-from-top-4"
    >
      <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <Clock size={16} />
        </span>
        New Record
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-2">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
            Project
          </label>
          <select
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white"
            value={formData.projectId}
            onChange={(e) => onFieldChange("projectId", e.target.value)}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.currency}
                {p.hourlyRate}/h)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
            Date
          </label>
          <input
            type="date"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500"
            value={formData.date}
            onChange={(e) => onFieldChange("date", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
              Start
            </label>
            <input
              type="time"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 text-center"
              value={formData.startTime}
              onChange={(e) => onFieldChange("startTime", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
              End
            </label>
            <input
              type="time"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 text-center"
              value={formData.endTime}
              onChange={(e) => onFieldChange("endTime", e.target.value)}
            />
          </div>
        </div>

        <div className="lg:col-span-4">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
            Description
          </label>
          <input
            type="text"
            placeholder="What did you do today?"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500"
            value={formData.description}
            onChange={(e) => onFieldChange("description", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <button
          type="submit"
          className="px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium shadow-md active:scale-95 transition-all"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save Record"}
        </button>
      </div>
    </form>
  );
};
