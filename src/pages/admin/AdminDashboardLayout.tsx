import { useState } from "react";
import {
  ClockIcon,
  FileIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import HourRequestsPage from "./HourRequestsPage";
import StudentsViewPage from "./StudentsViewPage";
import StudentsRosterPage from "./StudentRosterPage";
import {
  useAdminView,
  type AdminViewContextType,
} from "@/context/AdminViewContext";
import { useLoader, type LoaderContextType } from "@/context/LoaderContext";
import { AuthService } from "@/services/auth";
import { useNavigate } from "react-router-dom";

function AdminDashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { view, setView } = useAdminView() as AdminViewContextType;
  const { setLoading } = useLoader() as LoaderContextType;
  // Current last path segment (example: /admin/requests → "requests")
  // const view = location.pathname.split("/").at(-1);
  const navigate = useNavigate();

  const handleNavClick = (newView: string) => {
    setView(newView);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 bg-white/75 backdrop-blur-sm z-10 border-b border-slate-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600">VITSION FFCS</h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-1 text-slate-500 hover:text-slate-800"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </header>

      <div className="relative lg:flex">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          ></div>
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-white p-6 border-r border-slate-200 z-30 flex flex-col justify-between transform transition-transform duration-300 ease-in-out lg:sticky lg:h-screen lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-indigo-600">
                  VITSION FFCS
                </h1>
                <p className="text-sm text-slate-500 mt-1">Admin Panel</p>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1 text-slate-500 hover:text-slate-800"
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            <nav className="mt-10">
              <button
                onClick={() => handleNavClick("requests")}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  view === "requests"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <ClockIcon className="w-5 h-5" />
                Hour Requests
              </button>

              <button
                onClick={() => handleNavClick("students")}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors mt-2 ${
                  view === "students"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <UserIcon className="w-5 h-5" />
                Student View
              </button>

              <button
                onClick={() => handleNavClick("roster")}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors mt-2 ${
                  view === "roster"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <FileIcon className="w-5 h-5" />
                Student Roster
              </button>
            </nav>
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={async (e) => {
                e.preventDefault();
                // TODO: Add logout functionality
                setLoading(true, "Logging out");
                await AuthService.logout();
                navigate("/");
                setLoading(false);
              }}
              className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors bg-red-100 text-red-700 hover:bg-red-200"
            >
              <LogOutIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {view === "requests" && <HourRequestsPage />}
          {view === "students" && <StudentsViewPage />}
          {view === "roster" && <StudentsRosterPage />}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
