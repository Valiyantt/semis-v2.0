import axios from "axios";

const API_BASE_URL = "http://localhost:5157/backend";

export interface Student {
  id: number;
  username: string;
  fullName: string;
  email: string;
  dateOfBirth?: string;
  gender?: string;
  contactNumber?: string;
  enrollmentStatus: "enrolled" | "pending" | "not-enrolled";
  currentGradeLevel?: string;
  enrollmentDate?: string;
  isActive: boolean;
}

export interface StudentRegistrationPayload {
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  password: string;
  schoolLevelId?: number;
  gradeId?: number;
}

export interface StudentLoginPayload {
  email: string;
  password: string;
}

export interface StudentLoginResponse {
  token: string;
  student: {
    id: number;
    fullName: string;
    email: string;
    enrollmentStatus: string;
  };
}

export interface StudentPersonalInfo {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
}

export const studentManagementService = {
  // Get all students (for SuperAdmin)
  getAllStudents: async (): Promise<Student[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Student/all`);
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },

  // Get enrolled students (for SuperAdmin)
  getEnrolledStudents: async (): Promise<Student[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Student/enrolled`);
      return response.data;
    } catch (error) {
      console.error("Error fetching enrolled students:", error);
      throw error;
    }
  },

  // Get pending/not enrolled students (for SuperAdmin)
  getPendingStudents: async (): Promise<Student[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Student/pending`);
      return response.data;
    } catch (error) {
      console.error("Error fetching pending students:", error);
      throw error;
    }
  },

  // Register new student
  registerStudent: async (payload: StudentRegistrationPayload): Promise<StudentLoginResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Auth/register-student`, payload);
      return response.data;
    } catch (error) {
      console.error("Error registering student:", error);
      throw error;
    }
  },

  // Student login
  loginStudent: async (payload: StudentLoginPayload): Promise<StudentLoginResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Auth/login-student`, payload);
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // Get student details
  getStudentDetails: async (id: number): Promise<Student> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Student/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student details:", error);
      throw error;
    }
  },

  // Update student personal info
  updateStudentPersonalInfo: async (
    id: number,
    payload: StudentPersonalInfo
  ): Promise<Student> => {
    try {
      const response = await axios.put(`${API_BASE_URL}/Student/${id}/personal-info`, payload);
      return response.data;
    } catch (error) {
      console.error("Error updating personal info:", error);
      throw error;
    }
  },

  // Approve student enrollment (SuperAdmin)
  approveEnrollment: async (id: number): Promise<Student> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/Student/${id}/approve`);
      return response.data;
    } catch (error) {
      console.error("Error approving enrollment:", error);
      throw error;
    }
  },

  // Reject student enrollment (SuperAdmin)
  rejectEnrollment: async (id: number): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/Student/${id}/reject`);
    } catch (error) {
      console.error("Error rejecting enrollment:", error);
      throw error;
    }
  },
};

export const studentDashboardService = {
  // Get student dashboard data
  getDashboard: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/StudentDashboard`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      throw error;
    }
  },

  // Get student grades
  getGrades: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/StudentDashboard/grades`);
      return response.data;
    } catch (error) {
      console.error("Error fetching grades:", error);
      throw error;
    }
  },

  // Get student schedule
  getSchedule: async (): Promise<any> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/StudentDashboard/schedule`);
      return response.data;
    } catch (error) {
      console.error("Error fetching schedule:", error);
      throw error;
    }
  },
};
