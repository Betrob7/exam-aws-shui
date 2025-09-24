import React, { useState } from "react";
import "./LoginForm.css";
import { loginApi } from "../api/auth";
import { useAuthStore } from "../stores/useAuthStore";
import { useAuthToken } from "../hooks/useAuthToken";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuthToken();
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginApi({ username, password });
    if (res.token && res.user) {
      setToken(res.token); // sparar token i localStorage
      login(res.user); // sparar user i global Zustand-store
    } else {
      alert(res); // felmeddelande
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
