// src/pages/RegisterPage/RegisterPage.jsx
import { useState } from "react";
import { registerApi } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const response = await registerApi(formData);
    if (response.message?.includes("success")) {
      setMessage("Användaren skapad! Du kan nu logga in.");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setMessage(response.message || "Misslyckades att skapa användare.");
    }
  };

  return (
    <Layout>
      <h2>Registrera</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Användarnamn" value={formData.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="E-post" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Lösenord" value={formData.password} onChange={handleChange} />
        <button type="submit">Registrera</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Har du redan konto? <Link to="/login">Logga in</Link>
      </p>
    </Layout>
  );
};

export default RegisterPage;
