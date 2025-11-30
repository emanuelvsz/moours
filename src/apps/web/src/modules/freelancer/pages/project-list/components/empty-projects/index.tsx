import { FolderOpen } from "lucide-react";

interface Props {}

export const EmptyProjects = ({}: Props) => {
  return (
    <div className="p-10 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
        <FolderOpen size={32} />
      </div>
      <p className="text-slate-500 font-medium">No projects assigned yet.</p>
    </div>
  );
};
