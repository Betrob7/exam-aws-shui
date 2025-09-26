import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./HomePage.css";

const HomePage = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default HomePage;
