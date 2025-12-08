import React from "react";
import { BookOpen, Clock, AlertCircle, Award } from "lucide-react";

const StudentDashboard: React.FC = () => {
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
              <div className="text-sm text-gray-600 font-medium">Overdue Tasks</div>
              <div className="mt-2 text-3xl font-bold text-gray-800">1</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle size={24} className="text-red-600" />
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
