export default function Dashboard() {
  return (
    <div className="text-gray-800 space-y-6">
      <h2 className="text-2xl font-bold text-[#800000]">Dashboard Overview</h2>
      <p className="text-sm text-gray-600">Welcome to the SEMIS system overview.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-gray-500 text-sm">Total Students</h3>
          <p className="text-3xl font-bold text-[#800000]">1,248</p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-gray-500 text-sm">Faculty Members</h3>
          <p className="text-3xl font-bold text-[#800000]">76</p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-gray-500 text-sm">Courses Offered</h3>
          <p className="text-3xl font-bold text-[#800000]">54</p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-gray-500 text-sm">Pending Reports</h3>
          <p className="text-3xl font-bold text-[#800000]">12</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[#800000] mb-3">Recent Activity</h3>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Report “Enrollment Data 2025” submitted by Registrar</li>
          <li>Faculty member “J. Cruz” added to Computer Science</li>
          <li>24 new students registered under Engineering Department</li>
          <li>Performance analytics module scheduled for update next week</li>
        </ul>
      </div>
    </div>
  );
}
