import { LogOut, Settings } from "lucide-react";
import type { UserProfile } from "../../../../../../core/domain/user-profile";

interface Props {
  user: UserProfile;
  onLogoutRequest: () => void;
  onSettingsClick?: () => void;
}

export const UserProfileFooter = ({
  user,
  onLogoutRequest,
  onSettingsClick,
}: Props) => {
  return (
    <div className="p-6 border-t border-slate-800 bg-slate-900/50">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-sm font-bold text-white shadow-lg">
          {user.fullName.charAt(0)}
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold truncate text-slate-100">
            {user.fullName}
          </p>
          <p className="text-xs text-slate-400 capitalize">{user.role.name}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onSettingsClick}
          className="flex-1 text-xs text-slate-400 hover:text-white bg-slate-800 p-3 rounded-xl flex justify-between items-center border border-slate-700 hover:border-slate-600 transition-colors group"
        >
          <span>Settings</span>
          <Settings
            size={14}
            className="group-hover:rotate-90 transition-transform duration-500"
          />
        </button>

        <button
          onClick={onLogoutRequest}
          title="Log out"
          className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-slate-700 hover:border-red-500/50 transition-all flex items-center justify-center"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};
