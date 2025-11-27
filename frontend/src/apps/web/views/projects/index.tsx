import type { Project } from "../../../../core/domain/project";
import Badge from "../../components/badge";

const ProjectsView: React.FC<{
  projects: Project[];
  finding: boolean;
}> = ({ projects, finding }) => {
  if (finding) {
    return (
      <div className="p-8 flex justify-center items-center text-slate-500">
        <span className="animate-pulse">Carregando projetos...</span>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800">Meus Projetos</h2>
        <p className="text-slate-500 mb-6">
          Projetos que você gerencia ou participa.
        </p>

        {!projects || projects.length === 0 ? (
          <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-lg">
            <p className="text-slate-400">Nenhum projeto encontrado.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="p-5 border border-slate-200 rounded-xl hover:border-emerald-300 transition-colors bg-slate-50 group"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {p.name}
                  </h3>
                  <Badge color="purple">
                    {p.hourlyRate} {p.currency}/h
                  </Badge>
                </div>
                <p className="text-sm text-slate-500">
                  Cliente: <span className="font-medium">{p.clientName}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsView;
