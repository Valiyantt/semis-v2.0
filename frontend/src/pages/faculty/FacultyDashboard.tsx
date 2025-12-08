import React from "react";
import { Calendar, Users, BookOpen, BarChart2 } from "lucide-react";

const FacultyDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Faculty Dashboard</h2>
          <p className="text-sm text-gray-600">Overview of your classes and students</p>
        </div>
        <div className="text-sm text-gray-600">Home</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Quick Stats */}
        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Total Classes</div>
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
              <div className="text-sm text-gray-600 font-medium">Total Students</div>
              <div className="mt-2 text-3xl font-bold text-gray-800">142</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Users size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Assignments Pending</div>
              <div className="mt-2 text-3xl font-bold text-gray-800">3</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <BarChart2 size={24} className="text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Upcoming Classes</div>
              <div className="mt-2 text-3xl font-bold text-gray-800">2</div>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Calendar size={24} className="text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <div className="font-semibold text-gray-800">Advanced Mathematics</div>
                  <div className="text-sm text-gray-600">10:00 AM - 11:30 AM</div>
                </div>
                <div className="text-xs font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">Room 204</div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <div className="font-semibold text-gray-800">Physics 101</div>
                  <div className="text-sm text-gray-600">2:00 PM - 3:30 PM</div>
                </div>
                <div className="text-xs font-semibold text-white bg-green-600 px-3 py-1 rounded-full">Lab A</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Users size={18} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">Class attendance submitted</div>
                  <div className="text-sm text-gray-600">Advanced Mathematics - Yesterday</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={18} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800">Assignment graded</div>
                  <div className="text-sm text-gray-600">Physics 101 - 2 days ago</div>
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
                Create Assignment
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
                View Grades
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
                Course Materials
              </button>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">Class Performance</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Advanced Mathematics</span>
                  <span className="font-semibold text-gray-800">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Physics 101</span>
                  <span className="font-semibold text-gray-800">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Chemistry 201</span>
                  <span className="font-semibold text-gray-800">72%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
