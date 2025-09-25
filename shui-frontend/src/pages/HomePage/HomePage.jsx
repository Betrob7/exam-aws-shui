import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Shui</h1>
      <p>Välkommen till meddelandeflödet</p>

      <div className="home-links">
        <Link to="/flow" className="home-btn">
          🚀 Gå till flödet
        </Link>
        <Link to="/login" className="home-btn">
          🔑 Logga in
        </Link>
        <Link to="/register" className="home-btn">
          ✍️ Registrera dig
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
