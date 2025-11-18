import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Student Training</h2>
          <p className="text-sm text-gray-500">Overview of enrollment and training</p>
        </div>
        <div className="text-sm text-gray-500">Home</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left big column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl p-5">
              <div className="text-sm text-gray-500">Enrollment Situation</div>
              <div className="h-24 mt-3 bg-gradient-to-r from-cyan-100 to-cyan-200 rounded-md flex items-center justify-center text-cyan-700">Chart</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl p-5">
              <div className="text-sm text-gray-500">Number of Trainees</div>
              <div className="h-24 mt-3 bg-gradient-to-r from-rose-100 to-rose-200 rounded-md flex items-center justify-center text-rose-700">Chart</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl p-5">
              <div className="text-sm text-gray-500">Training Program</div>
              <div className="mt-3 text-lg font-semibold">1,970</div>
              <div className="text-xs text-gray-400">Number of downloads today</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Musicology</h3>
              <div className="text-sm text-gray-500">Planned number of People</div>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">68%</div>
                <div className="text-sm text-gray-600">This major requires a five-year course of study and a bachelor's degree.</div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Choir Conductor</h3>
              <div className="text-sm text-gray-500">Planned number of People</div>
              <div className="mt-4 flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold">87%</div>
                <div className="text-sm text-gray-600">This major requires a five-year course of study and a bachelor's degree.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-5">
            <div className="text-sm text-gray-500">Admissions Calendar</div>
            <div className="mt-3 bg-white rounded-lg p-3 shadow-inner">Jun 2, 2019 — calendar widget</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-5">
            <h4 className="font-semibold">Number of Trainees</h4>
            <div className="mt-2 text-3xl font-bold">780</div>
            <div className="text-sm text-gray-500">Total Number</div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm shadow-md rounded-2xl p-5">
            <h4 className="font-semibold">Quick Actions</h4>
            <div className="mt-3 flex flex-col gap-2">
              <button className="btn btn-primary">Apply</button>
              <button className="btn">Export</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
