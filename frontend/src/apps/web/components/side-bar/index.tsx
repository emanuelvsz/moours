import {
  Briefcase,
  Calendar,
  ChevronRight,
  Clock,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import { RoleCode } from "../../../../core/domain/role";
import type { UserProfile } from "../../../../core/domain/user-profile";
import { Link } from "react-router-dom";

interface Props {
  user: UserProfile;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ user, isOpen, onToggle }: Props) => {
  const items = [
    {
      id: "DASHBOARD",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      to: "/dashboard",
    },
    {
      id: "SESSIONS",
      label: "My Sessions",
      icon: <Calendar size={20} />,
      to: "/sessions",
    },
    {
      id: "PROJECTS",
      label: "Projects",
      icon: <Briefcase size={20} />,
      to: "/projects",
      roleRequired: RoleCode.CHIEF,
    },
    {
      id: "PROFILE",
      label: "My Profile",
      icon: <User size={20} />,
      to: "/profile",
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-30 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-8 border-b border-slate-800 flex items-center gap-3 text-emerald-400 font-bold text-2xl">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Clock size={24} />
          </div>
          Moours
        </div>

        <nav className="flex-1 p-6 space-y-3">
          {items.map((item) => {
            if (item.roleRequired && user.role.code !== item.roleRequired)
              return null;

            return (
              <Link
                key={item.id}
                to={item.to}
                onClick={onToggle}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                {item.icon}
                {item.label}
                <ChevronRight size={16} className="ml-auto opacity-70" />
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-sm font-bold text-white shadow-lg">
              {user.fullName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate text-slate-100">
                {user.fullName}
              </p>
              <p className="text-xs text-slate-400 capitalize">
                {user.role.name}
              </p>
            </div>
          </div>

          <button className="w-full text-xs text-slate-400 hover:text-white bg-slate-800 p-3 rounded-xl flex justify-between border border-slate-700">
            <span>Settings</span>
            <Settings size={14} />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
