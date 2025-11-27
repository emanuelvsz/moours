import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { UserProfile } from "./core/domain/user-profile";
import type { WorkSession } from "./core/domain/work-session";
import { MOCK_FREELANCER } from "./infra/in-memory";

import Sidebar from "./apps/web/components/side-bar";
import Header from "./apps/web/components/header";
import ViewController from "./apps/web/components/view-controller";

export type NewSessionValues = Omit<WorkSession, "id" | "calculatedAmount">;

const queryClient = new QueryClient();

export default function App() {
  const [activeView, setActiveTab] = useState("DASHBOARD");
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_FREELANCER);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-slate-50 font-sans antialiased text-slate-900">
        <Sidebar
          activeTab={activeView}
          onActiveTab={setActiveTab}
          user={currentUser}
          onUserChange={setCurrentUser}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header
            activeTab={activeView}
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <main className="flex-1 overflow-y-auto">
            <ViewController activeView={activeView} user={currentUser} />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
