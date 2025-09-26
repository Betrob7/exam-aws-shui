import { useAuthStore } from "../../stores/useAuthStore";
import { useAuthToken } from "../../hooks/useAuthToken";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.css";

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const { setToken } = useAuthToken();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(""); // ta bort token från localStorage
    logout(); // nollställ global user
    navigate("/"); // tillbaka till homepage
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      🚪 Logga ut
    </button>
  );
};

export default LogoutButton;
