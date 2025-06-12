import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useRouter } from "next/router";

interface ForgotPasswordFormData {
  email: string;
}

interface ForgotPasswordFormProps {
  formData: ForgotPasswordFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
  success?: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
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
      <h2 className="text-3xl font-bold mb-6 text-emerald-600 select-none">
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
        <div className="flex justify-between gap-2">
          <Button type="submit" loading={loading} className="block select-none">
            이메일 발송
          </Button>
          <Button
            type="button"
            className="block select-none"
            onClick={() => router.push("/auth")}
          >
            돌아가기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
