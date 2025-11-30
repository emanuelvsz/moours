import { DollarSign, Clock, Briefcase } from "lucide-react";
import type { Project } from "@core/domain/project";
import type { WorkSession } from "@core/domain/work-session";
import type { UserProfile } from "@core/domain/user-profile";
import { RoleCode } from "@core/domain/role";
import DashboardStatCard from "../dashboard-stat-card";

interface Props {
  totalEarnings: number;
  totalHours: number;
  projects: Project[];
  sessions: WorkSession[];
  account: UserProfile | null;
}

const DashboardStats = ({
  totalEarnings,
  totalHours,
  projects,
  sessions,
  account,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <DashboardStatCard
        icon={<DollarSign size={20} className="text-emerald-600" />}
        label={
          account?.role.code === RoleCode.CHIEF ? "Total Cost" : "Total Revenue"
        }
        value={`€${totalEarnings.toFixed(2)}`}
        badge={<span className="text-emerald-600">+12% vs previous month</span>}
      />

      <DashboardStatCard
        icon={<Clock size={20} className="text-blue-600" />}
        label="Worked Hours"
        value={`${totalHours.toFixed(1)}h`}
        badge={
          <span className="text-blue-600">
            {sessions.length} active sessions
          </span>
        }
      />

      <DashboardStatCard
        icon={<Briefcase size={20} className="text-purple-600" />}
        label="Active Projects"
        value={projects.length}
        badge={<span className="text-purple-600">All on time</span>}
      />
    </div>
  );
};

export default DashboardStats;
