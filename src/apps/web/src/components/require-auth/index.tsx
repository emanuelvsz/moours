import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuthenticatedAccount } from "@lib/hooks/auth/use-get-authenticated-account";
import type { JSX } from "react";

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading } = useAuthenticatedAccount();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
