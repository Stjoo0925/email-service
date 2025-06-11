import "../assets/styles/index.css";
import type { AppProps } from "next/app";
import useAuthGuard from "../hooks/useAuthGuard";

export default function App({ Component, pageProps }: AppProps) {
  const isReady = useAuthGuard();

  if (!isReady) return null; // 로딩 중이거나 리다이렉트 처리 중

  return <Component {...pageProps} />;
}
