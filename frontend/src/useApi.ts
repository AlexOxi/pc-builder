import { useMemo } from "react";

export function useApi() {
  const baseUrl = useMemo(() => {
    const url = import.meta.env.VITE_API_URL || "http://localhost:3333";
    return url.replace(/\/+$/, "");
  }, []);

  const callApi = async (endpoint: string, options?: RequestInit) => {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Request failed: ${res.status}`);
    }

    return res.json();
  };

  return { baseUrl, callApi };
}

