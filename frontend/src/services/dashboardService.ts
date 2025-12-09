import axios from "axios";

const API_BASE_URL = "http://localhost:5157/backend";

export const superadminDashboardService = {
  getDashboard: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Dashboard`);
      return response.data;
    } catch (error) {
      console.error("Error fetching superadmin dashboard:", error);
      throw error;
    }
  },

  getUsersStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Dashboard/users`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users statistics:", error);
      throw error;
    }
  },

  getFacultyStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Dashboard/faculty`);
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty statistics:", error);
      throw error;
    }
  },

  getStudentStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Dashboard/students`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student statistics:", error);
      throw error;
    }
  },

  getDepartmentsStats: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Dashboard/departments`);
      return response.data;
    } catch (error) {
      console.error("Error fetching departments:", error);
      throw error;
    }
  },

  getAuditLogs: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Dashboard/audit-logs`);
      return response.data;
    } catch (error) {
      console.error("Error fetching audit logs:", error);
      throw error;
    }
  },

  getRevenueReport: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Dashboard/revenue`);
      return response.data;
    } catch (error) {
      console.error("Error fetching revenue report:", error);
      throw error;
    }
  },
};
