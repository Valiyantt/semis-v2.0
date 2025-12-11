import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, X, Check, Eye, EyeOff } from "lucide-react";
import { schoolStructureService } from "../../services/schoolStructureService";
import { facultyManagementService, FacultyMember } from "../../services/facultyManagementService";

interface SchoolLevel {
  schoolLevelId: number;
  levelName: string;
}

const SuperAdminFaculty: React.FC = () => {
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [schoolLevels, setSchoolLevels] = useState<SchoolLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    schoolLevel: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFaculty();
    fetchSchoolLevels();
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      // For now, we'll use mock data since the backend endpoint might not exist yet
      const mockFaculty: FacultyMember[] = [
        {
          id: 1,
          username: "faculty01",
          fullName: "Dr. James Anderson",
          email: "james.anderson@semis.edu",
          isActive: true,
          dateCreated: "2024-01-15",
        },
        {
          id: 2,
          username: "faculty02",
          fullName: "Prof. Sarah Williams",
          email: "sarah.williams@semis.edu",
          isActive: true,
          dateCreated: "2024-02-10",
        },
        {
          id: 3,
          username: "faculty03",
          fullName: "Dr. Michael Brown",
          email: "michael.brown@semis.edu",
          isActive: true,
          dateCreated: "2024-03-05",
        },
      ];
      setFaculty(mockFaculty);
      setError(null);
    } catch (err) {
      setError("Failed to load faculty members");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSchoolLevels = async () => {
    try {
      const data = await schoolStructureService.getSchoolLevels();
      setSchoolLevels(data);
    } catch (err) {
      console.error("Failed to load school levels:", err);
    }
  };

  const handleAddFaculty = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      const newFaculty: FacultyMember = {
        id: Math.max(...faculty.map((f) => f.id), 0) + 1,
        username: formData.username || formData.fullName.toLowerCase().replace(/\s+/g, ""),
        fullName: formData.fullName,
        email: formData.email,
        isActive: true,
        dateCreated: new Date().toISOString(),
      };

      setFaculty([...faculty, newFaculty]);
      setShowAddModal(false);
      setFormData({ username: "", fullName: "", email: "", password: "", schoolLevel: "" });
      setError(null);
    } catch (err) {
      setError("Failed to add faculty member");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditFaculty = async () => {
    if (!selectedFaculty) return;

    try {
      setSubmitting(true);
      const updatedFaculty = faculty.map((f) =>
        f.id === selectedFaculty.id
          ? { ...f, fullName: formData.fullName, email: formData.email }
          : f
      );
      setFaculty(updatedFaculty);
      setShowEditModal(false);
      setSelectedFaculty(null);
      setFormData({ username: "", fullName: "", email: "", password: "", schoolLevel: "" });
      setError(null);
    } catch (err) {
      setError("Failed to update faculty member");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFaculty = async () => {
    if (!selectedFaculty) return;

    try {
      setSubmitting(true);
      setFaculty(faculty.filter((f) => f.id !== selectedFaculty.id));
      setShowDeleteConfirm(false);
      setSelectedFaculty(null);
      setError(null);
    } catch (err) {
      setError("Failed to remove faculty member");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (member: FacultyMember) => {
    setSelectedFaculty(member);
    setFormData({
      username: member.username,
      fullName: member.fullName,
      email: member.email,
      password: "",
      schoolLevel: "",
    });
    setShowEditModal(true);
  };

  const openDeleteConfirm = (member: FacultyMember) => {
    setSelectedFaculty(member);
    setShowDeleteConfirm(true);
  };

  const filteredFaculty = faculty.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-2xl shadow-md p-8 border-l-4 border-[#800000]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#800000] mb-2">Faculty Management</h1>
            <p className="text-gray-600">Manage faculty members, assign school levels, and control access</p>
          </div>
          <button
            onClick={() => {
              setFormData({ username: "", fullName: "", email: "", password: "", schoolLevel: "" });
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold"
          >
            <Plus size={20} />
            Add Faculty Member
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 flex items-center justify-between">
          {error}
          <button onClick={() => setError(null)}>
            <X size={20} />
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <input
          type="text"
          placeholder="Search by name, email, or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
        />
      </div>

      {/* Faculty List */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-[#800000] rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-500 mt-4">Loading faculty members...</p>
          </div>
        ) : filteredFaculty.length === 0 ? (
          <div className="text-center py-12 bg-gray-50">
            <p className="text-gray-500 mb-4">No faculty members found</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition"
            >
              Add First Faculty Member
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Full Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Username</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date Created</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFaculty.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{member.fullName}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs">{member.username}</code>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{member.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          member.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {member.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">{formatDate(member.dateCreated)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(member)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                          title="Edit faculty member"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteConfirm(member)}
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                          title="Remove faculty member"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Faculty Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#800000]">Add Faculty Member</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g., Dr. James Anderson"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Leave blank to auto-generate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="faculty@semis.edu"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">School Level (Optional)</label>
                <select
                  value={formData.schoolLevel}
                  onChange={(e) => setFormData({ ...formData, schoolLevel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                >
                  <option value="">Select a school level...</option>
                  {schoolLevels.map((level) => (
                    <option key={level.schoolLevelId} value={level.schoolLevelId}>
                      {level.levelName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFaculty}
                disabled={submitting}
                className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add Faculty"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Faculty Modal */}
      {showEditModal && selectedFaculty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#800000]">Edit Faculty Member</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">School Level (Tier)</label>
                <select
                  value={formData.schoolLevel}
                  onChange={(e) => setFormData({ ...formData, schoolLevel: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#800000]"
                >
                  <option value="">Select a school level...</option>
                  {schoolLevels.map((level) => (
                    <option key={level.schoolLevelId} value={level.schoolLevelId}>
                      {level.levelName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  <strong>Username:</strong> {formData.username}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleEditFaculty}
                disabled={submitting}
                className="px-4 py-2 bg-[#800000] text-white rounded-lg hover:bg-[#600000] transition font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                <Check size={16} />
                {submitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedFaculty && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#800000] mb-4">Confirm Removal</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove <strong>{selectedFaculty.fullName}</strong> from the faculty roster? This
                action cannot be undone.
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-700">
                  This will remove all associated records and permissions.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 p-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFaculty}
                disabled={submitting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                <Trash2 size={16} />
                {submitting ? "Removing..." : "Remove Faculty"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminFaculty;
