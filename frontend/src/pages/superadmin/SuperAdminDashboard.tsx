import React from "react";
import DashboardCard from "../../components/DashboardCard";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-[#800000]">Dashboard Overview</h2>
        <p className="text-gray-600">Welcome to the SEMIS system overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Total Students" value="1,248" description="Active enrollees this semester" />
        <DashboardCard title="Faculty Members" value="76" description="Registered teaching staff" />
        <DashboardCard title="Courses Offered" value="54" description="Across all departments" />
        <DashboardCard title="Pending Reports" value="12" description="Awaiting review" />
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#800000] mb-3">Enrollment Trends</h3>
        <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center text-gray-400 italic">
          [ Chart Placeholder – future analytics here ]
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold text-[#800000] mb-3">Recent Activity</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="border-b pb-2">📋 Report “Enrollment Data 2025” submitted by Registrar</li>
          <li className="border-b pb-2">👩‍🏫 Faculty member “J. Cruz” added to Computer Science</li>
          <li className="border-b pb-2">🎓 24 new students registered under Engineering Department</li>
          <li>📈 Performance analytics module scheduled for update next week</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
