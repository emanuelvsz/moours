import { TrendingUp } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon,
  trend,
  trendColor = "text-emerald-500",
}: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-3xl font-bold text-slate-800 mt-1 tracking-tight">
          {value}
        </h3>
      </div>
      <div className="p-3 bg-slate-50 rounded-xl text-slate-600">{icon}</div>
    </div>
    <p
      className={`text-xs font-semibold flex items-center gap-1 ${trendColor}`}
    >
      <TrendingUp size={14} />
      {trend}
    </p>
  </div>
);

export default StatCard;
