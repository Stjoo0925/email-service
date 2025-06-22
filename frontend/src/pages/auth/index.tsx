import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useRouter } from "next/router";
import LoginForm from "../../components/auth/LoginForm";
import SignupForm from "../../components/auth/SignupForm";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import FindIdForm from "../../components/auth/FindIdForm";
import Footer from "../../components/ui/Footer";
import { Send } from "lucide-react";

// Tailwind 기반 슬라이드 전환형 로그인/회원가입 단일 페이지
const AuthPage: React.FC = () => {
  type Mode =
    | "signin"
    | "signup"
    | "forgotPasswordForm"
    | "forgotPasswordDone"
    | "findIdForm"
    | "findIdDone";

  const [mode, setMode] = useState<Mode>("signin");
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

  // 비밀번호 재설정 폼 상태
  const [forgotForm, setForgotForm] = useState({ email: "" });
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  // 아이디 찾기 폼 상태
  const [findIdForm, setFindIdForm] = useState({ name: "", email: "" });
  const [findLoading, setFindLoading] = useState(false);
  const [findError, setFindError] = useState("");
  const [findSuccess, setFindSuccess] = useState("");

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleForgotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForgotForm({ ...forgotForm, [e.target.name]: e.target.value });
  };

  const handleFindIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindIdForm({ ...findIdForm, [e.target.name]: e.target.value });
  };

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axiosInstance.post("/api/auth/login", loginForm);
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
      await axiosInstance.post("/api/auth/signup", {
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

  const submitForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError("");
    setForgotSuccess("");
    try {
      await axiosInstance.post("/api/auth/reset-password/request", null, {
        params: { email: forgotForm.email },
      });
      setForgotSuccess(
        "재설정 이메일이 발송되었습니다. 이메일을 확인해주세요."
      );
      setMode("forgotPasswordDone");
    } catch (err: any) {
      setForgotError(err.response?.data?.message || "이메일 발송 실패");
    } finally {
      setForgotLoading(false);
    }
  };

  const submitFindId = async (e: React.FormEvent) => {
    e.preventDefault();
    setFindLoading(true);
    setFindError("");
    setFindSuccess("");
    try {
      await axiosInstance.post("/api/auth/find-id", findIdForm);
      setFindSuccess(
        "등록된 이메일로 아이디가 발송되었습니다. 이메일을 확인해주세요."
      );
      setMode("findIdDone");
    } catch (err: any) {
      setFindError(err.response?.data?.message || "아이디 찾기 실패");
    } finally {
      setFindLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-emerald-500 to-teal-400 px-4">
      <div className="flex items-center gap-2 text-5xl font-bold mb-6 text-white select-none">
        <Send className="w-12 h-12 mr-1" />
        Email Service
      </div>
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden h-[60%]">
        {/* 로그인 패널 */}
        <div
          className={`absolute inset-0 w-full h-full p-8 transition-transform duration-700 flex items-center justify-center ${
            mode === "signin" ? "translate-y-0" : "-translate-y-full"
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
            switchToFindId={() => {
              setMode("findIdForm");
            }}
            switchToForgotPassword={() => {
              setMode("forgotPasswordForm");
            }}
          />
        </div>

        {/* 회원가입 폼 */}
        <div
          className={`absolute inset-0 w-full h-full p-8 transition-transform duration-700 flex items-center justify-center ${
            mode === "signup" ? "translate-y-0" : "translate-y-full"
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

        {/* 비밀번호 재설정 폼 */}
        <div
          className={`absolute inset-0 w-full h-full p-8 transition-transform duration-700 flex items-center justify-center ${
            mode === "forgotPasswordForm" ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <ForgotPasswordForm
            formData={forgotForm}
            onChange={handleForgotChange}
            onSubmit={submitForgotPassword}
            loading={forgotLoading}
            error={forgotError}
            success={forgotSuccess}
            onBack={() => setMode("signin")}
          />
        </div>

        {/* 비밀번호 재설정 완료 */}
        <div
          className={`absolute inset-0 w-full h-full p-8 transition-transform duration-700 flex items-center justify-center ${
            mode === "forgotPasswordDone" ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-emerald-600 select-none">
              비밀번호 재설정 메일 전송 완료
            </h2>
            <p className="text-gray-700">{forgotSuccess}</p>
            <button
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded select-none"
              onClick={() => setMode("signin")}
            >
              돌아가기
            </button>
          </div>
        </div>

        {/* 아이디 찾기 폼 */}
        <div
          className={`absolute inset-0 w-full h-full p-8 transition-transform duration-700 flex items-center justify-center ${
            mode === "findIdForm" ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <FindIdForm
            formData={findIdForm}
            onChange={handleFindIdChange}
            onSubmit={submitFindId}
            loading={findLoading}
            error={findError}
            success={findSuccess}
            onBack={() => setMode("signin")}
          />
        </div>

        {/* 아이디 찾기 완료 */}
        <div
          className={`absolute inset-0 w-full h-full p-8 transition-transform duration-700 flex items-center justify-center ${
            mode === "findIdDone" ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-emerald-600 select-none">
              아이디 찾기 완료
            </h2>
            <p className="text-gray-700">{findSuccess}</p>
            <button
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded select-none"
              onClick={() => setMode("signin")}
            >
              로그인 하러가기
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
