// src/pages/LoginPage/LoginPage.jsx
import { useState } from "react";
import { loginApi } from "../../api/auth";
import { useAuthToken } from "../../hooks/useAuthToken";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useAuthToken();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const response = await loginApi({ username, password });

    if (response.token) {
      setToken(response.token);
      login({ username });
      navigate("/flow");
    } else {
      setError(response.message);
    }
  };

  return (
    <Layout>
      <h2>Logga in</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <input type="text" placeholder="Användarnamn" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Logga in</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Har du inget konto? <Link to="/register">Registrera dig!</Link>
      </p>
      <p>
        Eller <Link to="/flow">fortsätt som gäst</Link>
      </p>
    </Layout>
  );
};

export default LoginPage;
