import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  loginForm: LoginFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
  switchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginForm,
  onChange,
  onSubmit,
  loading,
  error = "",
  switchToSignup,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-3xl font-bold mb-6 text-emerald-600">로그인</h2>
      <form onSubmit={onSubmit} className="space-y-4 w-full">
        <Input
          label="이메일"
          type="email"
          name="email"
          value={loginForm.email}
          onChange={onChange}
          required
        />
        <Input
          label="비밀번호"
          type="password"
          name="password"
          value={loginForm.password}
          onChange={onChange}
          required
        />
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" loading={loading} className="mx-auto block">
          로그인
        </Button>
        <p className="text-sm text-center">
          계정이 없으신가요?{" "}
          <span
            className="text-emerald-600 cursor-pointer hover:underline"
            onClick={switchToSignup}
          >
            회원가입
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
