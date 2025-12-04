import { type Student } from "@/lib/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentsTable({ students }: { students: Partial<Student>[] }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(students);

  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(students);
      return;
    }

    const lower = query.toLowerCase();
    const result = students.filter(
      (s) =>
        s.name!.toLowerCase().includes(lower) ||
        s.registrationNumber!.toLowerCase().includes(lower)
    );

    setFiltered(result);
  }, [query, students]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-4">
        Student Contributions
      </h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by student name or ID..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="w-full max-w-sm px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
              >
                Student Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
              >
                Student ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
              >
                Total Approved Hours
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filtered.map((student) => (
              <tr
                key={student.registrationNumber}
                onClick={() => {
                  navigate(`/dashboard/student/${student.registrationNumber}`);
                }}
                className="hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {student.registrationNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-bold">
                  {student.hours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsTable;
