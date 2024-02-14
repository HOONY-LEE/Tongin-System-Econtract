import axios from "axios";

const API = axios.create({
  baseURL: "https://homenmove.net/v1/api/",
  // 다른 설정들도 추가할 수 있음
});

// Interceptor 추가
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

export default API;
