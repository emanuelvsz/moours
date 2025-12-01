import { DollarSign, Clock, LineChart } from "lucide-react";
import { RoleCode } from "@core/domain/role";
import { DashboardStatCard } from "../dashboard-stat-card";

interface Props {
  totalEarnings: number;
  totalHours: number;
  sessionCount: number;
  equity: number;
  currentLabel: string;
  role: RoleCode;
}

export const DashboardStats = ({
  totalEarnings,
  totalHours,
  sessionCount,
  equity,
  currentLabel,
  role,
}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <DashboardStatCard
        icon={DollarSign}
        iconColor="text-emerald-600"
        title={role === RoleCode.CHIEF ? "Total Cost" : "Total Revenue"}
        value={`€${totalEarnings.toFixed(2)}`}
        subtitle={`in ${currentLabel}`}
      />

      <DashboardStatCard
        icon={Clock}
        iconColor="text-blue-600"
        title="Worked Hours"
        value={`${totalHours.toFixed(1)}h`}
        subtitle={`${sessionCount} sessions`}
      />

      <DashboardStatCard
        icon={LineChart}
        iconColor="text-purple-600"
        title="Equity"
        value={`€${equity.toFixed(2)}`}
        subtitle="Remaining value after payments"
      />
    </div>
  );
};
