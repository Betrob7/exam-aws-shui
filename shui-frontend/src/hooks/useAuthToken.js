import { useState, useEffect } from "react";

export const useAuthToken = (key = "authToken") => {
  const [token, setToken] = useState(() => localStorage.getItem(key) || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem(key, token);
    } else {
      localStorage.removeItem(key);
    }
  }, [token, key]);

  const clearToken = () => setToken("");

  return { token, setToken, clearToken };
};
