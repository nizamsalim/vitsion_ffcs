import {
  AlertType,
  useAlert,
  type AlertContextType,
} from "@/context/AlertContext";
import { useAuth, type AuthContextType } from "@/context/AuthContext";
import { useError, type ErrorContextType } from "@/context/ErrorContext";
import { useLoader, type LoaderContextType } from "@/context/LoaderContext";
import { type HourRequest } from "@/lib/types";
import { RequestsService } from "@/services/requests";
import { ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function RequestsList({
  // hourRequests,
  status,
  setSelectedProofImage,
  setisProofModalOpen,
}: {
  // hourRequests: HourRequest[];
  status: string;
  setSelectedProofImage: Function;
  setisProofModalOpen: Function;
}) {
  const { user } = useAuth() as AuthContextType;
  const { error, setError } = useError() as ErrorContextType;
  const { setLoading } = useLoader() as LoaderContextType;
  const { showAlert } = useAlert() as AlertContextType;
  const [requests, setRequests] = useState<HourRequest[]>([]);
  useEffect(() => {
    RequestsService.getHourRequests(user!).then(setRequests).catch(setError);
  }, []);

  if (error) return <Navigate to={"/error"} />;

  if (requests.filter((req) => req.status === status).length === 0) {
    return (
      <div className="text-center p-5 text-gray-500 bg-white rounded-xl shadow-inner">
        No requests found
      </div>
    );
  }

  const handleAction = async (requestId: string, action: string) => {
    const actionStripped = action.slice(0, 6);
    let formattedAction = actionStripped + "ing";
    formattedAction =
      formattedAction.charAt(0).toUpperCase() +
      formattedAction.slice(1) +
      " request";
    setLoading(true, formattedAction);
    try {
      const res = (await RequestsService.handleRequestAction(
        requestId,
        action
      )) as { success: boolean };
      if (res.success) {
        showAlert(
          "Request " + actionStripped + "ed",
          action === "approved" ? AlertType.SUCCESS : AlertType.DANGER
        );
        RequestsService.getHourRequests(user!)
          .then(setRequests)
          .catch(setError);
      }
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
  };

  return requests.map((request) => {
    if (request.status === status) {
      // const keyClass =
      //   request.status === "pending"
      //     ? "bg-slate-50 border-slate-200"
      //     : "bg-green-50 border-green-200";
      const keyClasses = (s: string) => {
        if (s === "pending") return "bg-slate-50 border-slate-200";
        if (s === "approved") return "bg-green-50 border-green-200";
        return "bg-red-50 border-red-200";
      };
      const hoursClass =
        request.status === "pending" ? "text-indigo-600" : "text-green-700";
      const workTypeClass =
        request.status === "pending"
          ? "bg-sky-100 text-sky-800"
          : "bg-slate-200 text-slate-800";
      return (
        <div
          key={request.id}
          className={`p-4 rounded-lg border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${keyClasses(
            request.status
          )}`}
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <p className="font-bold text-slate-800">
                {request.name} | {request.registrationNumber} -{" "}
                <span className={`${hoursClass} font-semibold`}>
                  {request.hours} hours
                </span>
              </p>
            </div>
            <p className="font-semibold mt-1">{request.date}</p>
            <div className="flex flex-row gap-1 w-auto">
              <span
                className={`px-2 py-1 ${workTypeClass} text-xs font-medium rounded-full w-fit`}
              >
                {request.workSlab}
              </span>
              <span
                className={`px-2 py-1 ${workTypeClass} text-xs font-medium rounded-full w-fit`}
              >
                {request.workType}
              </span>
            </div>
            <p className="font-semibold text-slate-700 mt-1">
              {request.workName}
            </p>
            <p className="text-sm text-slate-700 mt-1 break-words">
              {request.description}
            </p>
            <p className="text-xs text-slate-700 mt-2">
              Submitted: {request.submitted}
            </p>
            {request.approved && (
              <p className="text-xs text-slate-700 mt-2">
                Approved: {request.approved}
              </p>
            )}
            {request.rejected && (
              <p className="text-xs text-slate-700 mt-2">
                Rejected: {request.rejected}
              </p>
            )}
          </div>
          <div className="flex flex-col items-stretch sm:items-end gap-3 flex-shrink-0">
            {request.status === "pending" && (
              <button
                onClick={() => {
                  setSelectedProofImage(request.proof.url);
                  setisProofModalOpen(true);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-md hover:bg-blue-200 transition-colors"
                disabled={request.proof === null}
              >
                {request.proof === null ? (
                  "No proof attached"
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4" />
                    View Proof
                  </>
                )}
              </button>
            )}
            {request.status === "pending" ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAction(request.id, "rejected")}
                  className="flex-1 sm:flex-auto px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-md hover:bg-red-200 transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleAction(request.id, "approved")}
                  className="flex-1 sm:flex-auto px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-md hover:bg-green-200 transition-colors"
                >
                  Approve
                </button>
              </div>
            ) : request.status === "approved" ? (
              <span className="px-3 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full flex-shrink-0">
                APPROVED
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-200 text-red-800 text-xs font-bold rounded-full flex-shrink-0">
                REJECTED
              </span>
            )}
          </div>
        </div>
      );
    }
  });
}

export default RequestsList;

// const PendingRequestsList = () => (
//         <div className="space-y-4">
//             {mockPendingRequests.map(req => (
//                 <div key={req.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                     <div>
//                         <div className="flex items-center gap-3 mb-1">
//                             <p className="font-bold text-slate-800">{req.studentName} - <span className="text-indigo-600 font-semibold">{req.hours} hours</span></p>
//                             <span className="px-2 py-1 bg-sky-100 text-sky-800 text-xs font-medium rounded-full">{req.workType}</span>
//                         </div>
//                         <p className="text-sm text-slate-600 mt-1">{req.workDescription}</p>
//                         <p className="text-xs text-slate-400 mt-2">Submitted: {req.date}</p>
//                     </div>
//                     <div className="flex items-center gap-3 flex-shrink-0">
//                         <button onClick={() => handleRejectRequest(req.id)} className="px-4 py-2 bg-red-100 text-red-700 text-sm font-semibold rounded-md hover:bg-red-200 transition-colors">Reject</button>
//                         <button onClick={() => handleApproveRequest(req.id)} className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-md hover:bg-green-200 transition-colors">Approve</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );

//     const ApprovedRequestsList = () => (
//         <div className="space-y-4">
//             {mockApprovedRequests.map(req => (
//                 <div key={req.id} className="p-4 bg-green-50 rounded-lg border border-green-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                     <div>
//                         <div className="flex items-center gap-3 mb-1">
//                             <p className="font-bold text-slate-800">{req.studentName} - <span className="text-green-700 font-semibold">{req.hours} hours</span></p>
//                             <span className="px-2 py-1 bg-slate-200 text-slate-800 text-xs font-medium rounded-full">{req.workType}</span>
//                         </div>
//                         <p className="text-sm text-slate-600 mt-1">{req.workDescription}</p>
//                         <p className="text-xs text-slate-400 mt-2">Approved on: {req.date}</p>
//                     </div>
//                     <span className="px-3 py-1 bg-green-200 text-green-800 text-xs font-bold rounded-full flex-shrink-0">APPROVED</span>
//                 </div>
//             ))}
//         </div>
//     );
