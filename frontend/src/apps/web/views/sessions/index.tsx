import { Plus, X } from "lucide-react";
import { DomainService } from "../../../../core/services/domain";
import { RoleCode } from "../../../../core/domain/role";
import { useState } from "react";
import type { Project } from "../../../../core/domain/project";
import type { WorkSession } from "../../../../core/domain/work-session";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateWorkSession } from "../../lib/hooks/work-session/use-create-work-session";
import { CreateSessionForm } from "./components/create-session-form";
import { SessionListTable } from "./components/session-list-table";

interface Props {
  sessions: WorkSession[];
  projects: Project[];
  userRole: RoleCode;
}

const SessionsScreen = ({ sessions, projects, userRole }: Props) => {
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const project = projects.find((p) => p.id === formData.projectId);
    if (!project) return;

    const metrics = DomainService.calculateWorkSession(
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
        calculatedAmount: metrics.amount,
      } as WorkSession,
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["work-session"] });
          setIsFormOpen(false);
          setFormData((prev) => ({ ...prev, desc: "" }));
        },
      }
    );
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm gap-4 bg-gradient-to-r from-slate-50 to-white">
        <div className="pl-2">
          <h2 className="text-lg font-bold text-slate-800">Time Records</h2>
          <p className="text-sm text-slate-500">
            Manage all your work entries.
          </p>
        </div>

        {userRole === RoleCode.FREELANCER && (
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-900/10 active:scale-95 font-medium border border-slate-700"
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
        onSubmit={handleFormSubmit}
        onFieldChange={handleFieldChange}
      />

      <SessionListTable sessions={sessions} projects={projects} />
    </div>
  );
};

export default SessionsScreen;
