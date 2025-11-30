import { Clock, Plus } from "lucide-react";
import { RoleCode } from "@core/domain/role";
import { UserProfile } from "@core/domain/user-profile";

interface Props {
  account: UserProfile;
  onNewSession: () => void;
}

const DashboardHeader = ({ account, onNewSession }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
          <Clock size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Your Panel
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            See a summary of their activities and projects.
          </p>
        </div>
      </div>

      {account?.role.code === RoleCode.FREELANCER && (
        <button
          onClick={onNewSession}
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <Plus size={18} />
          New Session
        </button>
      )}
    </div>
  );
};

export default DashboardHeader;
