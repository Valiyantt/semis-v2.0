import React, { useState } from "react";
import { CheckCircle, XCircle, Clock, Search, FileText, Mail } from "lucide-react";

interface EnrollmentRequest {
  id: number;
  studentId: string;
  studentName: string;
  email: string;
  gradeLevel: string;
  parentName: string;
  parentEmail: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  documents: string[];
}

const RegistrarEnrollments: React.FC = () => {
  const [enrollments, setEnrollments] = useState<EnrollmentRequest[]>([
    {
      id: 1,
      studentId: "STU-2024-001",
      studentName: "Michael Brown",
      email: "michael.brown@student.semis.edu",
      gradeLevel: "Grade 10",
      parentName: "Robert Brown",
      parentEmail: "robert.brown@semis.edu",
      requestDate: "2024-12-15",
      status: "pending",
      documents: ["Birth Certificate", "Report Card", "Transfer Form"],
    },
    {
      id: 2,
      studentId: "STU-2024-002",
      studentName: "Sarah Davis",
      email: "sarah.davis@student.semis.edu",
      gradeLevel: "Grade 12",
      parentName: "Jennifer Davis",
      parentEmail: "jennifer.davis@semis.edu",
      requestDate: "2024-12-18",
      status: "pending",
      documents: ["Birth Certificate", "Report Card"],
    },
    {
      id: 3,
      studentId: "STU-2024-003",
      studentName: "David Wilson",
      email: "david.wilson@student.semis.edu",
      gradeLevel: "Grade 11",
      parentName: "James Wilson",
      parentEmail: "james.wilson@semis.edu",
      requestDate: "2024-12-10",
      status: "approved",
      documents: ["Birth Certificate", "Report Card", "Health Certificate"],
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentRequest | null>(null);

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch =
      enrollment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.studentId.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTab === "pending") return matchesSearch && enrollment.status === "pending";
    if (selectedTab === "approved") return matchesSearch && enrollment.status === "approved";
    if (selectedTab === "rejected") return matchesSearch && enrollment.status === "rejected";
    return matchesSearch;
  });

  const stats = {
    pending: enrollments.filter((e) => e.status === "pending").length,
    approved: enrollments.filter((e) => e.status === "approved").length,
    rejected: enrollments.filter((e) => e.status === "rejected").length,
  };

  const handleApprove = (enrollmentId: number) => {
    setEnrollments((prev) =>
      prev.map((e) => (e.id === enrollmentId ? { ...e, status: "approved" as const } : e))
    );
    setShowModal(false);
  };

  const handleReject = (enrollmentId: number) => {
    setEnrollments((prev) =>
      prev.map((e) => (e.id === enrollmentId ? { ...e, status: "rejected" as const } : e))
    );
    setShowModal(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full flex items-center gap-1"><Clock size={12} /> Pending</span>;
      case "approved":
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full flex items-center gap-1"><CheckCircle size={12} /> Approved</span>;
      case "rejected":
        return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full flex items-center gap-1"><XCircle size={12} /> Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Enrollment Requests</h2>
        <p className="text-sm text-gray-600">Review and process student enrollment applications</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Pending</div>
              <div className="mt-2 text-3xl font-bold text-yellow-600">{stats.pending}</div>
            </div>
            <Clock size={24} className="text-yellow-600" />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Approved</div>
              <div className="mt-2 text-3xl font-bold text-green-600">{stats.approved}</div>
            </div>
            <CheckCircle size={24} className="text-green-600" />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Rejected</div>
              <div className="mt-2 text-3xl font-bold text-red-600">{stats.rejected}</div>
            </div>
            <XCircle size={24} className="text-red-600" />
          </div>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
        {/* Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTab("all")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTab === "all"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedTab("pending")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTab === "pending"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setSelectedTab("approved")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTab === "approved"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Approved ({stats.approved})
              </button>
            </div>

            <div className="w-full sm:w-64 relative">
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search student..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Student ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Grade Level</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Request Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEnrollments.map((enrollment) => (
                <tr key={enrollment.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{enrollment.studentId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{enrollment.studentName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{enrollment.gradeLevel}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{enrollment.requestDate}</td>
                  <td className="px-6 py-4">{getStatusBadge(enrollment.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedEnrollment(enrollment);
                        setShowModal(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#800000]">Enrollment Application</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Information */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Student Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Student ID</p>
                    <p className="font-semibold text-gray-800">{selectedEnrollment.studentId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold text-gray-800">{selectedEnrollment.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-800">{selectedEnrollment.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Grade Level</p>
                    <p className="font-semibold text-gray-800">{selectedEnrollment.gradeLevel}</p>
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Parent/Guardian Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Parent Name</p>
                    <p className="font-semibold text-gray-800">{selectedEnrollment.parentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Parent Email</p>
                    <p className="font-semibold text-gray-800">{selectedEnrollment.parentEmail}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Required Documents</h3>
                <div className="space-y-2">
                  {selectedEnrollment.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <FileText size={16} className="text-blue-600" />
                      <span className="text-sm text-gray-700">{doc}</span>
                      <CheckCircle size={16} className="text-green-600 ml-auto" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Request Date */}
              <div>
                <p className="text-sm text-gray-600">Request Date</p>
                <p className="font-semibold text-gray-800">{selectedEnrollment.requestDate}</p>
              </div>

              {/* Status */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Current Status</p>
                {getStatusBadge(selectedEnrollment.status)}
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              {selectedEnrollment.status === "pending" && (
                <>
                  <button
                    onClick={() => handleReject(selectedEnrollment.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                  >
                    <XCircle size={16} className="inline mr-2" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(selectedEnrollment.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    <CheckCircle size={16} className="inline mr-2" />
                    Approve
                  </button>
                </>
              )}
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarEnrollments;
