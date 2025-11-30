import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export type PeriodType = "month" | "week" | "year";

interface Props {
  periodType: PeriodType;
  onPeriodTypeChange: (type: PeriodType) => void;
  currentLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onReset: () => void;
}

export const PeriodFilter = ({
  periodType,
  onPeriodTypeChange,
  currentLabel,
  onPrev,
  onNext,
  onReset,
}: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 p-1.5 rounded-2xl border border-slate-200 mb-8 gap-2">
      <div className="flex bg-white rounded-xl p-1 shadow-sm border border-slate-100 w-full sm:w-auto">
        {(["month", "week", "year"] as PeriodType[]).map((type) => (
          <button
            key={type}
            onClick={() => onPeriodTypeChange(type)}
            className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
              periodType === type
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end px-2">
        <button
          onClick={onPrev}
          className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-500 transition-all"
        >
          <ChevronLeft size={20} />
        </button>

        <div
          className="flex items-center gap-2 font-bold text-slate-700 min-w-[140px] justify-center cursor-pointer hover:bg-white px-3 py-1 rounded-lg transition-colors"
          onClick={onReset}
          title="Reset to today"
        >
          <Calendar size={16} className="text-emerald-500" />
          <span>{currentLabel}</span>
        </div>

        <button
          onClick={onNext}
          className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-slate-500 transition-all"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
