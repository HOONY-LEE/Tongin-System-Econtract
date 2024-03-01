import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
const refreshToken = cookies.get("refreshToken");

// 로그아웃
const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("loginUser");
  window.location.href = "/login";
};

const API = axios.create({
  baseURL: "https://homenmove.net/v1/api/",
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
      } catch (error: any) {
        // 리프레쉬 토큰 만료 시 로그아웃 처리
        if (error.response.status === 401) {
          alert("토큰이 만료되어 로그아웃됩니다. 다시 로그인해주세요.");
          logout();
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
