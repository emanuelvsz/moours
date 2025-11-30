import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  label: string;
  value: string | number;
  badge: ReactNode;
}

const DashboardStatCard = ({ icon, label, value, badge }: Props) => {
  return (
    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <h2 className="font-semibold text-slate-700 text-sm">{label}</h2>
      </div>

      <p className="text-3xl font-bold text-slate-900">{value}</p>

      <p className="text-xs mt-1 font-medium">{badge}</p>
    </div>
  );
};

export default DashboardStatCard;
