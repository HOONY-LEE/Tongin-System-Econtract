import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const refreshToken = cookies.get("refreshToken");

const API = axios.create({
  baseURL: "https://homenmove.net/v1/api/",
  // You can add other settings as well
});

// add interceptor
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to get a new access token using refreshToken
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          "https://homenmove.net/v1/api/auth/refresh",
          {
            refreshToken: refreshToken,
          },
          {
            withCredentials: true,
          }
        );
        const newAccessToken = response.data.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        cookies.set("refreshToken", response.data.data.refreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
