import axios from "axios";

// Create an axios instance with a base URL (adjust as needed)
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// api.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("KEYCLOAK_IDENTITY");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default api;
