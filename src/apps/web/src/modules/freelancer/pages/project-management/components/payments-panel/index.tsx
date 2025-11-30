import { Calendar, CheckCircle2 } from "lucide-react";
import type { MonthlyGroup } from "@web/lib/hooks/project/use-unpaid-months";
import type { Project } from "@core/domain/project";
import UnpaidMonthCard from "../unpaid-month-card";

interface Props {
  project: Project;
  unpaidMonths: MonthlyGroup[];
  isLoading: boolean;
  onRegister: (group: MonthlyGroup) => void;
  isRegistering?: boolean;
}

const PaymentsPanel = ({
  project,
  unpaidMonths,
  isLoading,
  onRegister,
  isRegistering = false,
}: Props) => {
  return (
    <div className="space-y-4 animate-in fade-in">
      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <Calendar size={20} className="text-amber-500" />
        Pending Registration
      </h2>

      {isLoading ? (
        <div className="p-8 text-center text-slate-400">Loading periods...</div>
      ) : unpaidMonths.length === 0 ? (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-slate-600 font-medium">All caught up!</p>
          <p className="text-slate-400 text-sm">
            No pending work sessions found for this project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {unpaidMonths.map((group) => (
            <UnpaidMonthCard
              key={group.key}
              group={group}
              project={project}
              onRegister={onRegister}
              isRegistering={isRegistering}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentsPanel;
