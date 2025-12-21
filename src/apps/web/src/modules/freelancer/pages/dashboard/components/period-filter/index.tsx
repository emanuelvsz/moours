import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export type PeriodType = "month" | "week" | "year";

interface Props {
  periodType: PeriodType;
  onPeriodTypeChange: (type: PeriodType) => void;
  currentLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;

  showFilterByProject?: boolean;
  projects?: { id: string; name: string }[];
  selectedProjectId?: string | null;
  onProjectChange?: (projectId: string | null) => void;
}

export const PeriodFilter = ({
  periodType,
  onPeriodTypeChange,
  currentLabel,
  onPrev,
  onNext,
  onReset,
  showFilterByProject,
  projects = [],
  selectedProjectId,
  onProjectChange,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 p-1.5 rounded-2xl border border-slate-200 mb-8 gap-2">
      <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100 w-full sm:w-auto">
        {(["month", "week", "year"] as PeriodType[]).map((type) => (
          <button
            key={type}
            onClick={() => onPeriodTypeChange(type)}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              periodType === type
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end px-2">
        {showFilterByProject && (
          <select
            className="
              h-10
              pl-4
              pr-10 
              appearance-none
              rounded-lg
              border border-slate-300
              bg-white
              text-sm text-slate-700
              shadow-sm
              bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2364748b%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')]
              bg-[length:1.25rem_1.25rem]
              bg-no-repeat
              bg-[right_0.5rem_center]
              hover:border-slate-400
              focus:outline-none focus:ring-2 focus:ring-slate-200
              transition-all
            "
            value={selectedProjectId ?? ""}
            onChange={(e) => onProjectChange?.(e.target.value || null)}
          >
            <option value="">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        )}

        <button
          onClick={onPrev}
          className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-500 transition-all"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          className="flex items-center gap-2 font-bold text-slate-700 min-w-[140px] justify-center cursor-pointer hover:bg-white px-3 py-1 rounded-lg transition-colors"
          onClick={onReset}
          title="Reset to today"
        >
          <Calendar size={16} className="text-emerald-500" />
          <span>{currentLabel}</span>
        </div>

        <button
          onClick={onNext}
          className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-500 transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
