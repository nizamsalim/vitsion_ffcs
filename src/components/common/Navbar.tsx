import {
  AlertType,
  useAlert,
  type AlertContextType,
} from "@/context/AlertContext";
import { useAuth, type AuthContextType } from "@/context/AuthContext";
import { useLoader, type LoaderContextType } from "@/context/LoaderContext";
import { formatName } from "@/lib/formatName";
import { Role, type User } from "@/lib/types";
import { AuthService } from "@/services/auth";
import { FilmIcon, UserIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user } = useAuth() as AuthContextType;
  const { showAlert } = useAlert() as AlertContextType;
  const { setLoading } = useLoader() as LoaderContextType;

  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setLoading(true, "Please wait");
    try {
      const res = await AuthService.triggerChangePassword(
        user as Partial<User>
      );
      setLoading(false);
      showAlert(res as string, AlertType.SUCCESS, 5000);
      setTimeout(async () => {
        await AuthService.logout();
      }, 5500);
    } catch (error) {
      showAlert(error as string);
    }
  };

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <FilmIcon
                className="w-6 h-6 text-white"
                onClick={async () => console.log({ user })}
              />
            </div>
            <span className="text-xl font-bold text-slate-800">
              VITSION FFCS
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-2 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="User menu"
            >
              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                <UserIcon className="h-5 w-5 text-slate-500" />
              </div>
            </button>

            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsProfileOpen(false)}
                ></div>
                <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-100 animate-in fade-in zoom-in duration-200">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          Hello, {formatName(user.name)}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setIsProfileOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                      >
                        Dashboard
                      </button>
                      {user.role === Role.STUDENT && (
                        <button
                          onClick={handleResetPassword}
                          className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                        >
                          Change password
                        </button>
                      )}
                      <button
                        onClick={async () => {
                          await AuthService.logout();
                          setIsProfileOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate("/login");
                          setIsProfileOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                      >
                        Login
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
