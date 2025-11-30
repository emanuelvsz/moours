import { useState, useMemo } from "react";
import type { Project } from "@core/domain/project";
import type { WorkSession } from "@core/domain/work-session";
import { DomainService } from "@core/services/domain";
import Badge from "@components/badge";

interface Props {
  sessions: WorkSession[];
  projects: Project[];
  pageSize?: number;
}

export const SessionListTable = ({
  sessions,
  projects,
  pageSize = 10,
}: Props) => {
  const [page, setPage] = useState(1);

  const sortedSessions = useMemo(() => {
    return [...sessions].sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return db - da;
    });
  }, [sessions]);

  const totalPages = Math.ceil(sortedSessions.length / pageSize);

  const pageData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedSessions.slice(start, start + pageSize);
  }, [sortedSessions, page, pageSize]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">
                Date
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">
                Project
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase min-w-[200px]">
                Description
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">
                Duration
              </th>
              <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">
                Value
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {pageData.map((s) => {
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
                      DomainService.calculateWorkSession(
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

            {sortedSessions.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sortedSessions.length > 0 && (
        <div className="flex items-center justify-between p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition"
          >
            Previous
          </button>

          <span className="text-sm text-slate-600">
            Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
