import { LogOut } from "lucide-react";

interface Props {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmationModal = ({
  isOpen,
  onCancel,
  onConfirm,
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 transform transition-all scale-100 border border-slate-100">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
            <LogOut size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Log out</h3>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            Are you sure you want to end your current session? You will need to
            log in again to access it.
          </p>
        </div>
        <div className="flex gap-3 mt-8">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 shadow-lg shadow-red-500/30 transition-all active:scale-95"
          >
            Yes, log out
          </button>
        </div>
      </div>
    </div>
  );
};
