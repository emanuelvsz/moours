import { useMemo, useState } from "react";
import { Clock } from "lucide-react";
import type { UserProfile } from "@core/domain/user-profile";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@lib/hooks/auth/use-logout";
import { getModuleRoutesByAccount } from "../../modules";
import type { SingleRoute } from "@lib/types/route";
import { LogoutConfirmationModal } from "./components/logout-confirm-modal";
import { NavigationMenu } from "./components/navigation-menu";
import { UserProfileFooter } from "./components/user-profile-footer";

interface Props {
  user?: UserProfile | null;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ user, isOpen, onToggle }: Props) => {
  const navigate = useNavigate();
  const { logout } = useLogout();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const routes = useMemo(() => {
    if (!user) return [];
    const moduleRoutes = getModuleRoutesByAccount(user);
    return (
      moduleRoutes
        .flatMap((route) => {
          if (route.children) {
            return route.children;
          }
          return route as SingleRoute;
        })
        .filter((r) => !r.hidden)
    );
  }, [user]);

  if (!user) {
    return null;
  }

  const handleConfirmLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setShowLogoutConfirm(false);
        navigate("/login");
      },
    });
  };

  return (
    <>
      <LogoutConfirmationModal
        isOpen={showLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
        onConfirm={handleConfirmLogout}
      />

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

        <NavigationMenu routes={routes} onLinkClick={onToggle} />

        <UserProfileFooter
          user={user}
          onLogoutRequest={() => setShowLogoutConfirm(true)}
          onSettingsClick={() => console.log("Settings clicked")}
        />
      </aside>
    </>
  );
};

export default Sidebar;
