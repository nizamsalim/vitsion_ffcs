import { useAlert, type AlertContextType } from "@/context/AlertContext";
import { useLoader, type LoaderContextType } from "@/context/LoaderContext";
import { AuthService } from "@/services/auth";
import { FilmIcon, LockIcon, LogInIcon, UserIcon } from "lucide-react";
import { useState } from "react";

const LoginPage = () => {
  //   const { setLoading } = useLoader() as LoaderContextType;
  //   const { data: session, status } = useSession();
  //   const router = useRouter();

  //   useEffect(() => {
  //     if (status === "authenticated" && session?.user?.role) {
  //       router.replace(`/${session.user.role}`);
  //     }
  //   }, [status, session, router]);

  const { setLoading } = useLoader() as LoaderContextType;
  const { showAlert } = useAlert() as AlertContextType;

  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true, "Logging in");
    try {
      await AuthService.login(registrationNumber, password);
    } catch (error) {
      showAlert(error as string);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-[length:20px_20px]"></div>

      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 relative z-10 mx-4">
        {/* Branding Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-xl shadow-lg shadow-indigo-500/30 mb-4">
            <FilmIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Welcome back
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Sign in to{" "}
            <span className="font-semibold text-indigo-600">VITSION FFCS</span>
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="registrationNumber"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              VIT Mail ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                id="registrationNumber"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="john.doe2024@vitstudent.ac.in"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-700 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 placeholder:text-slate-400"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 shadow-md hover:shadow-lg shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <>
                <LogInIcon className="w-5 h-5" />
                <span>Sign In</span>
              </>
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-slate-400 mt-8">
          © {new Date().getFullYear()} VITSION Club. Internal Access Only.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
