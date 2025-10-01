import Layout from "../../components/Layout/Layout";
import "./Loading.css";

const Loading = ({ text = "Laddar..." }) => {
  return (
    <Layout>
      <div className="loading">
        <div className="spinner" />
        <p>{text}</p>
      </div>
    </Layout>
  );
};

export default Loading;
