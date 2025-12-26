import api from './api';

export const studentDashboardService = {
  getDashboard: async () => {
    try {
      const response = await api.get('StudentDashboard');
      return response.data;
    } catch (error) {
      console.error("Error fetching student dashboard:", error);
      throw error;
    }
  },

  getCourses: async () => {
    try {
      const response = await api.get('StudentDashboard/courses');
      return response.data;
    } catch (error) {
      console.error("Error fetching student courses:", error);
      throw error;
    }
  },

  getAssignments: async () => {
    try {
      const response = await api.get('StudentDashboard/assignments');
      return response.data;
    } catch (error) {
      console.error("Error fetching student assignments:", error);
      throw error;
    }
  },

  getGrades: async () => {
    try {
      const response = await api.get('StudentDashboard/grades');
      return response.data;
    } catch (error) {
      console.error("Error fetching student grades:", error);
      throw error;
    }
  },

  getSchedule: async () => {
    try {
      const response = await api.get('StudentDashboard/schedule');
      return response.data;
    } catch (error) {
      console.error("Error fetching student schedule:", error);
      throw error;
    }
  },
};
