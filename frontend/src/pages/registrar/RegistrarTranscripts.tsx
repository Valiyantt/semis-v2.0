import React, { useState } from "react";
import { Download, Eye, Printer, Search, Calendar, GraduationCap } from "lucide-react";

interface Transcript {
  id: number;
  studentId: string;
  studentName: string;
  gradeLevel: string;
  gpa: number;
  generatedDate: string;
  status: "ready" | "pending" | "archived";
}

const RegistrarTranscripts: React.FC = () => {
  const [transcripts, setTranscripts] = useState<Transcript[]>([
    {
      id: 1,
      studentId: "STU001",
      studentName: "John Smith",
      gradeLevel: "Grade 10",
      gpa: 3.7,
      generatedDate: "2024-12-15",
      status: "ready",
    },
    {
      id: 2,
      studentId: "STU002",
      studentName: "Emma Johnson",
      gradeLevel: "Grade 11",
      gpa: 3.9,
      generatedDate: "2024-12-14",
      status: "ready",
    },
    {
      id: 3,
      studentId: "STU003",
      studentName: "Michael Brown",
      gradeLevel: "Grade 10",
      gpa: 3.2,
      generatedDate: "2024-12-15",
      status: "pending",
    },
    {
      id: 4,
      studentId: "STU004",
      studentName: "Sarah Davis",
      gradeLevel: "Grade 12",
      gpa: 3.5,
      generatedDate: "2024-11-20",
      status: "archived",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "ready" | "pending" | "archived">("all");
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);

  const filteredTranscripts = transcripts.filter((transcript) => {
    const matchesSearch =
      transcript.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transcript.studentId.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedTab === "ready") return matchesSearch && transcript.status === "ready";
    if (selectedTab === "pending") return matchesSearch && transcript.status === "pending";
    if (selectedTab === "archived") return matchesSearch && transcript.status === "archived";
    return matchesSearch;
  });

  const stats = {
    ready: transcripts.filter((t) => t.status === "ready").length,
    pending: transcripts.filter((t) => t.status === "pending").length,
    archived: transcripts.filter((t) => t.status === "archived").length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Ready</span>;
      case "pending":
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">Generating</span>;
      case "archived":
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">Archived</span>;
      default:
        return null;
    }
  };

  const handleDownload = (transcript: Transcript) => {
    console.log(`Downloading transcript for ${transcript.studentName}`);
    // In a real app, this would trigger a PDF download
  };

  const handlePrint = (transcript: Transcript) => {
    console.log(`Printing transcript for ${transcript.studentName}`);
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Academic Transcripts</h2>
        <p className="text-sm text-gray-600">Generate and manage student academic transcripts</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Ready</div>
              <div className="mt-2 text-3xl font-bold text-green-600">{stats.ready}</div>
            </div>
            <GraduationCap size={24} className="text-green-600" />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Generating</div>
              <div className="mt-2 text-3xl font-bold text-yellow-600">{stats.pending}</div>
            </div>
            <Calendar size={24} className="text-yellow-600" />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600 font-medium">Archived</div>
              <div className="mt-2 text-3xl font-bold text-gray-600">{stats.archived}</div>
            </div>
            <GraduationCap size={24} className="text-gray-600" />
          </div>
        </div>
      </div>

      {/* Transcripts Table */}
      <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
        {/* Controls */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-2 flex-wrap">
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
                onClick={() => setSelectedTab("ready")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTab === "ready"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Ready ({stats.ready})
              </button>
              <button
                onClick={() => setSelectedTab("pending")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedTab === "pending"
                    ? "bg-[#800000] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Generating ({stats.pending})
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
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">GPA</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTranscripts.map((transcript) => (
                <tr key={transcript.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{transcript.studentId}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{transcript.studentName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transcript.gradeLevel}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">{transcript.gpa}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transcript.generatedDate}</td>
                  <td className="px-6 py-4">{getStatusBadge(transcript.status)}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedTranscript(transcript);
                          setShowPreview(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        title="Preview"
                      >
                        <Eye size={16} />
                      </button>
                      {transcript.status === "ready" && (
                        <>
                          <button
                            onClick={() => handleDownload(transcript)}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition"
                            title="Download"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            onClick={() => handlePrint(transcript)}
                            className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition"
                            title="Print"
                          >
                            <Printer size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTranscript && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 p-6 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-[#800000]">Transcript Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-8 space-y-6 bg-gray-50">
              {/* Header */}
              <div className="text-center border-b-2 border-[#800000] pb-4">
                <h3 className="text-2xl font-bold text-[#800000]">ACADEMIC TRANSCRIPT</h3>
                <p className="text-sm text-gray-600 mt-1">School Enterprise Management Information System</p>
              </div>

              {/* Student Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 font-semibold">Student ID:</p>
                  <p className="text-gray-800">{selectedTranscript.studentId}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Student Name:</p>
                  <p className="text-gray-800">{selectedTranscript.studentName}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">Grade Level:</p>
                  <p className="text-gray-800">{selectedTranscript.gradeLevel}</p>
                </div>
                <div>
                  <p className="text-gray-600 font-semibold">GPA:</p>
                  <p className="text-gray-800">{selectedTranscript.gpa}</p>
                </div>
              </div>

              {/* Grades Table */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Course Grades</h4>
                <table className="w-full border border-gray-300 text-sm">
                  <thead className="bg-[#800000] text-white">
                    <tr>
                      <th className="px-4 py-2 text-left">Course</th>
                      <th className="px-4 py-2 text-left">Credits</th>
                      <th className="px-4 py-2 text-left">Grade</th>
                      <th className="px-4 py-2 text-left">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-300">
                      <td className="px-4 py-2">Advanced Mathematics</td>
                      <td className="px-4 py-2">4</td>
                      <td className="px-4 py-2">A</td>
                      <td className="px-4 py-2">4.0</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                      <td className="px-4 py-2">Physics 101</td>
                      <td className="px-4 py-2">3</td>
                      <td className="px-4 py-2">A-</td>
                      <td className="px-4 py-2">3.7</td>
                    </tr>
                    <tr className="border-t border-gray-300">
                      <td className="px-4 py-2">Chemistry 201</td>
                      <td className="px-4 py-2">4</td>
                      <td className="px-4 py-2">B+</td>
                      <td className="px-4 py-2">3.3</td>
                    </tr>
                    <tr className="border-t border-gray-300 bg-gray-100">
                      <td colSpan={2} className="px-4 py-2 font-semibold">Cumulative GPA:</td>
                      <td colSpan={2} className="px-4 py-2 font-bold text-lg">{selectedTranscript.gpa}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Signature */}
              <div className="border-t pt-4 mt-6">
                <p className="text-xs text-gray-600">
                  <strong>Generated:</strong> {selectedTranscript.generatedDate}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  This is an official academic transcript issued by the Registrar's Office.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 p-6 flex justify-end gap-3 sticky bottom-0 bg-white">
              {selectedTranscript.status === "ready" && (
                <>
                  <button
                    onClick={() => handlePrint(selectedTranscript)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold"
                  >
                    <Printer size={16} className="inline mr-2" />
                    Print
                  </button>
                  <button
                    onClick={() => handleDownload(selectedTranscript)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    <Download size={16} className="inline mr-2" />
                    Download
                  </button>
                </>
              )}
              <button
                onClick={() => setShowPreview(false)}
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

export default RegistrarTranscripts;
