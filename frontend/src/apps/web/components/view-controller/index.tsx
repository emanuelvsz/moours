import { RoleCode } from "../../../../core/domain/role";
import type { UserProfile } from "../../../../core/domain/user-profile";
import { useGetProjects } from "../../lib/hooks/project/use-get-projects";
import DashboardView from "../../modules/freelancer/pages/dashboard";
import SessionsScreen from "../../views/sessions";
import ProfileScreen from "../../views/profile";
import ProjectsView from "../../views/projects";
import { useGetWorkSessions } from "../../lib/hooks/work-session/use-get-work-sessions";

const ViewController: React.FC<{
  user: UserProfile;
  activeView: string;
}> = ({ user, activeView }) => {
  const { workSessions: sessions } = useGetWorkSessions();
  const { projects, finding: findingProjects } = useGetProjects();

  switch (activeView) {
    case "DASHBOARD":
      return (
        <DashboardView
          role={user.role.code as RoleCode}
          sessions={sessions}
          projects={projects}
        />
      );
    case "SESSIONS":
      return (
        <SessionsScreen
          userRole={user.role.code}
          sessions={sessions}
          projects={projects}
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
      return <ProfileScreen user={user} />;
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
