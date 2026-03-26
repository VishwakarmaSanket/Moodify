import axios from "axios";

const api = axios.create({
  baseURL: "https://moodify-9aub.onrender.com/api/mood",
  withCredentials: true,
});

export async function getMoodHistory() {
  const response = await api.get("/history");
  return response.data;
}

export async function getMoodStats() {
  const response = await api.get("/stats");
  return response.data;
}

export async function saveMood() {
  const response = await api.post("/save");
  return response.data;
}
