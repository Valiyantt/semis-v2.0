import api from './api';

export interface FacultyMember {
  id: number;
  username: string;
  fullName: string;
  email: string;
  isActive: boolean;
  dateCreated: string;
  role?: {
    roleName: string;
  };
}

export interface CreateFacultyPayload {
  username: string;
  fullName: string;
  email: string;
  password: string;
}

export interface UpdateFacultyPayload {
  fullName?: string;
  email?: string;
  isActive?: boolean;
}

export const facultyManagementService = {
  // Get all faculty members
  getAllFaculty: async (): Promise<FacultyMember[]> => {
    try {
      // This would be the ideal endpoint - we'll create it in the backend
      const response = await api.get('User/faculty');
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty members:", error);
      throw error;
    }
  },

  // Create a new faculty member
  createFaculty: async (payload: CreateFacultyPayload): Promise<FacultyMember> => {
    try {
      const response = await api.post('User/faculty', payload);
      return response.data;
    } catch (error) {
      console.error("Error creating faculty member:", error);
      throw error;
    }
  },

  // Update faculty member
  updateFaculty: async (
    id: number,
    payload: UpdateFacultyPayload
  ): Promise<FacultyMember> => {
    try {
      const response = await api.put(`User/faculty/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error updating faculty member:", error);
      throw error;
    }
  },

  // Delete/Remove faculty member
  removeFaculty: async (id: number): Promise<void> => {
    try {
      await api.delete(`User/faculty/${id}`);
    } catch (error) {
      console.error("Error removing faculty member:", error);
      throw error;
    }
  },

  // Get faculty member by ID
  getFacultyById: async (id: number): Promise<FacultyMember> => {
    try {
      const response = await api.get(`User/faculty/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty member:", error);
      throw error;
    }
  },
};
