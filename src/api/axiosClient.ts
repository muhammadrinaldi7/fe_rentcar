import axios from "axios";
import Cookies from "js-cookie";
// export const apiKey = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
// console.log(apiKey);
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    // apiKey: apiKey,
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosClient;
