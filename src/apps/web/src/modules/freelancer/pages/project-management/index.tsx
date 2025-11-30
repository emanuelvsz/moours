import { useParams, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuthenticatedAccount } from "@web/lib/hooks/auth/use-get-authenticated-account";
import { useGetProjects } from "@web/lib/hooks/project/use-get-projects";
import { useGetWorkSessions } from "@web/lib/hooks/work-session/use-get-work-sessions";
import { useCreateWorkSession } from "@web/lib/hooks/work-session/use-create-work-session";
import { useCreatePayment } from "@web/lib/hooks/payment/use-create-payment";
import { useProjectUnpaidMonths } from "@web/lib/hooks/project/use-unpaid-months";

import type { WorkSession } from "@core/domain/work-session";
import type { Project } from "@core/domain/project";
import { PaymentStatus } from "@core/domain/payment";
import { DomainService } from "@core/services/domain";

import { CreateSessionModal } from "@components/create-session-modal";
import ProjectHeader from "./components/project-header";
import ProjectTabs from "./components/tabs";
import SessionsPanel from "./components/sessions-panel";
import PaymentsPanel from "./components/payments-panel";
import { DashboardStats } from "@web/components/dashboard-stats";
import { PeriodType } from "@web/lib/utils/date";
import { PeriodFilter } from "../dashboard/components/period-filter";

const ProjectManagementScreen = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { user } = useAuthenticatedAccount();
  const { projects } = useGetProjects();
  const { workSessions } = useGetWorkSessions();

  const project = projects.find((p) => p.id === projectId) as
    | Project
    | undefined;

  const [activeTab, setActiveTab] = useState<"sessions" | "payments">(
    "sessions"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [periodType, setPeriodType] = useState<PeriodType>("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentLabel = useMemo(() => {
    return new Intl.DateTimeFormat("en", {
      month: "long",
      year: "numeric",
    }).format(currentDate);
  }, [currentDate]);

  const handlePeriodTypeChange = (type: PeriodType) => setPeriodType(type);

  const handlePrev = () => {
    const d = new Date(currentDate);
    if (periodType === "month") d.setMonth(d.getMonth() - 1);
    if (periodType === "year") d.setFullYear(d.getFullYear() - 1);
    if (periodType === "week") d.setDate(d.getDate() - 7);
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    if (periodType === "month") d.setMonth(d.getMonth() + 1);
    if (periodType === "year") d.setFullYear(d.getFullYear() + 1);
    if (periodType === "week") d.setDate(d.getDate() + 7);
    setCurrentDate(d);
  };

  const handleReset = () => setCurrentDate(new Date());

  const myProjectSessions = useMemo(() => {
    if (!user || !projectId) return [];

    const sessions = workSessions.filter(
      (s) => s.projectId === projectId && s.userId === user.id
    );

    const filtered = sessions.filter((s) => {
      const sessionDate = new Date(s.date);

      if (periodType === "month") {
        return (
          sessionDate.getMonth() === currentDate.getMonth() &&
          sessionDate.getFullYear() === currentDate.getFullYear()
        );
      }

      if (periodType === "year") {
        return sessionDate.getFullYear() === currentDate.getFullYear();
      }

      if (periodType === "week") {
        const diff =
          (sessionDate.getTime() -
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate()
            ).getTime()) /
          (1000 * 60 * 60 * 24);

        return Math.abs(diff) < 7;
      }

      return true;
    });

    return filtered;
  }, [workSessions, user, projectId, periodType, currentDate]);

  const { createWorkSessionAsync, isPending: isCreatingSession } =
    useCreateWorkSession();

  const handleCreateSession = async (data: Partial<WorkSession>) => {
    if (!project || !user) return;
    try {
      const calc = DomainService.calculateWorkSession(
        data.startTime!,
        data.endTime!,
        project.hourlyRate
      );

      await createWorkSessionAsync({
        projectId: project.id,
        userId: user.id,
        date: data.date!,
        startTime: data.startTime!,
        endTime: data.endTime!,
        description: data.description!,
        calculatedAmount: calc.amount,
      } as WorkSession);

      await queryClient.invalidateQueries({ queryKey: ["work-session"] });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to create session", err);
      alert("Error creating session");
    }
  };

  const { unpaidMonths, isLoading: isLoadingPayments } =
    useProjectUnpaidMonths(projectId);
  const { createPayment, isPending: isPaying } = useCreatePayment();

  const handleRegisterPayment = (group: any) => {
    if (!user || !project) return;
    if (
      !confirm(
        `Register payment for ${group.label} with total €${group.totalAmount}?`
      )
    )
      return;

    createPayment(
      {
        id: crypto.randomUUID(),
        chiefId: "chief-placeholder",
        freelancerId: user.id,
        month: group.month,
        year: group.year,
        originalAmount: group.totalAmount,
        originalCurrency: project.currency,
        status: PaymentStatus.PENDING,
        createdAt: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["work-session"] });
          queryClient.invalidateQueries({ queryKey: ["payments"] });
          alert("Payment registered successfully!");
        },
      }
    );
  };

  const totalEarnings = myProjectSessions.reduce(
    (acc, s) => acc + s.calculatedAmount,
    0
  );

  const totalHours = myProjectSessions.reduce((acc, s) => {
    if (!s.date || !s.startTime || !s.endTime) return acc;
    const start = new Date(`${s.date}T${s.startTime}`);
    const end = new Date(`${s.date}T${s.endTime}`);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return acc;
    return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }, 0);

  if (!project) return null;

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <ProjectHeader
        project={project}
        onBack={() => navigate("/projects")}
        onNewSession={() => setIsModalOpen(true)}
        canCreate
      />

      <ProjectTabs active={activeTab} onChange={setActiveTab} />

      <PeriodFilter
        periodType={periodType}
        onPeriodTypeChange={handlePeriodTypeChange}
        currentLabel={currentLabel}
        onPrev={handlePrev}
        onNext={handleNext}
        onReset={handleReset}
      />

      <DashboardStats
        totalEarnings={totalEarnings}
        totalHours={totalHours}
        sessionCount={myProjectSessions.length}
        equity={0}
        currentLabel={currentLabel}
        role={user!.role.code}
      />

      {activeTab === "sessions" && (
        <SessionsPanel
          sessions={myProjectSessions}
          project={project}
          onCreateFirst={() => setIsModalOpen(true)}
          onOpenModal={() => setIsModalOpen(true)}
        />
      )}

      {activeTab === "payments" && (
        <PaymentsPanel
          project={project}
          unpaidMonths={unpaidMonths}
          isLoading={isLoadingPayments}
          onRegister={handleRegisterPayment}
          isRegistering={isPaying}
        />
      )}

      {isModalOpen && (
        <CreateSessionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projects={[project]}
          onSubmit={handleCreateSession}
          isPending={isCreatingSession}
        />
      )}
    </div>
  );
};

ProjectManagementScreen.route = "/projects/:projectId";

export default ProjectManagementScreen;
