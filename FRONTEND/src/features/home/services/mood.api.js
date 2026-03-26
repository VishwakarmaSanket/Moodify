import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/mood",
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

export async function saveMood(mood) {
  const response = await api.post("/save", { mood });
  return response.data;
}
