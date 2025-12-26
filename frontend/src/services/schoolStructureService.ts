import api from './api';

export const schoolStructureService = {
  getSchoolLevels: async () => {
    try {
      const response = await api.get('SchoolStructure/levels');
      return response.data;
    } catch (error) {
      console.error("Error fetching school levels:", error);
      throw error;
    }
  },

  getGradesByLevel: async (levelId: number) => {
    try {
      const response = await api.get(`SchoolStructure/grades/${levelId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching grades:", error);
      throw error;
    }
  },

  getCompleteStructure: async () => {
    try {
      const response = await api.get('SchoolStructure/all');
      return response.data;
    } catch (error) {
      console.error("Error fetching school structure:", error);
      throw error;
    }
  },
};
