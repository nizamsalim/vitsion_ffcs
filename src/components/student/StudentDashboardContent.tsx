"use client";
import { type HourRequest } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import HoursSummary from "@/components/student/HoursSummaryComponent";
import WorkHistoryTable from "@/components/student/WorkHistoryTable";
import { useAuth, type AuthContextType } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {
  totalHours: number;
  remainingHours: number;
  progressPercentage: number;
  hourRequests: HourRequest[];
};

export default function StudentDashboardContent({
  totalHours,
  remainingHours,
  progressPercentage,
  hourRequests,
}: Props) {
  // Mock Session for Preview
  const navigate = useNavigate();

  const { user } = useAuth() as AuthContextType;

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w mx-auto space-y-6">
        {/* Header Section */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Welcome back,{" "}
              <span className="text-indigo-600">{user!.name}</span>
            </h2>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-mono text-slate-600 border border-slate-200">
                STUDENT
              </span>
              <span className="text-sm">ID: {user!.registrationNumber}</span>
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <HoursSummary
          totalHours={totalHours}
          remainingHours={remainingHours}
          progressPercentage={progressPercentage}
        />

        {/* Work History Section */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-800">Work History</h3>
              <p className="text-slate-500 text-sm mt-1">
                Track the status of your submissions
              </p>
            </div>

            <button
              onClick={() => navigate("/dashboard/request")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-95"
            >
              <PlusIcon className="w-5 h-5" />
              <span>New Request</span>
            </button>
          </div>

          <WorkHistoryTable data={hourRequests} />
        </div>
      </div>
    </div>
  );
}
