import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Student Training</h2>
          <p className="text-sm text-gray-600">Overview of enrollment and training</p>
        </div>
        <div className="text-sm text-gray-600">Home</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left big column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
              <div className="text-sm text-gray-600 font-medium">Enrollment Situation</div>
              <div className="h-24 mt-3 bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-md flex items-center justify-center text-cyan-700 font-semibold">Chart</div>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
              <div className="text-sm text-gray-600 font-medium">Number of Trainees</div>
              <div className="h-24 mt-3 bg-gradient-to-r from-rose-100 to-rose-200 rounded-md flex items-center justify-center text-rose-700 font-semibold">Chart</div>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
              <div className="text-sm text-gray-600 font-medium">Training Program</div>
              <div className="mt-3 text-lg font-bold text-gray-800">1,970</div>
              <div className="text-xs text-gray-500">Number of downloads today</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Musicology</h3>
              <div className="text-sm text-gray-600 font-medium">Planned number of People</div>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">68%</div>
                <div className="text-sm text-gray-700">This major requires a five-year course of study and a bachelor's degree.</div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
              <h3 className="font-bold text-gray-800 mb-2">Choir Conductor</h3>
              <div className="text-sm text-gray-600 font-medium">Planned number of People</div>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold">87%</div>
                <div className="text-sm text-gray-700">This major requires a five-year course of study and a bachelor's degree.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <div className="text-sm text-gray-600 font-medium">Admissions Calendar</div>
            <div className="mt-3 bg-gray-50 rounded-lg p-3 border border-gray-200 text-gray-700 text-sm">Jun 2, 2019 — calendar widget</div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-800">Number of Trainees</h4>
            <div className="mt-2 text-3xl font-bold text-gray-800">780</div>
            <div className="text-sm text-gray-600">Total Number</div>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
            <h4 className="font-bold text-gray-800">Quick Actions</h4>
            <div className="mt-3 flex flex-col gap-2">
              <button className="px-4 py-2 bg-[#800000] text-white font-semibold rounded-lg hover:bg-[#600000] transition">Apply</button>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
