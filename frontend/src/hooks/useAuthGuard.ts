import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";

/**
 * 클라이언트 측 인증 가드 훅
 * - 토큰이 없을 때 보호된 경로에서 로그인 페이지로 리다이렉트
 * - 토큰이 있을 때 로그인/회원가입 페이지 접근 시 루트로 리다이렉트
 * @returns ready 플래그 (가드 완료 여부)
 */
const useAuthGuard = () => {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Next.js 서버사이드 렌더링 시 window 접근 방지
    if (typeof window === "undefined") return;

    const token = getCookie("token");

    // 인증이 필요 없는 퍼블릭 경로 (통합 auth 페이지 포함)
    const publicPaths = ["/auth"];
    const isPublic = publicPaths.some((p) => router.pathname.startsWith(p));

    if (!token && !isPublic) {
      // 미인증 상태로 보호된 경로 접근 시 로그인으로 이동
      router.replace("/auth");
    } else if (token && isPublic) {
      // 이미 인증된 사용자가 퍼블릭 경로 접근 시 홈으로 이동
      router.replace("/");
    }

    // 리다이렉션 호출 후에도 컴포넌트 그리기 위해 ready 표시
    setReady(true);
  }, [router]);

  return ready;
};

export default useAuthGuard;
