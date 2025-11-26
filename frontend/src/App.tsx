import { useState } from "react";
import { RoleCode } from "./core/domain/role";
import type { Project } from "./core/domain/project";
import type { UserProfile } from "./core/domain/user-profile";
import type { WorkSession } from "./core/domain/work-session";
import { DomainService } from "./core/services/domain";
import {
  INITIAL_PROJECTS,
  INITIAL_SESSIONS,
  MOCK_FREELANCER,
} from "./infra/in-memory";
import ProjectsView from "./apps/web/views/projects";
import DashboardView from "./apps/web/views/dashboard";
import Sidebar from "./apps/web/components/side-bar";
import LogsView from "./apps/web/views/log-list";
import ProfileView from "./apps/web/views/profile";
import Header from "./apps/web/components/header";

export type NewSessionValues = Omit<WorkSession, "id" | "calculatedAmount">;

export default function App() {
  const [activeTab, setActiveTab] = useState("DASHBOARD");
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_FREELANCER);
  const [sessions, setSessions] = useState<WorkSession[]>(INITIAL_SESSIONS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddSession = (values: NewSessionValues) => {
    const project = projects.find((p) => p.id === values.projectId);
    if (!project) return;

    const metrics = DomainService.calculateSessionMetrics(
      values.startTime,
      values.endTime,
      project.hourlyRate
    );

    setSessions([
      {
        id: DomainService.generateId(),
        ...values,
        calculatedAmount: metrics.amount,
      },
      ...sessions,
    ]);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "DASHBOARD":
        return (
          <DashboardView
            role={currentUser.role.code as RoleCode}
            sessions={sessions}
            projects={projects}
          />
        );
      case "LOGS":
        return (
          <LogsView
            userRole={currentUser.role.code as RoleCode}
            sessions={sessions}
            projects={projects}
            onAddSession={handleAddSession}
          />
        );
      case "PROJECTS":
        return currentUser.role.code === RoleCode.CHIEF ? (
          <ProjectsView projects={projects} />
        ) : (
          <DashboardView
            role={currentUser.role.code as RoleCode}
            sessions={sessions}
            projects={projects}
          />
        );
      case "PROFILE":
        return <ProfileView user={currentUser} />;
      default:
        return (
          <DashboardView
            role={currentUser.role.code as RoleCode}
            sessions={sessions}
            projects={projects}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={currentUser}
        setUser={setCurrentUser}
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          activeTab={activeTab}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
