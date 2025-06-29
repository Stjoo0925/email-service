import React, { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import useAuthGuard from "../hooks/useAuthGuard";
import { deleteCookie } from "../utils/cookie";
import { useRouter } from "next/router";
import Button from "../components/ui/Button";
import { getCookie } from "../utils/cookie";

interface UserInfo {
  id: number;
  email: string;
  name: string;
  emailVerified: boolean;
  createdAt: string;
}

const ProfilePage: React.FC = () => {
  const ready = useAuthGuard();
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ready) return;

    // 토큰이 없으면 로그아웃 처리
    const token = getCookie("token");
    if (!token || token === "undefined") {
      console.log("토큰이 없어서 로그아웃 처리");
      handleLogout();
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        console.log("현재 쿠키에 저장된 토큰:", token);
        const { data } = await axiosInstance.get<UserInfo>("/api/auth/me");
        setUser(data);
      } catch (e) {
        // 토큰 만료 등 -> 로그아웃
        handleLogout();
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [ready]);

  const handleLogout = () => {
    deleteCookie("token");
    router.replace("/auth");
  };

  const clearBadToken = () => {
    deleteCookie("token");
    window.location.reload();
  };

  if (!ready) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <button
        onClick={clearBadToken}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        잘못된 토큰 정리
      </button>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">내 프로필</h1>
        {loading ? (
          <p className="text-center">불러오는 중...</p>
        ) : user ? (
          <div className="space-y-4">
            <div>
              <span className="font-semibold">이름: </span>
              {user.name}
            </div>
            <div>
              <span className="font-semibold">이메일: </span>
              {user.email}
            </div>
            <div>
              <span className="font-semibold">가입일: </span>
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div className="flex justify-center pt-4">
              <Button onClick={handleLogout}>로그아웃</Button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">
            사용자 정보를 가져올 수 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
