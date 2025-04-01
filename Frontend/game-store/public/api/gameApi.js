import axios from "axios";

const API_KEY = "4e9a0d29dd61435eae33979f6a872943"; // Replace with your RAWG API key
const BASE_URL = "https://api.rawg.io/api";

export const fetchGames = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/games?key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};
