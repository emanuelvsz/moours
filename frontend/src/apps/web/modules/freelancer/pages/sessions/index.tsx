import { useState } from "react";
import { Plus, X, Clock, History } from "lucide-react";
import { createMockedFreelancerUserProfile } from "../../../../../../infra/in-memory/user-profile/data";
import { useGetWorkSessions } from "../../../../lib/hooks/work-session/use-get-work-sessions";
import { useGetProjects } from "../../../../lib/hooks/project/use-get-projects";
import type { WorkSession } from "../../../../../../core/domain/work-session";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateWorkSession } from "../../../../lib/hooks/work-session/use-create-work-session";
import { RoleCode } from "../../../../../../core/domain/role";
import { CreateSessionForm } from "../../../../views/sessions/components/create-session-form";
import { SessionListTable } from "../../../../views/sessions/components/session-list-table";
import { DomainService } from "../../../../../../core/services/domain";

const SessionsScreen = () => {
  const account = createMockedFreelancerUserProfile();
  const { workSessions: sessions } = useGetWorkSessions();
  const { projects } = useGetProjects();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    projectId: projects[0]?.id || "",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "17:00",
    description: "",
  } as WorkSession);

  const queryClient = useQueryClient();
  const { createWorkSession, isPending } = useCreateWorkSession();

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
        userId: "u1",
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

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex w-full items-start justify-center bg-slate-50">
      <div className="w-full space-y-10 animate-in fade-in duration-500">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-xl p-8 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shadow-inner">
            <Clock size={28} />
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900">Time Sessions</h1>
            <p className="text-slate-500 text-sm">
              Create, edit and manage your work sessions.
            </p>
          </div>

          {account.role.code === RoleCode.FREELANCER && (
            <button
              onClick={() => setIsFormOpen((v) => !v)}
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              {isFormOpen ? <X size={18} /> : <Plus size={18} />}
              {isFormOpen ? "Cancel" : "New Session"}
            </button>
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
    </div>
  );
};

SessionsScreen.route = "/sessions";
export default SessionsScreen;
