import React, { useState } from "react";
import { Users, BookOpen, CheckCircle, Clock, AlertCircle, FileText, Edit2, Trash2 } from "lucide-react";

interface StudentRecord {
  id: number;
  studentId: string;
  fullName: string;
  email: string;
  enrollmentStatus: "enrolled" | "pending" | "not-enrolled";
  gradeLevel: string;
  enrollmentDate: string;
  gpa?: number;
}

const RegistrarDashboard: React.FC = () => {
  const [students, setStudents] = useState<StudentRecord[]>([
    {
      id: 1,
      studentId: "STU001",
      fullName: "John Smith",
      email: "john.smith@student.semis.edu",
      enrollmentStatus: "enrolled",
      gradeLevel: "Grade 10",
      enrollmentDate: "2024-09-01",
      gpa: 3.7,
    },
    {
      id: 2,
      studentId: "STU002",
      fullName: "Emma Johnson",
      email: "emma.johnson@student.semis.edu",
      enrollmentStatus: "enrolled",
      gradeLevel: "Grade 11",
      enrollmentDate: "2024-09-05",
      gpa: 3.9,
    },
    {
      id: 3,
      studentId: "STU003",
      fullName: "Michael Brown",
      email: "michael.brown@student.semis.edu",
      enrollmentStatus: "pending",
      gradeLevel: "Grade 10",
      enrollmentDate: "2024-12-15",
    },
    {
      id: 4,
      studentId: "STU004",
      fullName: "Sarah Davis",
      email: "sarah.davis@student.semis.edu",
      enrollmentStatus: "pending",
      gradeLevel: "Grade 12",
      enrollmentDate: "2024-12-18",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "enrolled" | "pending">("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTab === "enrolled") return matchesSearch && student.enrollmentStatus === "enrolled";
    if (selectedTab === "pending") return matchesSearch && student.enrollmentStatus === "pending";
    return matchesSearch;
  });

  const stats = {
    total: students.length,
    enrolled: students.filter((s) => s.enrollmentStatus === "enrolled").length,
    pending: students.filter((s) => s.enrollmentStatus === "pending").length,
  };

  const handleApprove = (studentId: number) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, enrollmentStatus: "enrolled" as const } : s
      )
    );
    setShowModal(false);
  };

  const handleReject = (studentId: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
    setShowModal(false);
  };

  const handleEdit = (student: StudentRecord) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "enrolled":
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Enrolled</span>;
      case "pending":
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">Pending</span>;
      default:
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">Not Enrolled</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Records Management</h2>
          <p className="text-sm text-gray-600">View and manage student enrollment records</p>
        </div>
        <div className="text-sm text-gray-600">Registrar</div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Total Students</div>
              <div className="mt-2 text-3xl font-bold text-gray-800">{stats.total}</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Enrolled</div>
              <div className="mt-2 text-3xl font-bold text-green-600">{stats.enrolled}</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Pending Approval</div>
              <div className="mt-2 text-3xl font-bold text-yellow-600">{stats.pending}</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
        {/* Tabs and Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTab("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTab === "all"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Students
              </button>
              <button
                onClick={() => setSelectedTab("enrolled")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTab === "enrolled"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Enrolled
              </button>
              <button
                onClick={() => setSelectedTab("pending")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTab === "pending"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Pending
              </button>
            </div>

            {/* Search */}
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Full Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Grade Level</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Enrollment Date</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{student.studentId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{student.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{student.gradeLevel}</td>
                  <td className="px-6 py-4">{getStatusBadge(student.enrollmentStatus)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.enrollmentDate}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleReject(student.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="p-8 text-center">
            <AlertCircle size={40} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 font-medium">No students found</p>
            <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Quick Actions Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText size={18} />
            Recent Activity
          </h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">2 pending approvals</span> awaiting decision
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">5 students</span> currently enrolled
            </p>
            <p className="text-sm text-gray-600">
              Last update: <span className="font-semibold text-gray-800">Today at 2:30 PM</span>
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <AlertCircle size={18} />
            Quick Tasks
          </h4>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-semibold">
              ✓ Approve Pending Students
            </button>
            <button className="w-full text-left px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-semibold">
              + Generate Transcripts
            </button>
            <button className="w-full text-left px-3 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition text-sm font-semibold">
              📊 Export Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarDashboard;
