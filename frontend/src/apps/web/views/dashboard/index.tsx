import { Briefcase, Calendar, CheckCircle2, Clock, DollarSign } from "lucide-react";
import StatCard from "../../components/stat-card";
import { RoleCode } from "../../../../core/domain/role";
import type { WorkSession } from "../../../../core/domain/work-session";
import type { Project } from "../../../../core/domain/project";

const DashboardView: React.FC<{
  role: RoleCode;
  sessions: WorkSession[];
  projects: Project[];
}> = ({ role, sessions, projects }) => {
  const totalEarnings = sessions.reduce(
    (acc, s) => acc + s.calculatedAmount,
    0
  );
  const totalHours = sessions.reduce((acc, s) => {
    const project = projects.find((p) => p.id === s.projectId);
    return acc + s.calculatedAmount / (project?.hourlyRate || 1);
  }, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title={role === RoleCode.CHIEF ? "Custo Total" : "Faturamento Total"}
          value={`€${totalEarnings.toFixed(2)}`}
          icon={<DollarSign size={24} />}
          trend="+12% vs mês anterior"
        />
        <StatCard
          title="Horas Trabalhadas"
          value={`${totalHours.toFixed(1)}h`}
          icon={<Clock size={24} />}
          trend={`${sessions.length} sessões ativas`}
          trendColor="text-blue-500"
        />
        <StatCard
          title="Projetos Ativos"
          value={projects.length}
          icon={<Briefcase size={24} />}
          trend="Todos no prazo"
          trendColor="text-purple-500"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
          <Calendar className="text-emerald-500" size={20} />
          Atividade Recente
        </h2>
        <div className="space-y-4">
          {sessions.slice(0, 5).map((session) => (
            <div
              key={session.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100 group"
            >
              <div className="flex items-start gap-4 mb-2 sm:mb-0">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex flex-col items-center justify-center text-slate-600 font-bold border border-slate-200">
                  <span className="text-[10px] uppercase tracking-tighter">
                    {new Date(session.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </span>
                  <span className="text-lg leading-none">
                    {session.date.split("-")[2]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                    {session.description}
                  </p>
                  <p className="text-sm text-slate-400 flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {projects.find((p) => p.id === session.projectId)?.name}
                    <span className="text-slate-300">•</span>
                    {session.startTime} - {session.endTime}
                  </p>
                </div>
              </div>
              <div className="text-right pl-16 sm:pl-0">
                <p className="font-bold text-slate-900 text-lg">
                  €{session.calculatedAmount.toFixed(2)}
                </p>
                <div className="flex items-center justify-end gap-1 text-xs text-emerald-600 font-medium">
                  <CheckCircle2 size={12} /> Processado
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
