import { useState, useRef } from "react";
import {
  X,
  Upload,
  FileSpreadsheet,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Project } from "@core/domain/project";
import { WorkSession } from "@core/domain/work-session";
import { parseWorkSessionCSV } from "@core/utils/csv-parser";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  userId: string;
  onConfirm: (sessions: WorkSession[]) => void;
  isPending: boolean;
}

export const ImportSessionsModal = ({
  isOpen,
  onClose,
  projects,
  userId,
  onConfirm,
  isPending,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<WorkSession[]>([]);
  const [isParsing, setIsParsing] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsParsing(true);
    setPreviewData([]);

    const project = projects.find((p) => p.id === projectId);
    if (project) {
      try {
        const sessions = await parseWorkSessionCSV(
          selectedFile,
          project.id,
          userId,
          project.hourlyRate
        );
        setPreviewData(sessions);
      } catch (error) {
        console.error("Error parsing CSV", error);
      }
    }
    setIsParsing(false);
  };

  const handleConfirm = () => {
    onConfirm(previewData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <FileSpreadsheet size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">
                Import from CSV
              </h3>
              <p className="text-sm text-slate-500">Bulk upload your hours</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Select Project to Assign
            </label>
            <select
              value={projectId}
              onChange={(e) => {
                setProjectId(e.target.value);
                setFile(null); 
                setPreviewData([]);
              }}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-white"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.clientName})
                </option>
              ))}
            </select>
          </div>
          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                <Upload size={28} />
              </div>
              <p className="font-bold text-slate-700">Click to upload CSV</p>
              <p className="text-sm text-slate-400 mt-1">
                Format: Date, Duration, Description
              </p>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet size={20} className="text-emerald-600" />
                  <span className="font-medium text-slate-700">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setFile(null);
                    setPreviewData([]);
                  }}
                  className="text-xs text-red-500 hover:underline"
                >
                  Change file
                </button>
              </div>

              <div className="max-h-60 overflow-y-auto bg-white">
                {isParsing ? (
                  <div className="p-8 flex items-center justify-center gap-2 text-slate-500">
                    <Loader2 className="animate-spin" /> Parsing file...
                  </div>
                ) : previewData.length === 0 ? (
                  <div className="p-8 flex items-center justify-center gap-2 text-amber-500 bg-amber-50">
                    <AlertCircle size={20} /> No valid sessions found in CSV.
                  </div>
                ) : (
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Hours</th>
                        <th className="px-4 py-3">Value</th>
                        <th className="px-4 py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {previewData.map((session, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-medium text-slate-700 whitespace-nowrap">
                            {session.date}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {session.startTime} - {session.endTime}
                          </td>
                          <td className="px-4 py-3 text-emerald-600 font-medium">
                            €{session.calculatedAmount.toFixed(2)}
                          </td>
                          <td
                            className="px-4 py-3 text-slate-500 truncate max-w-[200px]"
                            title={session.description}
                          >
                            {session.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 text-right">
                Found {previewData.length} valid entries
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 flex gap-3 bg-white">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={previewData.length === 0 || isPending}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Importing...
              </>
            ) : (
              <>
                <CheckCircle2 size={18} /> Confirm Import
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
