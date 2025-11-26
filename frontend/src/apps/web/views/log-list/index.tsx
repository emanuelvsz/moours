import { Clock, Plus, X } from "lucide-react";
import { DomainService } from "../../../../core/services/domain";
import { RoleCode } from "../../../../core/domain/role";
import { useState } from "react";
import type { Project } from "../../../../core/domain/project";
import type { WorkSession } from "../../../../core/domain/work-session";
import Badge from "../../components/badge";

const LogsView: React.FC<{
  sessions: WorkSession[];
  projects: Project[];
  onAddSession: (v: any) => void;
  userRole: RoleCode;
}> = ({ sessions, projects, onAddSession, userRole }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectId: projects[0]?.id || "",
    date: new Date().toISOString().split("T")[0],
    start: "09:00",
    end: "17:00",
    desc: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddSession({
      projectId: formData.projectId,
      userId: "u1",
      date: formData.date,
      startTime: formData.start,
      endTime: formData.end,
      description: formData.desc,
    });
    setIsFormOpen(false);
    setFormData({ ...formData, desc: "" });
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm gap-4 bg-gradient-to-r from-slate-50 to-white">
        <div className="pl-2">
          <h2 className="text-lg font-bold text-slate-800">
            Registros de Tempo
          </h2>
          <p className="text-sm text-slate-500">
            Gerencie todas as suas entradas de trabalho
          </p>
        </div>
        {userRole === RoleCode.FREELANCER && (
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-900/10 active:scale-95 font-medium border border-slate-700"
          >
            {isFormOpen ? <X size={18} /> : <Plus size={18} />}
            {isFormOpen ? "Cancelar" : "Nova Sessão"}
          </button>
        )}
      </div>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-xl border border-emerald-100 ring-4 ring-emerald-50/50 animate-in slide-in-from-top-4"
        >
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <Clock size={16} />
            </span>
            Novo Registro
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                Projeto
              </label>
              <select
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 focus:bg-white outline-none transition-all"
                value={formData.projectId}
                onChange={(e) =>
                  setFormData({ ...formData, projectId: e.target.value })
                }
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.currency}
                    {p.hourlyRate}/h)
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                Data
              </label>
              <input
                type="date"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Início
                </label>
                <input
                  type="time"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none text-center"
                  value={formData.start}
                  onChange={(e) =>
                    setFormData({ ...formData, start: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                  Fim
                </label>
                <input
                  type="time"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none text-center"
                  value={formData.end}
                  onChange={(e) =>
                    setFormData({ ...formData, end: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="lg:col-span-4">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2">
                Descrição
              </label>
              <input
                type="text"
                placeholder="O que você fez hoje?"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none"
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium shadow-md active:scale-95 transition-all"
            >
              Salvar Registro
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">
                  Data
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">
                  Projeto
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase min-w-[200px]">
                  Descrição
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">
                  Duração
                </th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessions.map((s) => {
                const project = projects.find((p) => p.id === s.projectId);
                return (
                  <tr
                    key={s.id}
                    className="hover:bg-emerald-50/30 transition-colors"
                  >
                    <td className="p-4 text-slate-600 text-sm whitespace-nowrap">
                      {DomainService.formatDate(s.date)}
                    </td>
                    <td className="p-4">
                      <Badge color="blue">{project?.name}</Badge>
                    </td>
                    <td className="p-4 text-slate-700 text-sm font-medium">
                      {s.description}
                    </td>
                    <td className="p-4 text-slate-500 text-sm text-right font-mono">
                      {
                        DomainService.calculateSessionMetrics(
                          s.startTime,
                          s.endTime,
                          0
                        ).durationLabel
                      }
                    </td>
                    <td className="p-4 text-emerald-600 font-bold text-sm text-right">
                      {DomainService.formatCurrency(
                        s.calculatedAmount,
                        project?.currency || "€"
                      )}
                    </td>
                  </tr>
                );
              })}
              {sessions.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    Nenhum registro encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogsView;
