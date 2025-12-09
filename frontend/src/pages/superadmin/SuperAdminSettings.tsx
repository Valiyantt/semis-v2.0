import React, { useState, useEffect } from "react";
import { SchoolIcon, BarChart3, Users, Zap, BookOpen, Grid3x3 } from "lucide-react";
import { schoolStructureService } from "../../services/schoolStructureService";

interface SchoolLevel {
  schoolLevelId: number;
  levelName: string;
  grades?: Grade[];
}

interface Grade {
  gradeId: number;
  gradeName: string;
}

interface SchoolStructure {
  schoolLevelId: number;
  levelName: string;
  grades: Grade[];
}

const SuperAdminSettings: React.FC = () => {
  const [schoolStructure, setSchoolStructure] = useState<SchoolStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<SchoolStructure | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchSchoolStructure();
  }, []);

  const fetchSchoolStructure = async () => {
    try {
      setLoading(true);
      const data = await schoolStructureService.getCompleteStructure();
      setSchoolStructure(data);
    } catch (error) {
      console.error("Failed to fetch school structure:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (level: SchoolStructure) => {
    setSelectedLevel(level);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedLevel(null);
  };

  const totalGrades = schoolStructure.reduce((sum, level) => sum + level.grades.length, 0);
  const totalLevels = schoolStructure.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-[#800000]">
        <h1 className="text-3xl font-bold text-[#800000] mb-2">School Management Settings</h1>
        <p className="text-gray-600">Manage your school structure, levels, and grades</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Levels */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">Total School Levels</p>
              <p className="text-4xl font-bold text-[#800000] mt-2">{totalLevels}</p>
              <p className="text-xs text-gray-400 mt-1">e.g., Primary, Secondary</p>
            </div>
            <div className="w-16 h-16 bg-[#800000]/10 rounded-full flex items-center justify-center">
              <SchoolIcon size={32} className="text-[#800000]" />
            </div>
          </div>
        </div>

        {/* Total Grades */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">Total Grades</p>
              <p className="text-4xl font-bold text-[#800000] mt-2">{totalGrades}</p>
              <p className="text-xs text-gray-400 mt-1">Grades & Programs</p>
            </div>
            <div className="w-16 h-16 bg-[#800000]/10 rounded-full flex items-center justify-center">
              <Grid3x3 size={32} className="text-[#800000]" />
            </div>
          </div>
        </div>

        {/* Average Grades per Level */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-semibold">Avg Grades/Level</p>
              <p className="text-4xl font-bold text-[#800000] mt-2">
                {totalLevels > 0 ? (totalGrades / totalLevels).toFixed(1) : 0}
              </p>
              <p className="text-xs text-gray-400 mt-1">Per school level</p>
            </div>
            <div className="w-16 h-16 bg-[#800000]/10 rounded-full flex items-center justify-center">
              <BarChart3 size={32} className="text-[#800000]" />
            </div>
          </div>
        </div>
      </div>

      {/* School Structure Details */}
      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen size={24} className="text-[#800000]" />
          <h2 className="text-2xl font-bold text-[#800000]">School Structure Hierarchy</h2>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-[#800000] rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-500 mt-4">Loading school structure...</p>
          </div>
        ) : schoolStructure.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No school structure found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {schoolStructure.map((level) => (
              <div
                key={level.schoolLevelId}
                className="border border-gray-200 rounded-lg p-4 hover:border-[#800000] hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#800000]/10 rounded-lg flex items-center justify-center">
                      <BookOpen size={24} className="text-[#800000]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{level.levelName}</h3>
                      <p className="text-sm text-gray-500">{level.grades.length} grades</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleViewDetails(level)}
                    className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition text-sm font-semibold"
                  >
                    View Grades
                  </button>
                </div>

                {/* Quick Preview of Grades */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Grades in this level:</p>
                  <div className="flex flex-wrap gap-2">
                    {level.grades.slice(0, 5).map((grade) => (
                      <span
                        key={grade.gradeId}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                      >
                        {grade.gradeName}
                      </span>
                    ))}
                    {level.grades.length > 5 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        +{level.grades.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Management Functions Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add School Level */}
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#800000] hover:shadow-lg transition">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#800000]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <SchoolIcon size={24} className="text-[#800000]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Add School Level</h3>
              <p className="text-sm text-gray-600 mb-4">
                Create new school levels such as Primary, Secondary, or Higher Education programs.
              </p>
              <button className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition text-sm font-semibold">
                Add Level
              </button>
            </div>
          </div>
        </div>

        {/* Add Grades */}
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#800000] hover:shadow-lg transition">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#800000]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Grid3x3 size={24} className="text-[#800000]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Add Grades/Programs</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add new grades or academic programs to existing school levels.
              </p>
              <button className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition text-sm font-semibold">
                Add Grade
              </button>
            </div>
          </div>
        </div>

        {/* System Configuration */}
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#800000] hover:shadow-lg transition">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#800000]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Zap size={24} className="text-[#800000]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">System Configuration</h3>
              <p className="text-sm text-gray-600 mb-4">
                Configure academic calendar, enrollment settings, and general system preferences.
              </p>
              <button className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition text-sm font-semibold">
                Configure
              </button>
            </div>
          </div>
        </div>

        {/* Manage Departments */}
        <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#800000] hover:shadow-lg transition">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#800000]/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users size={24} className="text-[#800000]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Manage Departments</h3>
              <p className="text-sm text-gray-600 mb-4">
                Create and manage academic departments, colleges, and administrative units.
              </p>
              <button className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition text-sm font-semibold">
                Manage
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Grade Details */}
      {showDetails && selectedLevel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#800000]">{selectedLevel.levelName}</h2>
                <p className="text-sm text-gray-500">Grades and Programs</p>
              </div>
              <button
                onClick={handleCloseDetails}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              {selectedLevel.grades.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No grades found for this level</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedLevel.grades.map((grade) => (
                    <div
                      key={grade.gradeId}
                      className="p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-[#800000] hover:bg-[#800000]/5 transition"
                    >
                      <p className="text-center font-semibold text-gray-800">{grade.gradeName}</p>
                      <p className="text-center text-xs text-gray-500 mt-1">ID: {grade.gradeId}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={handleCloseDetails}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold">
                Edit Grades
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminSettings;
