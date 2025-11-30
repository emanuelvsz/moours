import { Calendar, CheckCircle2 } from "lucide-react";
import type { WorkSession } from "@core/domain/work-session";
import type { Project } from "@core/domain/project";

interface Props {
  sessions: WorkSession[];
  projects: Project[];
}

export const ActivityList = ({ sessions, projects }: Props) => {
  const getProjectName = (id: string) =>
    projects.find((p) => p.id === id)?.name ?? "Unknown";

  return (
    <>
      <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
        <Calendar size={20} className="text-emerald-500" />
        Recent Activity{" "}
        <span className="text-slate-400 font-normal text-sm ml-1">
          ({sessions.length})
        </span>
      </h2>

      <div className="space-y-4">
        {sessions.length === 0 ? (
          <div className="text-center py-10 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            No activity found for this period.
          </div>
        ) : (
          sessions
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 5)
            .map((session) => (
              <div
                key={session.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-200 transition-all"
              >
                <div className="flex items-start gap-4 mb-2 sm:mb-0">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-700 shadow-sm">
                    <span className="text-[10px] uppercase">
                      {new Date(session.date).toLocaleString("default", {
                        month: "short",
                      })}
                    </span>
                    <span className="text-lg font-bold">
                      {session.date.split("-")[2]}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {session.description}
                    </p>
                    <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
                      {getProjectName(session.projectId)}
                      <span className="text-slate-300">•</span>
                      {session.startTime} – {session.endTime}
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
            ))
        )}
      </div>
    </>
  );
};
