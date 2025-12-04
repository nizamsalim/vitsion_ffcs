import { StaticLoader } from "@/components/common/Loader";
import WorkHistoryTable from "@/components/student/WorkHistoryTable";
import { useError, type ErrorContextType } from "@/context/ErrorContext";
import type { HourRequest, Student } from "@/lib/types";
import { RequestsService } from "@/services/requests";
import { StudentsService } from "@/services/students";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

function StudentViewPage() {
  const { id } = useParams();
  const { error, setError } = useError() as ErrorContextType;
  const [student, setStudent] = useState<Student | undefined>();
  const [hourRequests, setHourRequests] = useState<HourRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading(true);

    StudentsService.getStudentByRegistrationNumber(id as string)
      .then(setStudent)
      .catch(setError);

    RequestsService.getHourRequestsByRegistrationNumber(id as string)
      .then(setHourRequests)
      .catch(setError);

    setLoading(false);
  }, []);

  if (error) return <Navigate to={"/error"} replace />;
  if (loading || student == null) return <StaticLoader isVisible />;

  // if (!loading && student == null) {
  //   return (
  //     <div className="text-center p-5 text-gray-900 font-semibold bg-white rounded-xl shadow-inner">
  //       Invalid registration number
  //     </div>
  //   );
  // }

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-800">{student!.name}</h2>
          <p className="text-slate-500">
            Registration No: {student!.registrationNumber}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Contact Information
            </h3>
            <div className="mt-2 space-y-2 text-slate-700">
              <p>
                <strong>Email:</strong> {student!.email}
              </p>
              <p>
                <strong>Phone:</strong> {student!.mobile}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Club Contribution
            </h3>
            <div className="mt-2 text-slate-700">
              <p>
                <strong>Total Approved Hours:</strong>{" "}
                <span className="text-2xl font-bold text-indigo-600">
                  {student!.hours}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
            Work History
          </h3>

          <div className="space-y-4">
            {hourRequests && hourRequests.length > 0 ? (
              <WorkHistoryTable data={hourRequests} />
            ) : (
              <p className="text-slate-500 text-sm text-center py-4">
                No work history found for this student!.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentViewPage;
