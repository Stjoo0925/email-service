import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useRouter } from "next/router";

interface FindIdFormData {
  name: string;
  email: string;
}

interface FindIdFormProps {
  formData: FindIdFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error?: string;
  success?: string;
  onBack?: () => void;
}

const FindIdForm: React.FC<FindIdFormProps> = ({
  formData,
  onChange,
  onSubmit,
  loading,
  error = "",
  success = "",
  onBack,
}) => {
  const router = useRouter();
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/auth");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h2 className="text-3xl font-bold mb-6 text-emerald-600 select-none">
        아이디 찾기
      </h2>
      <form onSubmit={onSubmit} className="space-y-4 w-full">
        <Input
          label="이름"
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          required
          autoComplete="off"
        />
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
            아이디 찾기
          </Button>
          <Button
            type="button"
            className="block select-none"
            onClick={handleBack}
          >
            돌아가기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FindIdForm;
