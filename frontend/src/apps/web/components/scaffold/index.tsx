import InternalRouteProvider from "../../lib/providers/internal-route-provider";
import Header from "../header";
import type { UserProfile } from "../../../../core/domain/user-profile";
import type { PropsWithChildren } from "react";
import Sidebar from "../side-bar";

interface Props extends PropsWithChildren {
  user: UserProfile;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Scaffold = ({
  user,
  isSidebarOpen,
  onToggleSidebar,
  children,
}: Props) => {
  return (
    <InternalRouteProvider>
      <div className="w-screen flex h-screen bg-slate-50 font-sans text-slate-900">
        <Sidebar
          user={user}
          isOpen={isSidebarOpen}
          onToggle={onToggleSidebar}
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header onMenuClick={onToggleSidebar} />
          <main className="w-full flex-1 overflow-y-auto py-8 px-8">
            {children}
          </main>
        </div>
      </div>
    </InternalRouteProvider>
  );
};
