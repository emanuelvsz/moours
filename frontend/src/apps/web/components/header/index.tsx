import { Menu } from "lucide-react";

const Header: React.FC<{ activeTab: string; onMenuClick: () => void }> = ({
  activeTab,
  onMenuClick,
}) => {
  const titles: Record<string, string> = {
    DASHBOARD: "Visão Geral",
    LOGS: "Minhas Horas",
    PROJECTS: "Gestão de Projetos",
    PROFILE: "Meu Perfil",
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 transition-all">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight animate-in fade-in">
          {titles[activeTab] || "Moours"}
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          v1.0.0
        </span>
      </div>
    </header>
  );
};

export default Header;
