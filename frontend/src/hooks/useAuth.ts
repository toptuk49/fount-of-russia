import { useState, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("access"),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refresh"),
  );

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      if (!refreshToken) {
        console.error("No refresh token available");
        return null;
      }

      const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080";
      const response = await fetch(`${API_BASE}/api/auth/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access", data.access);
        setToken(data.access);
        return data.access;
      } else {
        console.error("Token refresh failed:", response.status);
        const errorData = await response.json().catch(() => ({}));
        console.error("Refresh error details:", errorData);
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("username");
    setToken(null);
    setRefreshToken(null);
  };

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const exp = payload.exp * 1000;
          if (Date.now() >= exp - 60000) {
            const newToken = await refreshAccessToken();
            if (newToken) setToken(newToken);
          }
        } catch (error) {
          console.error("Token check failed:", error);
        }
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 30000);
    return () => clearInterval(interval);
  }, [token, refreshToken]);

  return { token, refreshToken, refreshAccessToken, logout };
};
