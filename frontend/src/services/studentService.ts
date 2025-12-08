import axios from "axios";

const API_BASE_URL = "http://localhost:5157/backend";

export const studentDashboardService = {
  getDashboard: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/StudentDashboard`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student dashboard:", error);
      throw error;
    }
  },

  getCourses: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/StudentDashboard/courses`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student courses:", error);
      throw error;
    }
  },

  getAssignments: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/StudentDashboard/assignments`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student assignments:", error);
      throw error;
    }
  },

  getGrades: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/StudentDashboard/grades`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student grades:", error);
      throw error;
    }
  },

  getSchedule: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/StudentDashboard/schedule`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student schedule:", error);
      throw error;
    }
  },
};
