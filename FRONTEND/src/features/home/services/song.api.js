import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export async function getSongs({ mood }) {
  const response = await api.get("/songs", { params: { song: mood } });
  return response.data;
}

export async function uploadSong(formData) {
  const response = await api.post("/songs", formData);
  return response.data;
}
