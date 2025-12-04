import { LockIcon } from "lucide-react";

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  password,
  setPassword,
}: {
  isOpen: boolean;
  onClose: Function;
  onConfirm: Function;
  password: string;
  setPassword: Function;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md animate-fade-in-up">
        <h3 className="text-lg font-bold text-slate-800">Confirm Action</h3>
        <p className="text-sm text-slate-600 mt-2">
          Uploading a new roster will{" "}
          <strong className="text-red-600">
            delete all current student data
          </strong>{" "}
          after generating a comprehensive report.
        </p>
        <p className="text-sm text-slate-600 mt-1 font-semibold">
          This action is irreversible.
        </p>

        <div className="mt-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Please enter your password to confirm.
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Password"
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <LockIcon className="w-4 h-4" />
            Confirm & Upload
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
