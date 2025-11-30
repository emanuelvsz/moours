import { Calendar } from "lucide-react";
import type { WorkSession } from "@core/domain/work-session";
import type { Project } from "@core/domain/project";
import RecentActivityItem from "../recent-activity-item";

interface Props {
  sessions: WorkSession[];
  projects: Project[];
}

const RecentActivity = ({ sessions, projects }: Props) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
        <Calendar size={20} className="text-emerald-500" />
        Recent Activity
      </h2>

      <div className="space-y-4">
        {sessions.slice(0, 5).map((s) => (
          <RecentActivityItem
            key={s.id}
            session={s}
            project={projects.find((p) => p.id === s.projectId)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
