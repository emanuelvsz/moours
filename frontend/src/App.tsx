import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./apps/web/components/side-bar";
import Header from "./apps/web/components/header";
import ViewController from "./apps/web/components/view-controller";
import { createMockedFreelancerUserProfile } from "./infra/in-memory/user-profile/data";
import { LoginScreen } from "./apps/web/screens/login";

const queryClient = new QueryClient();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState("DASHBOARD");
  const [currentUser, setCurrentUser] = useState(
    createMockedFreelancerUserProfile()
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <LoginScreen onLogin={() => setIsAuthenticated(true)} />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen bg-slate-50 font-sans antialiased text-slate-900">
        <Sidebar
          activeTab={activeView}
          onActiveTab={setActiveView}
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
