import { useState } from "react";
import RequestsList from "../../components/admin/RequestsList";
import { ProofImageModal } from "../../components/admin/ProofImageModal";

function RequestsComponent() {
  const [activeTab, setActiveTab] = useState("pending");
  const [isProofModalOpen, setisProofModalOpen] = useState(false);
  const [selectedProofImage, setSelectedProofImage] = useState(null);
  return (
    <>
      <ProofImageModal
        imageUrl={selectedProofImage}
        isOpen={isProofModalOpen}
        onClose={() => {
          setisProofModalOpen(false);
          setSelectedProofImage(null);
        }}
      />
      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Manage Hour Requests
        </h2>
        {/* Tabs */}
        <div className="border-b border-slate-200">
          <nav
            className="-mb-px flex space-x-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            aria-label="Tabs"
          >
            <button
              onClick={() => setActiveTab("pending")}
              className={`${
                activeTab === "pending"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
            >
              Pending Requests
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`${
                activeTab === "approved"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
            >
              Approved History
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={`${
                activeTab === "rejected"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
            >
              Rejected Requests
            </button>
          </nav>
        </div>
        {/* Content based on tab */}
        <div className="mt-6">
          <RequestsList
            status={activeTab}
            setSelectedProofImage={setSelectedProofImage}
            setisProofModalOpen={setisProofModalOpen}
          />
        </div>
      </div>
    </>
  );
}

export default RequestsComponent;
