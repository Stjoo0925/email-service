import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  signupForm: SignupFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
  switchToSignin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({
  signupForm,
  onChange,
  onSubmit,
  loading,
  error = "",
  switchToSignin,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-3xl font-bold mb-6 text-teal-600 select-none">
        회원가입
      </h2>
      <form onSubmit={onSubmit} className="space-y-4 w-full">
        <Input
          label="이름"
          id="signup-name"
          name="name"
          value={signupForm.name}
          onChange={onChange}
          required
          autoComplete="off"
          placeholder="홍길동"
        />
        <Input
          label="이메일"
          id="signup-email"
          type="email"
          name="email"
          value={signupForm.email}
          onChange={onChange}
          required
          autoComplete="off"
          placeholder="example@email.com"
        />
        <Input
          label="비밀번호"
          id="signup-password"
          type="password"
          name="password"
          value={signupForm.password}
          onChange={onChange}
          required
          autoComplete="off"
          placeholder="********"
        />
        <Input
          label="비밀번호 확인"
          id="signup-confirmPassword"
          type="password"
          name="confirmPassword"
          value={signupForm.confirmPassword}
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
        <Button
          type="submit"
          loading={loading}
          className="mx-auto block select-none"
        >
          회원가입
        </Button>
        <p className="text-sm text-center select-none">
          이미 계정이 있으신가요?{" "}
          <span
            className="text-teal-600 cursor-pointer hover:underline select-none"
            onClick={switchToSignin}
          >
            로그인
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
