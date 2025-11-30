import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Scaffold } from "./src/components/scaffold";
import { RouterSwitch } from "./src/components/router-switch";

const queryClient = new QueryClient();

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Scaffold
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <RouterSwitch />
        </Scaffold>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
