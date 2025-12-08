import React, { useState, useEffect } from "react";
import { schoolStructureService } from "../services/schoolStructureService";

interface SchoolStructureSelectorProps {
  onLevelSelect: (levelId: number, levelName: string) => void;
  onGradeSelect: (gradeId: number, gradeName: string) => void;
  selectedLevelId?: number;
  selectedGradeId?: number;
}

interface SchoolLevel {
  schoolLevelId: number;
  levelName: string;
}

interface Grade {
  gradeId: number;
  gradeName: string;
}

const SchoolStructureSelector: React.FC<SchoolStructureSelectorProps> = ({
  onLevelSelect,
  onGradeSelect,
  selectedLevelId,
  selectedGradeId,
}) => {
  const [levels, setLevels] = useState<SchoolLevel[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(selectedLevelId || null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(selectedGradeId || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        setLoading(true);
        const data = await schoolStructureService.getSchoolLevels();
        setLevels(data);
        setError(null);
      } catch (err) {
        setError("Failed to load school levels");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLevels();
  }, []);

  useEffect(() => {
    if (selectedLevel) {
      const fetchGrades = async () => {
        try {
          setLoading(true);
          const data = await schoolStructureService.getGradesByLevel(selectedLevel);
          setGrades(data);
          setSelectedGrade(null);
          setError(null);
        } catch (err) {
          setError("Failed to load grades");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchGrades();
    }
  }, [selectedLevel]);

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const levelId = parseInt(e.target.value);
    setSelectedLevel(levelId);
    
    const level = levels.find(l => l.schoolLevelId === levelId);
    if (level) {
      onLevelSelect(levelId, level.levelName);
    }
  };

  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gradeId = parseInt(e.target.value);
    setSelectedGrade(gradeId);
    
    const grade = grades.find(g => g.gradeId === gradeId);
    if (grade) {
      onGradeSelect(gradeId, grade.gradeName);
    }
  };

  if (error) {
    return <div className="text-red-600 text-sm">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">School Level</label>
        <select
          value={selectedLevel || ""}
          onChange={handleLevelChange}
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000] disabled:bg-gray-100"
        >
          <option value="">Select a school level...</option>
          {levels.map((level) => (
            <option key={level.schoolLevelId} value={level.schoolLevelId}>
              {level.levelName}
            </option>
          ))}
        </select>
      </div>

      {selectedLevel && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grade/Program</label>
          <select
            value={selectedGrade || ""}
            onChange={handleGradeChange}
            disabled={loading || grades.length === 0}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000] disabled:bg-gray-100"
          >
            <option value="">Select a grade...</option>
            {grades.map((grade) => (
              <option key={grade.gradeId} value={grade.gradeId}>
                {grade.gradeName}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SchoolStructureSelector;
