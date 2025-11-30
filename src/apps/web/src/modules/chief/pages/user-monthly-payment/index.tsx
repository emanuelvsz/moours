import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, Calculator, Send } from "lucide-react";
import { useGetWorkSessions } from "@web/lib/hooks/work-session/use-get-work-sessions";

const UserMonthlyPaymentScreen = () => {
  const { userId } = useParams();
  const { workSessions } = useGetWorkSessions();

  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [exchangeRate, setExchangeRate] = useState<number>(6.15);

  const monthlySessions = useMemo(() => {
    return workSessions.filter((s) => {
      const isUser = s.userId === userId;
      const isMonth = s.date.startsWith(selectedMonth);
      return isUser && isMonth;
    });
  }, [workSessions, userId, selectedMonth]);

  const totalEur = monthlySessions.reduce(
    (acc, s) => acc + s.calculatedAmount,
    0
  );
  const totalBrl = totalEur * exchangeRate;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Monthly Payment</h1>
          <p className="text-slate-500">
            Consolidate and pay {userId === "u1" ? "Emanuel" : userId}.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <Calendar className="text-slate-400" size={20} />
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="outline-none text-slate-700 font-medium bg-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BriefcaseIcon /> Work Summary
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-500">Sessions Found</span>
                <span className="font-bold text-slate-900">
                  {monthlySessions.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-500">Total Hours (Est.)</span>
                <span className="font-bold text-slate-900">
                  {(totalEur / 8).toFixed(1)}h
                </span>
              </div>
              <div className="flex justify-between items-center py-3 bg-emerald-50 rounded-xl px-4 mt-2">
                <span className="text-emerald-700 font-medium">
                  Total Original
                </span>
                <span className="text-2xl font-bold text-emerald-700">
                  €{totalEur.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 max-h-64 overflow-y-auto">
            <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 px-2">
              Session Breakdown
            </h4>
            <div className="space-y-2">
              {monthlySessions.map((s) => (
                <div
                  key={s.id}
                  className="bg-white p-3 rounded-xl border border-slate-100 flex justify-between items-center text-sm"
                >
                  <div>
                    <p className="font-medium text-slate-700 truncate max-w-[200px]">
                      {s.description}
                    </p>
                    <p className="text-xs text-slate-400">{s.date}</p>
                  </div>
                  <span className="font-bold text-slate-600">
                    €{s.calculatedAmount}
                  </span>
                </div>
              ))}
              {monthlySessions.length === 0 && (
                <p className="text-center text-slate-400 py-4">
                  No sessions found for this month.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
              <Calculator size={24} className="text-emerald-400" /> Payment
              Calculation
            </h3>

            <div className="space-y-6 relative z-10">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">
                  Exchange Rate (EUR to BRL)
                </label>
                <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700 focus-within:border-emerald-500 transition-colors">
                  <div className="bg-slate-700 px-3 py-2 rounded-lg font-bold text-slate-300">
                    R$
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    value={exchangeRate}
                    onChange={(e) =>
                      setExchangeRate(parseFloat(e.target.value))
                    }
                    className="bg-transparent text-xl font-bold w-full outline-none text-white"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  * Rate based on the last day of {selectedMonth}.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-700/50">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-slate-400 font-medium">
                    Final Payment (BRL)
                  </span>
                  <span className="text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded">
                    Ready to Pay
                  </span>
                </div>
                <p className="text-5xl font-bold tracking-tight">
                  R$ {totalBrl.toFixed(2)}
                </p>
              </div>

              <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 rounded-xl shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all active:scale-95">
                <Send size={20} />
                Register Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BriefcaseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-slate-400"
  >
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

UserMonthlyPaymentScreen.route = "/payments/:userId";

export default UserMonthlyPaymentScreen;
