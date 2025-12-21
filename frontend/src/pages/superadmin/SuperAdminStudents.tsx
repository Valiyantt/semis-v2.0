import React, { useState, useEffect } from "react";
import { CheckCircle2, Clock, XCircle, Eye, Download, Filter } from "lucide-react";
import { studentManagementService, Student } from "../../services/studentManagementService";

const SuperAdminStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "enrolled" | "pending">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, [activeTab]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data: Student[];
      if (activeTab === "enrolled") {
        data = await studentManagementService.getEnrolledStudents();
      } else if (activeTab === "pending") {
        data = await studentManagementService.getPendingStudents();
      } else {
        data = await studentManagementService.getAllStudents();
      }
      
      setStudents(data);
    } catch (err) {
      setError("Failed to load students");
      console.error(err);
      // Use mock data for demo
      setMockStudents();
    } finally {
      setLoading(false);
    }
  };

  const setMockStudents = () => {
    const mockData: Student[] = [
      {
        id: 1,
        username: "student01",
        fullName: "John Smith",
        email: "john.smith@student.semis.edu",
        dateOfBirth: "2006-03-15",
        gender: "Male",
        contactNumber: "+1-555-0101",
        enrollmentStatus: "enrolled",
        currentGradeLevel: "Grade 10",
        enrollmentDate: "2024-09-01",
        isActive: true,
      },
      {
        id: 2,
        username: "student02",
        fullName: "Emma Johnson",
        email: "emma.johnson@student.semis.edu",
        dateOfBirth: "2006-07-22",
        gender: "Female",
        contactNumber: "+1-555-0102",
        enrollmentStatus: "enrolled",
        currentGradeLevel: "Grade 10",
        enrollmentDate: "2024-09-01",
        isActive: true,
      },
      {
        id: 3,
        username: "student03",
        fullName: "Michael Brown",
        email: "michael.brown@student.semis.edu",
        dateOfBirth: "2005-11-08",
        gender: "Male",
        contactNumber: "+1-555-0103",
        enrollmentStatus: "pending",
        currentGradeLevel: "Grade 11",
        enrollmentDate: "2024-10-15",
        isActive: true,
      },
      {
        id: 4,
        username: "student04",
        fullName: "Sarah Davis",
        email: "sarah.davis@student.semis.edu",
        dateOfBirth: "2007-01-30",
        gender: "Female",
        contactNumber: "+1-555-0104",
        enrollmentStatus: "pending",
        currentGradeLevel: "Grade 9",
        enrollmentDate: "2024-10-20",
        isActive: true,
      },
      {
        id: 5,
        username: "student05",
        fullName: "David Wilson",
        email: "david.wilson@student.semis.edu",
        dateOfBirth: "2005-05-12",
        gender: "Male",
        contactNumber: "+1-555-0105",
        enrollmentStatus: "enrolled",
        currentGradeLevel: "Grade 12",
        enrollmentDate: "2024-08-15",
        isActive: true,
      },
    ];
    setStudents(mockData);
  };

  const filteredStudents = students.filter(
    (student) =>
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const enrolledCount = students.filter((s) => s.enrollmentStatus === "enrolled").length;
  const pendingCount = students.filter((s) => s.enrollmentStatus === "pending").length;
  const totalCount = students.length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "enrolled":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
            <CheckCircle2 size={14} />
            Enrolled
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
            <Clock size={14} />
            Pending
          </span>
        );
      case "not-enrolled":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
            <XCircle size={14} />
            Not Enrolled
          </span>
        );
      default:
        return null;
    }
  };

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailsModal(true);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-[#800000]">
        <div>
          <h1 className="text-3xl font-bold text-[#800000] mb-2">Student Enrollment Roster</h1>
          <p className="text-gray-600">
            View and manage student enrollment status - enrolled, pending, and applications
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#800000]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Students</p>
              <p className="text-3xl font-bold text-[#800000] mt-2">{totalCount}</p>
            </div>
            <div className="w-12 h-12 bg-[#800000]/10 rounded-full flex items-center justify-center">
              <Filter size={24} className="text-[#800000]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Enrolled</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{enrolledCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md border-b border-gray-200">
        <div className="flex">
          {[
            { id: "all", label: "All Students", count: totalCount },
            { id: "enrolled", label: "Enrolled", count: enrolledCount },
            { id: "pending", label: "Pending", count: pendingCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "all" | "enrolled" | "pending")}
              className={`flex-1 px-6 py-4 font-semibold transition relative ${
                activeTab === tab.id
                  ? "text-[#800000]"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label}
              <span className="ml-2 text-sm bg-gray-100 px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#800000]"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <input
          type="text"
          placeholder="Search by name, email, or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
        />
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
          {error} (Showing demo data)
        </div>
      )}

      {/* Student List Table */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-[#800000] rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-500 mt-4">Loading students...</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50">
            <p className="text-gray-500">No students found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Student ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Full Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Grade Level
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Enrollment Date
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono text-sm text-gray-600">
                      {student.username}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{student.fullName}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{student.email}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.currentGradeLevel || "N/A"}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(student.enrollmentStatus)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(student.enrollmentDate)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewDetails(student)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                          title="View student details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
                          title="Download student record"
                        >
                          <Download size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Details Modal */}
      {showDetailsModal && selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#800000]">{selectedStudent.fullName}</h2>
                <p className="text-sm text-gray-600">Student ID: {selectedStudent.username}</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Section */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold">Enrollment Status</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">
                      {selectedStudent.enrollmentStatus.charAt(0).toUpperCase() +
                        selectedStudent.enrollmentStatus.slice(1)}
                    </p>
                  </div>
                  {getStatusBadge(selectedStudent.enrollmentStatus)}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-800">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Number</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.contactNumber || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-semibold text-gray-800">
                      {formatDate(selectedStudent.dateOfBirth)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.gender || "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Grade Level</p>
                    <p className="font-semibold text-gray-800">
                      {selectedStudent.currentGradeLevel || "Not assigned"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Enrollment Date</p>
                    <p className="font-semibold text-gray-800">
                      {formatDate(selectedStudent.enrollmentDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Messages */}
              {selectedStudent.enrollmentStatus === "pending" && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-700">
                    This student's enrollment is pending approval. Review the information above and
                    take appropriate action.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            {selectedStudent.enrollmentStatus === "pending" && (
              <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
                  Reject
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                  Approve
                </button>
              </div>
            )}

            {selectedStudent.enrollmentStatus !== "pending" && (
              <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminStudents;
