export const setCookie = (
  name: string,
  value: string,
  days = 7,
  options: { path?: string; secure?: boolean; sameSite?: "Strict" | "Lax" | "None" } = {}
) => {
  const { path = "/", secure = true, sameSite = "Strict" } = options;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path};$${
    secure ? " secure;" : ""
  } SameSite=${sameSite}`.replace(";$", "");
};

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
};

export const deleteCookie = (name: string, path = "/") => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
};
