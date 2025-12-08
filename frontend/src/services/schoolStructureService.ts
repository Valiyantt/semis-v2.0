import axios from "axios";

const API_BASE_URL = "http://localhost:5157/backend";

export const schoolStructureService = {
  getSchoolLevels: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/SchoolStructure/levels`);
      return response.data;
    } catch (error) {
      console.error("Error fetching school levels:", error);
      throw error;
    }
  },

  getGradesByLevel: async (levelId: number) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/SchoolStructure/grades/${levelId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching grades:", error);
      throw error;
    }
  },

  getCompleteStructure: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/SchoolStructure/all`);
      return response.data;
    } catch (error) {
      console.error("Error fetching school structure:", error);
      throw error;
    }
  },
};
