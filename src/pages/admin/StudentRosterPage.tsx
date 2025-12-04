import { ConfirmationModal } from "@/components/admin/ConfirmationModal";
import { UploadIcon } from "lucide-react";
import React, { useRef, useState, useTransition } from "react";

function StudentsRosterPage() {
  const [uploadYear, setUploadYear] = useState<number>(
    new Date().getFullYear() - 1
  );
  const [uploaderName, setUploaderName] = useState<string>("Nizam");

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isPending, _] = useTransition();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File = event.target.files![0];

    if (file) {
      // upload roster
      console.log("flag");

      //   startTransition(async () => {
      //     await uploadStudentsRoster(
      //       uploaderName as string,
      //       uploadYear as number,
      //       await file.arrayBuffer()
      //     );
      //     alert("Student data uploaded successfully");
      //   });

      // generate report and delete old data
    }
  };

  const handleConfirmUpload = () => {
    // NOTE: Replace 'admin123' with your actual password validation logic
    if (confirmPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsConfirmModalOpen(false);
      setConfirmPassword("");
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      // In a real app, you'd show an error message in the UI
      alert("Incorrect password. Please try again.");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-4">
          Upload Student Roster
        </h2>
        <p className="text-slate-600 mb-6">
          Upload an CSV file containing the list of students in the club. This
          will populate the student database.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label
              htmlFor="uploaderName"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Uploader Name
            </label>
            <input
              type="text"
              id="uploaderName"
              value={uploaderName}
              onChange={(e) => setUploaderName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              htmlFor="uploadYear"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Year
            </label>
            <input
              type="number"
              id="uploadYear"
              value={uploadYear}
              onChange={(e) =>
                setUploadYear(e.target.value as unknown as number)
              }
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              //   placeholder="e.g., 2024"
            />
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".csv"
        />
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={() => setIsConfirmModalOpen(true)}
            className={`flex items-center justify-center gap-3 px-6 py-3 text-white font-semibold rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              uploaderName === "" || !uploadYear || isPending
                ? "bg-slate-600 hover:bg-slate-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={uploaderName === "" || !uploadYear || isPending}
          >
            {isPending ? (
              "Uploading"
            ) : (
              <>
                <UploadIcon className="w-6 h-6" />
                "Upload Excel File"
              </>
            )}
          </button>
          {/* <button
            onClick={handleViewHistory}
            className="flex items-center justify-center gap-3 px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200"
          >
            <EyeIcon className="w-6 h-6" />
            View History
          </button> */}
        </div>
      </div>
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setConfirmPassword("");
        }}
        onConfirm={handleConfirmUpload}
        password={confirmPassword}
        setPassword={setConfirmPassword}
      />
    </>
  );
}

export default StudentsRosterPage;
