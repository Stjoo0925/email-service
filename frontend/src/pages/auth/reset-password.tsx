import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import ResetPasswordForm from "../../components/auth/ResetPasswordForm";
import Footer from "../../components/ui/Footer";
import Button from "../../components/ui/Button";
import router from "next/router";

const ResetPasswordPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    token: "",
    newPassword: "",
  });
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
      await axiosInstance.post("/auth/reset-password", formData);
      setSuccess(
        "비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다."
      );
      setTimeout(() => (window.location.href = "/auth"), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "비밀번호 변경 실패");
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
        <div
          className={`flex-1 h-full p-8 transition-transform duration-700 w-full flex items-center justify-center `}
        >
          <ResetPasswordForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
          />
        </div>

        <Button className="select-none" onClick={() => router.push("/auth")}>
          돌아가기
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
