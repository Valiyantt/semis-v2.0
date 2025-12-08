import axios from "axios";

const API_BASE_URL = "http://localhost:5157/backend";

export const facultyDashboardService = {
  getDashboard: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/FacultyDashboard`);
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty dashboard:", error);
      throw error;
    }
  },

  getClasses: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/FacultyDashboard/classes`);
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty classes:", error);
      throw error;
    }
  },

  getAssignments: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/FacultyDashboard/assignments`);
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty assignments:", error);
      throw error;
    }
  },

  getPerformance: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/FacultyDashboard/performance`);
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty performance:", error);
      throw error;
    }
  },
};
