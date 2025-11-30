import { Send } from "lucide-react";
import type { MonthlyGroup } from "@web/lib/hooks/project/use-unpaid-months";
import type { Project } from "@core/domain/project";

interface Props {
  group: MonthlyGroup;
  project: Project;
  onRegister: (group: MonthlyGroup) => void;
  isRegistering?: boolean;
}

const UnpaidMonthCard = ({
  group,
  project,
  onRegister,
  isRegistering = false,
}: Props) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex flex-col items-center justify-center border border-amber-100">
          <span className="text-xs font-bold uppercase">
            {group.label.split(" ")[0].slice(0, 3)}
          </span>
          <span className="text-lg font-bold">{group.year}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{group.label}</h3>
          <p className="text-sm text-slate-500">
            {group.sessions.length} work sessions recorded
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
        <div className="text-right">
          <p className="text-xs text-slate-400 font-medium uppercase">
            Total Value
          </p>
          <p className="text-2xl font-bold text-slate-900 flex items-center gap-1">
            <span className="text-sm text-slate-400 font-normal">
              {project.currency}
            </span>
            {group.totalAmount.toFixed(2)}
          </p>
        </div>

        <button
          onClick={() => onRegister(group)}
          disabled={isRegistering}
          className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
        >
          <Send size={18} />
          Register
        </button>
      </div>
    </div>
  );
};

export default UnpaidMonthCard;
