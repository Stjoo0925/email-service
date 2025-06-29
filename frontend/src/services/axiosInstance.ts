// 공통 axios 인스턴스 설정 파일 (TypeScript)
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie } from "../utils/cookie";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080", // 환경변수 또는 기본값
  timeout: 5000, // 5초 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 (JWT 토큰 자동 첨부 등)
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== "undefined" ? getCookie("token") : null;
    console.log(
      "Axios 인터셉터 - 토큰:",
      token ? `${token.substring(0, 20)}...` : "null"
    );
    if (
      token &&
      token !== "undefined" &&
      token !== "null" &&
      token.trim() !== "" &&
      config.headers
    ) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Axios 인터셉터 - Authorization 헤더 설정됨");
    } else {
      console.log("Axios 인터셉터 - 토큰 없음 또는 유효하지 않음:", token);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 (에러 처리 등)
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // 필요시 에러 공통 처리
    return Promise.reject(error);
  }
);

export default axiosInstance;
