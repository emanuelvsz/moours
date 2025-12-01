import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuthenticatedAccount } from "@lib/hooks/auth/use-get-authenticated-account";
import { useGetWorkSessions } from "@lib/hooks/work-session/use-get-work-sessions";
import { useGetProjects } from "@lib/hooks/project/use-get-projects";
import { useCreateWorkSession } from "@lib/hooks/work-session/use-create-work-session";

import { DomainService } from "@core/services/domain";
import type { WorkSession } from "@core/domain/work-session";
import { RoleCode } from "@core/domain/role";

import { CreateSessionModal } from "@components/create-session-modal";

import {
  formatPeriodLabel,
  getPeriodRange,
  isSessionInPeriod,
  navigatePeriod,
  PeriodType,
} from "@web/lib/utils/date";
import { DashboardHeader } from "./components/header";
import { PeriodFilter } from "./components/period-filter";
import { DashboardStats } from "../../../../components/dashboard-stats";
import { ActivityList } from "./components/activity-list";

const DashboardScreen = () => {
  const queryClient = useQueryClient();

  const { user: account } = useAuthenticatedAccount();
  const { workSessions: sessions } = useGetWorkSessions();
  const { projects } = useGetProjects();

  const { createWorkSession, isPending } = useCreateWorkSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [periodType, setPeriodType] = useState<PeriodType>("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  // ⭐ Novo estado para filtrar por projeto
  const [selectedProjectId, setSelectedProjectId] = useState<string | "all">(
    "all"
  );

  // ⭐ Filtrando período + projeto
  const filteredSessions = useMemo(() => {
    const range = getPeriodRange(currentDate, periodType);

    return sessions.filter((s) => {
      const matchPeriod = isSessionInPeriod(s.date, range);
      const matchProject =
        selectedProjectId === "all" || s.projectId === selectedProjectId;
      return matchPeriod && matchProject;
    });
  }, [sessions, currentDate, periodType, selectedProjectId]);

  const totalEarnings = filteredSessions.reduce(
    (acc, s) => acc + s.calculatedAmount,
    0
  );

  const totalHours = filteredSessions.reduce((acc, s) => {
    const project = projects.find((p) => p.id === s.projectId);
    return acc + s.calculatedAmount / (project?.hourlyRate || 1);
  }, 0);

  const handleCreateSession = (data: Partial<WorkSession>) => {
    const project = projects.find((p) => p.id === data.projectId);
    if (!project || !account) return;

    const calc = DomainService.calculateWorkSession(
      data.startTime!,
      data.endTime!,
      project.hourlyRate
    );

    createWorkSession(
      {
        projectId: data.projectId!,
        userId: account.id,
        date: data.date!,
        startTime: data.startTime!,
        endTime: data.endTime!,
        description: data.description!,
        calculatedAmount: calc.amount,
      } as WorkSession,
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["work-session"] });
          setIsModalOpen(false);
        },
      }
    );
  };

  return (
    <div className="flex w-full items-start justify-center bg-slate-50 animate-in fade-in duration-500">
      <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-6 overflow-hidden">
        <DashboardHeader
          canCreate={account?.role.code === RoleCode.FREELANCER}
          onNewSession={() => setIsModalOpen(true)}
        />

        <PeriodFilter
          periodType={periodType}
          onPeriodTypeChange={setPeriodType}
          currentLabel={formatPeriodLabel(currentDate, periodType)}
          onPrev={() =>
            setCurrentDate((d) => navigatePeriod(d, periodType, "prev"))
          }
          onNext={() =>
            setCurrentDate((d) => navigatePeriod(d, periodType, "next"))
          }
          onReset={() => setCurrentDate(new Date())}
          showFilterByProject
          projects={projects}
          selectedProjectId={selectedProjectId}
          onProjectChange={(id) => setSelectedProjectId(id ?? "all")}
        />

        <DashboardStats
          totalEarnings={totalEarnings}
          totalHours={parseFloat(totalHours.toFixed(1)) || 0}
          sessionCount={filteredSessions.length}
          equity={0}
          currentLabel={formatPeriodLabel(currentDate, periodType)}
          role={account?.role.code ?? RoleCode.FREELANCER}
        />

        <ActivityList sessions={filteredSessions} projects={projects} />
      </div>

      {isModalOpen && (
        <CreateSessionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projects={projects}
          onSubmit={handleCreateSession}
          isPending={isPending}
        />
      )}
    </div>
  );
};

DashboardScreen.route = "/dashboard";
export default DashboardScreen;
