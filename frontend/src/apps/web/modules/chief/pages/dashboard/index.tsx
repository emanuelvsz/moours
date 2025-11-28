import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
} from "lucide-react";
import { RoleCode } from "../../../../../../core/domain/role";
import { useGetWorkSessions } from "../../../../lib/hooks/work-session/use-get-work-sessions";
import { useGetProjects } from "../../../../lib/hooks/project/use-get-projects";
import { useAuthenticatedAccount } from "../../../../lib/hooks/auth/use-get-authenticated-account";

const DashboardScreen = () => {
  const { user: account } = useAuthenticatedAccount();
  const { workSessions: sessions } = useGetWorkSessions();
  const { projects } = useGetProjects();

  const totalEarnings = sessions.reduce(
    (acc, s) => acc + s.calculatedAmount,
    0
  );

  const totalHours = sessions.reduce((acc, s) => {
    const project = projects.find((p) => p.id === s.projectId);
    return acc + s.calculatedAmount / (project?.hourlyRate || 1);
  }, 0);

  return (
    <div className="flex w-full items-start justify-center bg-slate-50">
      <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-6 overflow-hidden">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
            <Clock size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Your Panel
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              See a summary of their activities and projects.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign size={20} className="text-emerald-600" />
              <h2 className="font-semibold text-slate-700 text-sm">
                {account?.role.code === RoleCode.CHIEF
                  ? "Total Cost"
                  : "Total Revenue"}
              </h2>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              €{totalEarnings.toFixed(2)}
            </p>
            <p className="text-xs text-emerald-600 mt-1 font-medium">
              +12% vs previous month
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={20} className="text-blue-600" />
              <h2 className="font-semibold text-slate-700 text-sm">
                Worked Hours
              </h2>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {totalHours.toFixed(1)}h
            </p>
            <p className="text-xs text-blue-600 mt-1 font-medium">
              {sessions.length} active sessions
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
            <div className="flex items-center gap-3 mb-2">
              <Briefcase size={20} className="text-purple-600" />
              <h2 className="font-semibold text-slate-700 text-sm">
                Active Projects
              </h2>
            </div>
            <p className="text-3xl font-bold text-slate-900">
              {projects.length}
            </p>
            <p className="text-xs text-purple-600 mt-1 font-medium">
              All on time
            </p>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
          <Calendar size={20} className="text-emerald-500" />
          Recent Activity
        </h2>

        <div className="space-y-4">
          {sessions.slice(0, 5).map((session) => (
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
                    {projects.find((p) => p.id === session.projectId)?.name}
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
          ))}
        </div>
      </div>
    </div>
  );
};

DashboardScreen.route = "/chief/dashboard";

export default DashboardScreen;
