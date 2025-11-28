import { useState } from "react";
import {
  Clock,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin } from "../../../../lib/hooks/auth/use-login";

const LoginScreen = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { login, isPending, isError, errorMessage } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(
      { email, password },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({
            queryKey: ["authenticated-account"],
          });
          navigate("/");
        },
      }
    );
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 shadow-inner">
              <Clock size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Bem-vindo de volta!
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Acesse sua conta para gerenciar suas horas
            </p>
          </div>

          {isError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-600 animate-in slide-in-from-top-2">
              <AlertCircle size={20} className="shrink-0" />
              <span className="text-sm font-medium">
                {errorMessage || "Falha ao entrar. Verifique suas credenciais."}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  disabled={isPending}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all disabled:opacity-60 disabled:bg-slate-50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  Senha
                </label>
                <a
                  href="#"
                  className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                >
                  Esqueceu?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={isPending}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all disabled:opacity-60 disabled:bg-slate-50"
                />
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2 active:scale-[0.98]"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Entrando...
                </>
              ) : (
                <>
                  Acessar Plataforma <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

LoginScreen.route = "/login";

export default LoginScreen;
