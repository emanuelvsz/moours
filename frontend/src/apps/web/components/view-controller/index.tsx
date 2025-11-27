import type { NewSessionValues } from "../../../../App";
import { RoleCode } from "../../../../core/domain/role";
import type { UserProfile } from "../../../../core/domain/user-profile";
import { DomainService } from "../../../../core/services/domain";
import { useGetProjects } from "../../lib/hooks/project/use-get-projects";
import DashboardView from "../../views/dashboard";
import LogsView from "../../views/sessions";
import ProfileView from "../../views/profile";
import ProjectsView from "../../views/projects";
import { useGetWorkSessions } from "../../lib/hooks/work-session/use-get-work-sessions";

const ViewController: React.FC<{
  user: UserProfile;
  activeView: string;
}> = ({ user, activeView }) => {
  const { workSessions: sessions } = useGetWorkSessions();
  const { projects, finding: findingProjects } = useGetProjects();

  const handleAddSession = (values: NewSessionValues) => {
    const project = projects?.find((p) => p.id === values.projectId);
    if (!project) return;

    const metrics = DomainService.calculateWorkSession(
      values.startTime,
      values.endTime,
      project.hourlyRate
    );
    console.log(metrics);
  };

  switch (activeView) {
    case "DASHBOARD":
      return (
        <DashboardView
          role={user.role.code as RoleCode}
          sessions={sessions}
          projects={projects}
        />
      );
    case "LOGS":
      return (
        <LogsView
          userRole={user.role.code}
          sessions={sessions}
          projects={projects}
          onAddSession={handleAddSession}
        />
      );
    case "PROJECTS":
      return user.role.code === RoleCode.CHIEF ? (
        <ProjectsView projects={projects} finding={findingProjects} />
      ) : (
        <DashboardView
          role={user.role.code}
          sessions={sessions}
          projects={projects}
        />
      );
    case "PROFILE":
      return <ProfileView user={user} />;
    default:
      return (
        <DashboardView
          role={user.role.code}
          sessions={sessions}
          projects={projects}
        />
      );
  }
};

export default ViewController;
