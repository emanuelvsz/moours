import { History, FilterX } from "lucide-react";
import type { WorkSession } from "@core/domain/work-session";
import type { Project } from "@core/domain/project";
import { SessionListTable } from "@web/components/session-list-table";

interface Props {
  sessions: WorkSession[];
  project: Project;
  onCreateFirst?: () => void;
  onOpenModal?: () => void;
  isEmptyFallback?: React.ReactNode;
}

const SessionsPanel = ({
  sessions,
  project,
  onCreateFirst,
  onOpenModal,
  isEmptyFallback,
}: Props) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-6 animate-in fade-in">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
          <History size={20} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">Work History</h2>
          <p className="text-xs text-slate-400">
            Showing only your sessions in this project.
          </p>
        </div>
        <div className="ml-auto bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 text-xs font-bold text-slate-500">
          {sessions.length} Entries
        </div>
      </div>

      {sessions.length === 0 ? (
        isEmptyFallback ?? (
          <div className="py-12 flex flex-col items-center justify-center text-center text-slate-400 gap-3">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
              <FilterX size={24} className="opacity-50" />
            </div>
            <p>No work sessions recorded for this project yet.</p>
            {onCreateFirst && (
              <button
                onClick={onCreateFirst}
                className="text-emerald-600 font-bold hover:underline text-sm"
              >
                Create your first entry
              </button>
            )}
          </div>
        )
      ) : (
        <SessionListTable sessions={sessions} projects={[project]} />
      )}
    </div>
  );
};

export default SessionsPanel;
