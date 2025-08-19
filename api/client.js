// api/client.js
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// 👇 디버그: 실제 baseURL 한번 출력
if (typeof window !== "undefined") {
  // 브라우저 콘솔에서 확인 가능
  console.log("[api] baseURL =", api.defaults.baseURL);
}

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    }
  }
  config.headers = { "Content-Type": "application/json", ...config.headers };
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "API Error";
    return Promise.reject(Object.assign(new Error(message), { status }));
  }
);
