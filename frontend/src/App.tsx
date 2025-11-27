import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Scaffold } from "./apps/web/components/scaffold";
import { createMockedFreelancerUserProfile } from "./infra/in-memory/user-profile/data";
import { RouterSwitch } from "./apps/web/components/router-switch";

const queryClient = new QueryClient();

export default function App() {
  const [currentUser] = useState(createMockedFreelancerUserProfile());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Scaffold
          user={currentUser}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <RouterSwitch />
        </Scaffold>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
