import axios from "axios";

const api = axios.create({
  // baseURL: "https://moodify-9aub.onrender.com/api/mood",
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function getMoodHistory() {
  const response = await api.get("/mood/history");
  return response.data;
}

export async function getMoodStats() {
  const response = await api.get("/mood/stats");
  return response.data;
}

export async function saveMood() {
  const response = await api.post("/mood/save");
  return response.data;
}
