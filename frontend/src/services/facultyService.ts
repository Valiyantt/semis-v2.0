import api from './api';

export const facultyDashboardService = {
  getDashboard: async () => {
    try {
      const response = await api.get('FacultyDashboard');
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty dashboard:", error);
      throw error;
    }
  },

  getClasses: async () => {
    try {
      const response = await api.get('FacultyDashboard/classes');
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty classes:", error);
      throw error;
    }
  },

  getAssignments: async () => {
    try {
      const response = await api.get('FacultyDashboard/assignments');
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty assignments:", error);
      throw error;
    }
  },

  getPerformance: async () => {
    try {
      const response = await api.get('FacultyDashboard/performance');
      return response.data;
    } catch (error) {
      console.error("Error fetching faculty performance:", error);
      throw error;
    }
  },
};
