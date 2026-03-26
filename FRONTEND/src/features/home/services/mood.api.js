import axios from "axios";

// Using relative URLs since they're on the same domain
const api = axios.create({
  baseURL: "/api/mood",
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
