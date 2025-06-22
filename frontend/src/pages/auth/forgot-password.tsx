import React, { useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../services/axiosInstance";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import Footer from "../../components/ui/Footer";
import Button from "../../components/ui/Button";

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [mode, setMode] = useState<"form" | "done">("form");
  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await axiosInstance.post("/api/auth/reset-password/request", null, {
        params: { email: formData.email },
      });
      setSuccess("재설정 이메일이 발송되었습니다. 이메일을 확인해주세요.");
      setMode("done");
    } catch (err: any) {
      setError(err.response?.data?.message || "이메일 발송 실패");
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
        {/* 입력 폼 패널 */}
        <div
          className={`flex-1 h-full p-8 transition-transform duration-700 w-full flex items-center justify-center ${
            mode === "form"
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0 lg:-translate-y-full"
          }`}
        >
          <ForgotPasswordForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
          />
        </div>

        {/* 완료 패널 */}
        <div
          className={`flex-1 h-full p-8 transition-transform duration-700 w-full flex items-center justify-center ${
            mode === "done"
              ? "translate-x-0"
              : "translate-x-full lg:translate-x-0 lg:translate-y-full"
          }`}
        >
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-emerald-600 select-none">
              비밀번호 재설정 메일 전송 완료
            </h2>
            <p className="text-gray-700">{success}</p>
            <Button
              className="select-none"
              onClick={() => router.push("/auth")}
            >
              돌아가기
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
