import "./Loading.css";

const Loading = ({ text = "Laddar..." }) => {
  return (
    <div className="loading">
      <div className="spinner" />
      <p>{text}</p>
    </div>
  );
};

export default Loading;
