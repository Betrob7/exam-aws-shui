import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import "./UserMessagesPage.css";

const BASE_URL = "https://oatdlmvgcb.execute-api.eu-north-1.amazonaws.com/api/messages";

const UserMessagesPage = () => {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${username}`);
        setMessages(response.data);
      } catch (err) {
        console.error("Kunde inte hämta användarens meddelanden:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [username]);

  if (loading) return <p>Laddar...</p>;

  return (
    <Layout>
      <div className="user-messages-container">
        <h2>Meddelanden från {username}</h2>
        <Link to="/flow">⬅️ Tillbaka till flödet</Link>
        {messages.length === 0 ? (
          <p>Inga meddelanden ännu.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="user-message-card">
              <p>{msg.text}</p>
              <small>{new Date(msg.createdAt).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default UserMessagesPage;
