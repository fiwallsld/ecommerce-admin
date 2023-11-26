import axios from "axios";
import queryString from "query-string";
import RootAPI from "./RootAPI";

const axiosClient = axios.create({
  baseURL: RootAPI,
  withCredentials: "include",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("admin-token");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
