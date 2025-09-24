import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore.js";
import { useAuthToken } from "../../hooks/useAuthToken.js";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { clearToken } = useAuthToken();

  const handleLogout = () => {
    logout();
    clearToken();
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/writemsg">Write Message</Link>
      <Link to="/flow">Flow</Link>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
