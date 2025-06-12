import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useRouter } from "next/router";

interface ResetPasswordFormData {
  email: string;
  token: string;
  newPassword: string;
}

interface ResetPasswordFormProps {
  formData: ResetPasswordFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
  success?: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  formData,
  onChange,
  onSubmit,
  loading,
  error = "",
  success = "",
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-3xl font-bold mb-6 text-teal-600 select-none">
        비밀번호 재설정
      </h2>
      <form onSubmit={onSubmit} className="space-y-4 w-full">
        <Input
          label="이메일"
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
          autoComplete="off"
        />
        <Input
          label="토큰"
          type="text"
          name="token"
          value={formData.token}
          onChange={onChange}
          required
          autoComplete="off"
        />
        <Input
          label="새 비밀번호"
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={onChange}
          required
          autoComplete="off"
        />
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-emerald-600" role="alert">
            {success}
          </p>
        )}
        <Button
          type="submit"
          loading={loading}
          className="block select-none"
          onClick={() => router.push("/auth")}
        >
          비밀번호 변경
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
