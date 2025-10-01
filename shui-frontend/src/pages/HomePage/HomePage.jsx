import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./HomePage.css";

const HomePage = () => {
  return (
    <Layout>
      <motion.div className="homepage-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h1>Välkommen till Shui!</h1>
        <p>Logga in eller fortsätt som gäst för att se flödet.</p>

        <div className="homepage-actions">
          <Link to="/login" className="btn">
            Logga in
          </Link>
          <Link to="/register" className="btn">
            Registrera
          </Link>
          <Link to="/flow" className="btn btn-ghost">
            Fortsätt som gäst
          </Link>
        </div>
      </motion.div>
    </Layout>
  );
};

export default HomePage;
