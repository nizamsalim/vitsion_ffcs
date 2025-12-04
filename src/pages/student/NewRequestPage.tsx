import {
  AlertType,
  useAlert,
  type AlertContextType,
} from "@/context/AlertContext";
import { useAuth, type AuthContextType } from "@/context/AuthContext";
import { useLoader, type LoaderContextType } from "@/context/LoaderContext";
import { WORK_TYPES } from "@/lib/constants";
import type { HourRequestInput } from "@/lib/types";
import { RequestsService } from "@/services/requests";
import { ArrowLeftIcon, UploadIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewRequestForm = () => {
  const { user } = useAuth() as AuthContextType;
  const { showAlert } = useAlert() as AlertContextType;
  const { setLoading } = useLoader() as LoaderContextType;
  const [workName, setWorkName] = useState("");
  const [workSlab, setWorkSlab] = useState("");
  const [workType, setWorkType] = useState("");
  const [description, setDescription] = useState("");
  const [currentWorkTypes, setCurrentWorkTypes] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!workSlab) return;
    setCurrentWorkTypes(WORK_TYPES[workSlab]);
  }, [workSlab]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true, "Submitting request");
    event.preventDefault();
    let file = null;
    if (fileInputRef.current && fileInputRef.current.files?.length) {
      file = fileInputRef.current.files[0];
    }

    const formData: HourRequestInput = {
      workName,
      workSlab,
      workType,
      description,
      date,
      hours: Number(hours),
      file,
    };
    console.log("Submitting new request:", formData);
    try {
      await RequestsService.submitNewRequest(formData, user!);

      showAlert("Request submitted successfully", AlertType.SUCCESS);
      setWorkName("");
      setWorkType("");
      setWorkSlab("");
      setDescription("");
      setDate("");
      setHours("");
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      showAlert(error as string);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-md border border-slate-200">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors mb-4 sm:mb-6"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Work History
        </button>

        <h2 className="text-xl font-bold text-slate-800 mb-4 sm:mb-6">
          Submit New Hour Request
        </h2>

        <form className="space-y-4 sm:space-y-6">
          {/* Work Name */}
          <div>
            <label
              htmlFor="workName"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Work Name
            </label>
            <input
              type="text"
              id="workName"
              value={workName}
              onChange={(e) => setWorkName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Work Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="workSlab"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Work slab
              </label>
              <select
                id="workSlab"
                value={workSlab}
                onChange={(e) => setWorkSlab(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                required
              >
                <option value="" disabled>
                  Select a slab
                </option>
                {Object.keys(WORK_TYPES).map((type, index) => {
                  return (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label
                htmlFor="workType"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Type of Work
              </label>
              <select
                id="workType"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white"
                required
              >
                <option value="" disabled>
                  Select a type
                </option>
                {currentWorkTypes.map((type, ind) => (
                  <option key={ind} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Date and Hours (Side-by-side) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Date of Work
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="hours"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Hours Claimed
              </label>
              <input
                type="number"
                id="hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min="1"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g., 8"
                required
              />
            </div>
          </div>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Proof of Work (Geotag photo)
            </label>
            <div className="mt-1 flex justify-center p-4 sm:p-6 border-2 border-slate-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
                <div className="flex flex-col sm:flex-row text-sm text-slate-600 items-center justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-0 sm:pl-1 mt-1 sm:mt-0">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500">
                  {fileName
                    ? `Selected: ${fileName}`
                    : "PNG, JPG, GIF up to 10MB"}
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row sm:justify-end">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
              onClick={handleSubmit}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRequestForm;
