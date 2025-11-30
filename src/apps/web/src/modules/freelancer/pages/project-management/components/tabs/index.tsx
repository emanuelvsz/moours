import { History, DollarSign } from "lucide-react";

interface Props {
  active: "sessions" | "payments";
  onChange: (tab: "sessions" | "payments") => void;
}

const ProjectTabs = ({ active, onChange }: Props) => {
  return (
    <div className="flex border-b border-slate-200">
      <button
        onClick={() => onChange("sessions")}
        className={`px-6 py-3 font-medium text-sm flex items-center gap-2 transition-colors border-b-2 ${
          active === "sessions"
            ? "border-emerald-500 text-emerald-600"
            : "border-transparent text-slate-500 hover:text-slate-700"
        }`}
      >
        <History size={18} />
        Work History
      </button>

      <button
        onClick={() => onChange("payments")}
        className={`px-6 py-3 font-medium text-sm flex items-center gap-2 transition-colors border-b-2 ${
          active === "payments"
            ? "border-emerald-500 text-emerald-600"
            : "border-transparent text-slate-500 hover:text-slate-700"
        }`}
      >
        <DollarSign size={18} />
        Payments & Closures
      </button>
    </div>
  );
};

export default ProjectTabs;
