import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useRouter } from "next/router";
import LoginForm from "../../components/auth/LoginForm";
import SignupForm from "../../components/auth/SignupForm";
import Footer from "../../components/ui/Footer";

// Tailwind 기반 슬라이드 전환형 로그인/회원가입 단일 페이지
const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const router = useRouter();

  // 공통 상태
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 로그인 폼
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  // 회원가입 폼
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosInstance.post("/auth/login", loginForm);
      // 쿠키 저장
      document.cookie = `token=${data.token}; path=/; SameSite=Strict; secure`;
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  const submitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axiosInstance.post("/auth/signup", {
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password,
      });
      // 회원가입 후 자동 로그인 유도
      setMode("signin");
    } catch (err: any) {
      setError(err.response?.data?.message || "회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-emerald-500 to-teal-400 px-4">
      <div className="text-5xl font-bold mb-6 text-white select-none">
        Email Service
      </div>
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden lg:flex h-[60%]">
        {/* 슬라이드 패널 */}
        <div
          className={`flex-1 h-full p-8 transition-transform duration-700 lg:w-1/2 flex items-center justify-center ${
            mode === "signin"
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0 lg:-translate-y-full"
          }`}
        >
          <LoginForm
            loginForm={loginForm}
            onChange={handleLoginChange}
            onSubmit={submitLogin}
            loading={loading}
            error={mode === "signin" ? error : ""}
            switchToSignup={() => {
              setError("");
              setMode("signup");
            }}
          />
        </div>

        {/* 회원가입 폼 */}
        <div
          className={`flex-1 h-full p-8 transition-transform duration-700 lg:w-1/2 flex items-center justify-center ${
            mode === "signup"
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0 lg:translate-y-full"
          }`}
        >
          <SignupForm
            signupForm={signupForm}
            onChange={handleSignupChange}
            onSubmit={submitSignup}
            loading={loading}
            error={mode === "signup" ? error : ""}
            switchToSignin={() => {
              setError("");
              setMode("signin");
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
