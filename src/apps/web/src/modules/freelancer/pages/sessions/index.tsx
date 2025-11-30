import { useState } from "react";
import { Plus, X, Clock, History, Upload } from "lucide-react";
import { useGetWorkSessions } from "@lib/hooks/work-session/use-get-work-sessions";
import { useGetProjects } from "@lib/hooks/project/use-get-projects";
import type { WorkSession } from "@core/domain/work-session";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateWorkSession } from "@lib/hooks/work-session/use-create-work-session";
import { RoleCode } from "@core/domain/role";
import { DomainService } from "@core/services/domain";
import { useAuthenticatedAccount } from "@lib/hooks/auth/use-get-authenticated-account";
import { CreateSessionForm } from "./components/create-session-form";
import { useCreateBulkWorkSessions } from "@web/lib/hooks/work-session/use-bulk-create-work-session";
import { ImportSessionsModal } from "@web/components/import-work-session-modal";
import { SessionListTable } from "@web/components/session-list-table";

const SessionsScreen = () => {
  const { user: account } = useAuthenticatedAccount();

  const { workSessions: sessions } = useGetWorkSessions();
  const { projects } = useGetProjects();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    projectId: projects[0]?.id || "",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "17:00",
    description: "",
  } as WorkSession);

  const queryClient = useQueryClient();
  const { createWorkSession, isPending } = useCreateWorkSession();
  const { createBulk, isPending: isBulkPending } = useCreateBulkWorkSessions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project = projects.find((p) => p.id === formData.projectId);
    if (!project) return;

    const calc = DomainService.calculateWorkSession(
      formData.startTime,
      formData.endTime,
      project.hourlyRate
    );

    createWorkSession(
      {
        projectId: formData.projectId,
        userId: account?.id || "u1",
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        description: formData.description,
        calculatedAmount: calc.amount,
      } as WorkSession,
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["work-session"] });
          setIsFormOpen(false);
          setFormData((p) => ({ ...p, description: "" }));
        },
      }
    );
  };

  const handleBulkImport = (sessions: WorkSession[]) => {
    createBulk(sessions, {
      onSuccess: () => {
        setIsImportModalOpen(false);
      },
    });
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex w-full items-start justify-center bg-slate-50">
      <div className="w-full space-y-4 animate-in fade-in duration-500">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shadow-inner">
              <Clock size={28} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Time Sessions
              </h1>
              <p className="text-slate-500 text-sm">
                Create, edit and manage your work sessions.
              </p>
            </div>
          </div>

          {account?.role.code === RoleCode.FREELANCER && (
            <div className="flex gap-2 w-full md:w-auto">
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl transition-all active:scale-95 font-medium"
              >
                <Upload size={18} />
                Import CSV
              </button>

              <button
                onClick={() => setIsFormOpen((v) => !v)}
                className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 font-medium"
              >
                {isFormOpen ? <X size={18} /> : <Plus size={18} />}
                {isFormOpen ? "Cancel" : "New Session"}
              </button>
            </div>
          )}
        </div>

        <CreateSessionForm
          isOpen={isFormOpen}
          projects={projects}
          formData={formData}
          isPending={isPending}
          onSubmit={handleSubmit}
          onFieldChange={handleFieldChange}
        />

        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-50 rounded-lg text-emerald-600">
              <History size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-800">
              Session History
            </h2>
          </div>

          <SessionListTable sessions={sessions} projects={projects} />
        </div>
      </div>

      <ImportSessionsModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        projects={projects}
        userId={account?.id || "u1"}
        onConfirm={handleBulkImport}
        isPending={isBulkPending}
      />
    </div>
  );
};

SessionsScreen.route = "/sessions";
export default SessionsScreen;
