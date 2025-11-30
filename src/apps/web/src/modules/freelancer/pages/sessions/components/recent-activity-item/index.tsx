import { CheckCircle2 } from "lucide-react";
import type { WorkSession } from "@core/domain/work-session";
import type { Project } from "@core/domain/project";

interface Props {
  session: WorkSession;
  project: Project | undefined;
}

const RecentActivityItem = ({ session, project }: Props) => {
  const date = new Date(session.date);
  const day = session.date.split("-")[2];
  const month = date.toLocaleString("default", { month: "short" });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-200 transition-all">
      <div className="flex items-start gap-4 mb-2 sm:mb-0">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-700 shadow-sm">
          <span className="text-[10px] uppercase">{month}</span>
          <span className="text-lg font-bold">{day}</span>
        </div>

        <div>
          <p className="font-semibold text-slate-800">{session.description}</p>
          <p className="text-sm text-slate-400 mt-1">
            {project?.name} • {session.startTime} – {session.endTime}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-slate-900">
          €{session.calculatedAmount.toFixed(2)}
        </p>

        <div className="flex justify-end items-center gap-1 text-xs text-emerald-600 font-medium">
          <CheckCircle2 size={12} /> Processed
        </div>
      </div>
    </div>
  );
};

export default RecentActivityItem;
