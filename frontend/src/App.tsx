import React, { useState } from "react";
import { Menu } from "lucide-react";
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

const Header: React.FC<{ activeTab: string; onMenuClick: () => void }> = ({
  activeTab,
  onMenuClick,
}) => {
  const titles: Record<string, string> = {
    DASHBOARD: "Visão Geral",
    LOGS: "Minhas Horas",
    PROJECTS: "Gestão de Projetos",
    PROFILE: "Meu Perfil",
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight animate-in fade-in">
          {titles[activeTab] || "Moours"}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          v2.4.0
        </span>
      </div>
    </header>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("DASHBOARD");
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_FREELANCER);
  const [sessions, setSessions] = useState<WorkSession[]>(INITIAL_SESSIONS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleAddSession = (values: any) => {
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
