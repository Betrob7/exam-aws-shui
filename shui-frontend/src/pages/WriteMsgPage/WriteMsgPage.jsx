import { useState } from "react";
import { postMessage } from "../../api/messages";
import { useAuthStore } from "../../stores/useAuthStore";
import { useAuthToken } from "../../hooks/useAuthToken";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import BackButton from "../../components/BackButton/BackButton";
import "./WriteMsgPage.css";

const WriteMsgPage = () => {
  const [text, setText] = useState("");
  const { user } = useAuthStore();
  const { token } = useAuthToken();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const response = await postMessage({ text, username: user?.username || "Gäst" }, token);

    if (response.id) {
      navigate("/flow");
    } else {
      console.error("Misslyckades att skapa meddelande:", response);
    }
  };

  return (
    <Layout>
      <div className="write-container">
        <BackButton />
        <h2>Nytt inlägg</h2>
        <form onSubmit={handleSubmit}>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <button type="submit">Posta</button>
        </form>
      </div>
    </Layout>
  );
};

export default WriteMsgPage;
