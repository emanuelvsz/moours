import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, DollarSign, PieChart, User } from "lucide-react";
import { useGetProjects } from "@web/lib/hooks/project/use-get-projects";
import { useGetWorkSessions } from "@web/lib/hooks/work-session/use-get-work-sessions";
import Badge from "@web/components/badge";

const ProjectDetailsScreen = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects } = useGetProjects();
  const { workSessions } = useGetWorkSessions();

  const project = projects.find((p) => p.id === projectId);

  const projectSessions = useMemo(
    () => workSessions.filter((s) => s.projectId === projectId),
    [workSessions, projectId]
  );

  const totalCost = projectSessions.reduce(
    (acc, s) => acc + s.calculatedAmount,
    0
  );
  const totalHours = projectSessions.reduce((acc, s) => {
    return acc + s.calculatedAmount / (project?.hourlyRate || 1);
  }, 0);

  const freelancerStats = useMemo(() => {
    const stats: Record<
      string,
      { userId: string; totalAmount: number; sessionCount: number }
    > = {};

    projectSessions.forEach((session) => {
      if (!stats[session.userId]) {
        stats[session.userId] = {
          userId: session.userId,
          totalAmount: 0,
          sessionCount: 0,
        };
      }
      stats[session.userId].totalAmount += session.calculatedAmount;
      stats[session.userId].sessionCount += 1;
    });

    return Object.values(stats);
  }, [projectSessions]);

  if (!project) {
    return (
      <div className="p-8 text-center text-slate-500">Project not found</div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            {project.name}
            <Badge color="purple">{project.clientName}</Badge>
          </h1>
          <p className="text-slate-500 text-sm">
            Detailed breakdown of costs and resources.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-emerald-600">
            <DollarSign size={24} />
            <h3 className="font-bold text-slate-700">Total Spent</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            €{totalCost.toFixed(2)}
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-blue-600">
            <Clock size={24} />
            <h3 className="font-bold text-slate-700">Total Hours</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {totalHours.toFixed(1)}h
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-purple-600">
            <User size={24} />
            <h3 className="font-bold text-slate-700">Team Size</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {freelancerStats.length} Freelancers
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <PieChart size={20} className="text-slate-400" />
          <h2 className="font-bold text-lg text-slate-800">
            Cost by Freelancer
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Freelancer</th>
                <th className="px-6 py-4">Sessions</th>
                <th className="px-6 py-4">Contribution</th>
                <th className="px-6 py-4 text-right">Total Earned</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {freelancerStats.map((stat) => (
                <tr
                  key={stat.userId}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {stat.userId === "u1"
                      ? "Emanuel Vilela"
                      : `User ${stat.userId}`}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    {stat.sessionCount} sessions
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{
                            width: `${(stat.totalAmount / totalCost) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-slate-400">
                        {((stat.totalAmount / totalCost) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-600">
                    €{stat.totalAmount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => navigate(`/payments/${stat.userId}`)}
                      className="text-emerald-600 hover:text-emerald-800 font-medium hover:underline"
                    >
                      Manage Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

ProjectDetailsScreen.route = "/projects/:projectId";

export default ProjectDetailsScreen;
