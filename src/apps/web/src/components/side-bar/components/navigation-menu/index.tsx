import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { ElementType } from "react";
import type { SingleRoute } from "@lib/types/route";

interface Props {
  routes: SingleRoute[];
  onLinkClick: () => void;
}

export const NavigationMenu = ({ routes, onLinkClick }: Props) => {
  const location = useLocation();

  return (
    <nav className="flex-1 p-6 space-y-3">
      {routes.map((route) => {
        const isActive =
          location.pathname === route.path ||
          location.pathname.startsWith(`${route.path}/`);

        const Icon = route.icon as ElementType | undefined;

        return (
          <Link
            key={route.key || route.path}
            to={route.path}
            onClick={onLinkClick}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {Icon && <Icon size={20} />}

            {route.title}

            <ChevronRight
              size={16}
              className={`ml-auto transition-opacity ${
                isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
};
