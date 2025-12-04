"use client";
import { TOTAL_WORK_HOURS } from "@/lib/constants";
import { CheckCircleIcon, ClockIcon } from "lucide-react";

type Props = {
  totalHours: number;
  remainingHours: number;
  progressPercentage: number;
};

export default function HoursSummary({
  totalHours,
  remainingHours,
  progressPercentage,
}: Props) {
  return (
    <div className="bg-white p-6 rounded-xl mb-8 border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <ClockIcon size={20} />
          </div>
          <span>Progress Overview</span>
        </h3>
        {remainingHours <= 0 && (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide rounded-full flex items-center gap-1">
            <CheckCircleIcon size={14} /> Target Met
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Progress Bar Column */}
        <div className="md:col-span-1">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-slate-600">Completion</span>
            <span className="font-bold text-indigo-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Stats Columns */}
        <div className="md:col-span-2 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm text-slate-500 font-medium mb-1">
              Total Approved
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-800">
                {totalHours}
              </span>
              <span className="text-sm text-slate-400 font-medium">
                / {TOTAL_WORK_HOURS} hrs
              </span>
            </div>
          </div>

          <div className="flex-1 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-sm text-slate-500 font-medium mb-1">Remaining</p>
            <div className="flex items-baseline gap-2">
              <span
                className={`text-3xl font-bold ${
                  remainingHours > 0 ? "text-amber-600" : "text-green-600"
                }`}
              >
                {Math.max(0, remainingHours)}
              </span>
              <span className="text-sm text-slate-400 font-medium">
                hrs to go
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
