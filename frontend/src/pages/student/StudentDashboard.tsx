import React, { useState } from "react";
import { BookOpen, Clock, AlertCircle, Award, User, Edit2, X, Check, DollarSign } from "lucide-react";

const StudentDashboard: React.FC = () => {
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [editingPersonalInfo, setEditingPersonalInfo] = useState(false);

  const [studentData] = useState({
    fullName: "John Smith",
    email: "john.smith@student.semis.edu",
    studentId: "STU001",
    gradeLevel: "Grade 10",
    dateOfBirth: "2006-03-15",
    gender: "Male",
    contactNumber: "+1-555-0101",
    enrollmentDate: "2024-09-01",
  });

  const [personalInfo, setPersonalInfo] = useState({
    fullName: studentData.fullName,
    email: studentData.email,
    dateOfBirth: studentData.dateOfBirth,
    gender: studentData.gender,
    contactNumber: studentData.contactNumber,
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePersonalInfo = async () => {
    // In a real app, this would call the API to update personal info
    console.log("Saving personal info:", personalInfo);
    setEditingPersonalInfo(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Dashboard</h2>
          <p className="text-sm text-gray-600">Your courses, grades, and academic progress</p>
        </div>
        <div className="text-sm text-gray-600">Home</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Quick Stats */}
        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Enrolled Courses</div>
              <div className="mt-2 text-3xl font-bold text-gray-800">5</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <BookOpen size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Current GPA</div>
              <div className="mt-2 text-3xl font-bold text-gray-800">3.7</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Award size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Pending Assignments</div>
              <div className="mt-2 text-3xl font-bold text-gray-800">4</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock size={24} className="text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Account Balance</div>
              <div className="mt-2 text-3xl font-bold text-gray-800">$0.00</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
              <DollarSign size={24} className="text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Courses */}
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">My Courses</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Advanced Mathematics</div>
                  <div className="text-sm text-gray-600">Prof. Dr. Anderson</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-blue-600">A</div>
                  <div className="text-xs text-gray-600">Grade</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Physics 101</div>
                  <div className="text-sm text-gray-600">Prof. Sarah Miller</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">A-</div>
                  <div className="text-xs text-gray-600">Grade</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Chemistry 201</div>
                  <div className="text-sm text-gray-600">Prof. James White</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-purple-600">B+</div>
                  <div className="text-xs text-gray-600">Grade</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">English Literature</div>
                  <div className="text-sm text-gray-600">Prof. Emily Davis</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-orange-600">A</div>
                  <div className="text-xs text-gray-600">Grade</div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">Upcoming Assignments</h3>
            <div className="space-y-3">
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">Calculus Problem Set 5</div>
                  <div className="text-sm text-gray-600">Advanced Mathematics</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-xs font-semibold text-white bg-orange-600 px-2 py-1 rounded-full">
                    Due in 2 days
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">Lab Report - Energy Transfer</div>
                  <div className="text-sm text-gray-600">Physics 101</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-xs font-semibold text-white bg-orange-600 px-2 py-1 rounded-full">
                    Due in 5 days
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">Essay: British Romanticism</div>
                  <div className="text-sm text-gray-600">English Literature</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-xs font-semibold text-white bg-orange-600 px-2 py-1 rounded-full">
                    Due in 7 days
                  </div>
                </div>
              </div>
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">Chapter 12-14 Questions</div>
                  <div className="text-sm text-gray-600">Chemistry 201</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-xs font-semibold text-white bg-red-600 px-2 py-1 rounded-full">
                    Overdue
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Personal Information Card */}
          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <User size={18} />
                Personal Info
              </h4>
              <button
                onClick={() => setShowPersonalInfoModal(true)}
                className="p-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
              >
                <Edit2 size={16} />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-600">Full Name</p>
                <p className="font-semibold text-gray-800">{studentData.fullName}</p>
              </div>
              <div>
                <p className="text-gray-600">Student ID</p>
                <p className="font-semibold text-gray-800">{studentData.studentId}</p>
              </div>
              <div>
                <p className="text-gray-600">Grade Level</p>
                <p className="font-semibold text-gray-800">{studentData.gradeLevel}</p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">{studentData.email}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">Quick Actions</h4>
            <div className="flex flex-col gap-2">
              <button className="px-4 py-2 bg-[#800000] text-white font-semibold rounded-lg hover:bg-[#600000] transition text-sm">
                View Grades
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition text-sm">
                Course Materials
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition text-sm">
                Submit Assignment
              </button>
            </div>
          </div>

          {/* Academic Progress */}
          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">Course Progress</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Advanced Mathematics</span>
                  <span className="font-semibold text-gray-800">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Physics 101</span>
                  <span className="font-semibold text-gray-800">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Chemistry 201</span>
                  <span className="font-semibold text-gray-800">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notices */}
          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">Notices</h4>
            <div className="space-y-2">
              <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                📢 Final exams start on December 15
              </div>
              <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                ℹ️ Spring semester registration opens Dec 10
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information Modal */}
      {showPersonalInfoModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#800000]">Edit Personal Information</h2>
              <button
                onClick={() => {
                  setShowPersonalInfoModal(false);
                  setEditingPersonalInfo(false);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              {!editingPersonalInfo ? (
                <>
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold text-gray-800">{studentData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-800">{studentData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-semibold text-gray-800">{studentData.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Gender</p>
                    <p className="font-semibold text-gray-800">{studentData.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Number</p>
                    <p className="font-semibold text-gray-800">{studentData.contactNumber}</p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setEditingPersonalInfo(true)}
                      className="w-full px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold flex items-center justify-center gap-2"
                    >
                      <Edit2 size={16} />
                      Edit Information
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={personalInfo.fullName}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={personalInfo.dateOfBirth}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={personalInfo.gender}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={personalInfo.contactNumber}
                      onChange={handlePersonalInfoChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              {editingPersonalInfo && (
                <>
                  <button
                    onClick={() => setEditingPersonalInfo(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePersonalInfo}
                    className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold flex items-center gap-2"
                  >
                    <Check size={16} />
                    Save Changes
                  </button>
                </>
              )}
              {!editingPersonalInfo && (
                <button
                  onClick={() => setShowPersonalInfoModal(false)}
                  className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Courses */}
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">My Courses</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Advanced Mathematics</div>
                  <div className="text-sm text-gray-600">Prof. Dr. Anderson</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-blue-600">A</div>
                  <div className="text-xs text-gray-600">Grade</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Physics 101</div>
                  <div className="text-sm text-gray-600">Prof. Sarah Miller</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">A-</div>
                  <div className="text-xs text-gray-600">Grade</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">Chemistry 201</div>
                  <div className="text-sm text-gray-600">Prof. James White</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-purple-600">B+</div>
                  <div className="text-xs text-gray-600">Grade</div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">English Literature</div>
                  <div className="text-sm text-gray-600">Prof. Emily Davis</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-orange-600">A</div>
                  <div className="text-xs text-gray-600">Grade</div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Assignments */}
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">Upcoming Assignments</h3>
            <div className="space-y-3">
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">Calculus Problem Set 5</div>
                  <div className="text-sm text-gray-600">Advanced Mathematics</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-xs font-semibold text-white bg-orange-600 px-2 py-1 rounded-full">Due in 2 days</div>
                </div>
              </div>
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">Lab Report - Energy Transfer</div>
                  <div className="text-sm text-gray-600">Physics 101</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-xs font-semibold text-white bg-orange-600 px-2 py-1 rounded-full">Due in 5 days</div>
                </div>
              </div>
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">Essay: British Romanticism</div>
                  <div className="text-sm text-gray-600">English Literature</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-xs font-semibold text-white bg-orange-600 px-2 py-1 rounded-full">Due in 7 days</div>
                </div>
              </div>
              <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">Chapter 12-14 Questions</div>
                  <div className="text-sm text-gray-600">Chemistry 201</div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-xs font-semibold text-white bg-red-600 px-2 py-1 rounded-full">Overdue</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">Quick Actions</h4>
            <div className="flex flex-col gap-2">
              <button className="px-4 py-2 bg-[#800000] text-white font-semibold rounded-lg hover:bg-[#600000] transition">
                View Grades
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
                Course Materials
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
                Submit Assignment
              </button>
            </div>
          </div>

          {/* Academic Progress */}
          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">Course Progress</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Advanced Mathematics</span>
                  <span className="font-semibold text-gray-800">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Physics 101</span>
                  <span className="font-semibold text-gray-800">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Chemistry 201</span>
                  <span className="font-semibold text-gray-800">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notices */}
          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">Notices</h4>
            <div className="space-y-2">
              <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                📢 Final exams start on December 15
              </div>
              <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
                ℹ️ Spring semester registration opens Dec 10
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
