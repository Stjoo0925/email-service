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
  switchToFindId: () => void;
  switchToForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  loginForm,
  onChange,
  onSubmit,
  loading,
  error = "",
  switchToSignup,
  switchToFindId,
  switchToForgotPassword,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-3xl font-bold mb-6 text-emerald-600 select-none">
        로그인
      </h2>
      <form onSubmit={onSubmit} className="space-y-4 w-full select-none">
        <Input
          label="이메일"
          type="email"
          id="login-email"
          name="email"
          value={loginForm.email}
          onChange={onChange}
          required
          autoComplete="off"
          placeholder="example@email.com"
        />
        <Input
          label="비밀번호"
          type="password"
          id="login-password"
          name="password"
          value={loginForm.password}
          onChange={onChange}
          required
          autoComplete="off"
          placeholder="********"
        />
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        <div className="flex justify-between gap-4">
          <Button type="submit" loading={loading} className="select-none">
            로그인
          </Button>
          <div className="flex gap-2">
            <Button
              type="button"
              className="text-sm select-none shadow-none"
              onClick={switchToFindId}
            >
              아이디 찾기
            </Button>
            <Button
              type="button"
              className="text-sm select-none shadow-none"
              onClick={switchToForgotPassword}
            >
              비밀번호 찾기
            </Button>
          </div>
        </div>
        <p className="text-sm text-center select-none">
          계정이 없으신가요?{" "}
          <span
            className="text-emerald-600 cursor-pointer hover:underline select-none"
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
