import axios from "axios";

// Konfigurasi instance Axios
const api = axios.create({
  baseURL: "http://localhost:8000/api", // Ganti dengan URL backend Anda
});

// Ambil semua pesan
export const getMessages = async () => {
  const response = await api.get("/messages");
  return response.data;
};

// Tambahkan pesan baru
export const sendMessage = async (content: string, user_id: number) => {
  const response = await api.post("/messages", { content, user_id });
  return response.data;
};

export default api;
