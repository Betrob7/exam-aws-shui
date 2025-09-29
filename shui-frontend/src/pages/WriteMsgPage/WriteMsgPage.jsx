import { useState } from "react";
import { postMessage } from "../../api/messages";
import { useAuthStore } from "../../stores/useAuthStore";
import { useAuthToken } from "../../hooks/useAuthToken";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./WriteMsgPage.css";

const WriteMsgPage = () => {
  const [text, setText] = useState("");
  const { user } = useAuthStore(); // hämtar username
  const { token } = useAuthToken(); // hämtar JWT
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const response = await postMessage({ text, username: user?.username || "Gäst" }, token);

    if (response.id) {
      navigate("/flow"); // till flödet efter post
    } else {
      console.error("Misslyckades att skapa meddelande:", response);
    }
  };

  return (
    <Layout>
      <div className="write-container">
        <button
          className="back-btn"
          type="button"
          onClick={() => navigate(-1)} // eller navigate("/flow")
        >
          <span className="back-icon">⮌</span>
        </button>
        <h2>Skriv ett nytt meddelande</h2>
        <form onSubmit={handleSubmit}>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Skriv något..." />
          <button type="submit">Posta</button>
        </form>
      </div>
    </Layout>
  );
};

export default WriteMsgPage;
