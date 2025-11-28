import InternalRouteProvider from "@lib/providers/internal-route-provider";
import Header from "../header";
import type { PropsWithChildren } from "react";
import Sidebar from "../side-bar";
import { useAuthenticatedAccount } from "@lib/hooks/auth/use-get-authenticated-account";

interface Props extends PropsWithChildren {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Scaffold = ({
  isSidebarOpen,
  onToggleSidebar,
  children,
}: Props) => {
  const { user } = useAuthenticatedAccount();

  return (
    <InternalRouteProvider>
      <div className="w-screen flex h-screen bg-slate-50 font-sans text-slate-900">
        <Sidebar
          user={user}
          isOpen={isSidebarOpen}
          onToggle={onToggleSidebar}
        />

        <div className="flex flex-col flex-1 overflow-hidden">
          {user && <Header onMenuClick={onToggleSidebar} />}
          <main className="w-full flex-1 overflow-y-auto py-8 px-8">
            {children}
          </main>
        </div>
      </div>
    </InternalRouteProvider>
  );
};
