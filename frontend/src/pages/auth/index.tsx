import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import axiosInstance from "../../services/axiosInstance";
import { useRouter } from "next/router";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-500 to-teal-400 px-4">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden lg:flex">
        {/* 슬라이드 패널 */}
        <div
          className={`flex-1 p-8 transition-transform duration-700 lg:w-1/2 ${
            mode === "signin"
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0 lg:-translate-y-full"
          }`}
        >
          {/* 로그인 폼 */}
          <h2 className="text-3xl font-bold mb-6 text-emerald-600">로그인</h2>
          <form onSubmit={submitLogin} className="space-y-4">
            <Input
              label="이메일"
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
            />
            <Input
              label="비밀번호"
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />
            {error && mode === "signin" && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" loading={loading}>
              로그인
            </Button>
            <p className="text-sm text-center">
              계정이 없으신가요?{" "}
              <span
                className="text-emerald-600 cursor-pointer hover:underline"
                onClick={() => {
                  setError("");
                  setMode("signup");
                }}
              >
                회원가입
              </span>
            </p>
          </form>
        </div>

        {/* 회원가입 폼 */}
        <div
          className={`flex-1 p-8 transition-transform duration-700 lg:w-1/2 ${
            mode === "signup"
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0 lg:translate-y-full"
          }`}
        >
          <h2 className="text-3xl font-bold mb-6 text-teal-600">회원가입</h2>
          <form onSubmit={submitSignup} className="space-y-4">
            <Input
              label="이름"
              name="name"
              value={signupForm.name}
              onChange={handleSignupChange}
              required
            />
            <Input
              label="이메일"
              type="email"
              name="email"
              value={signupForm.email}
              onChange={handleSignupChange}
              required
            />
            <Input
              label="비밀번호"
              type="password"
              name="password"
              value={signupForm.password}
              onChange={handleSignupChange}
              required
            />
            <Input
              label="비밀번호 확인"
              type="password"
              name="confirmPassword"
              value={signupForm.confirmPassword}
              onChange={handleSignupChange}
              required
            />
            {error && mode === "signup" && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button type="submit" loading={loading}>
              회원가입
            </Button>
            <p className="text-sm text-center">
              이미 계정이 있으신가요?{" "}
              <span
                className="text-teal-600 cursor-pointer hover:underline"
                onClick={() => {
                  setError("");
                  setMode("signin");
                }}
              >
                로그인
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
