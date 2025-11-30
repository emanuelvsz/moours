interface Props {}

export const ProjectsHeader = ({}: Props) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900">My Projects</h1>
      <p className="text-slate-500 text-sm">
        Select a project to manage payments and view history.
      </p>
    </div>
  );
};
