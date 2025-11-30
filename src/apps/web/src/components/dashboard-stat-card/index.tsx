import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  value: string | number;
  subtitle: string;
}

export const DashboardStatCard = ({
  icon: Icon,
  iconColor,
  title,
  value,
  subtitle,
}: Props) => {
  return (
    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-inner">
      <div className="flex items-center gap-3 mb-2">
        <Icon size={20} className={iconColor} />
        <h2 className="font-semibold text-slate-700 text-sm">{title}</h2>
      </div>

      <p className="text-3xl font-bold text-slate-900">{value}</p>
      <p className="text-xs mt-1 font-medium text-slate-600">{subtitle}</p>
    </div>
  );
};
