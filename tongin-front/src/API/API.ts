import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
const refreshToken = cookies.get("refreshToken");

const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("loginUser");
  window.location.href = "/login";
};

const API = axios.create({
  baseURL: "https://homenmove.net/v1/api/",
});

API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("Response error:", error);
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(
          "https://homenmove.net/v1/api/auth/refresh",
          { refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        cookies.set("refreshToken", newRefreshToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        console.log("Access token refreshed");

        return axios(originalRequest);
      } catch (refreshError: any) {
        console.error("Token refresh failed:", refreshError);

        if (refreshError.response.status === 400) {
          alert("토큰이 만료되어 로그아웃됩니다. 다시 로그인해주세요.");
          logout();
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
