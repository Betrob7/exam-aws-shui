import { useState, useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { useAuthToken } from "../../hooks/useAuthToken";
import { useNavigate, Link } from "react-router-dom";
import { getMessages, deleteMessage, updateMessage } from "../../api/messages";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import Layout from "../../components/Layout/Layout";
import "./FlowPage.css";

const FlowPage = () => {
  const user = useAuthStore((state) => state.user);
  const { token } = useAuthToken();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(token);
        if (Array.isArray(data)) {
          // sortera på datum, senaste först
          const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setMessages(sorted);
        } else {
          console.error("Felaktigt svar från API:", data);
        }
      } catch (err) {
        console.error("Kunde inte hämta meddelanden:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token]);

  const handleDelete = async (id) => {
    const res = await deleteMessage(id, token);
    if (res.success) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } else {
      alert("Misslyckades att radera: " + res);
    }
  };

  const handleEditStart = (msg) => {
    setEditingId(msg.id);
    setEditText(msg.text);
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleEditSave = async (id) => {
    const res = await updateMessage(id, { text: editText }, token);
    if (res.id) {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, text: res.text } : m)));
      setEditingId(null);
      setEditText("");
    } else {
      alert("Misslyckades att uppdatera: " + res);
    }
  };

  if (loading) return <p>Laddar meddelanden...</p>;

  return (
    <Layout>
      <div className="flow-header">
        <h2>Flow</h2>
        <p>
          Inloggad som: <strong>{user?.username || "Gäst"}</strong>
        </p>
      </div>

      {messages.map((msg) => (
        <div key={msg.id} className="message-card">
          {editingId === msg.id ? (
            <>
              <input type="text" value={editText} onChange={(e) => setEditText(e.target.value)} />
              <button onClick={() => handleEditSave(msg.id)}>💾 Spara</button>
              <button onClick={handleEditCancel}>❌ Avbryt</button>
            </>
          ) : (
            <>
              <p>{msg.text}</p>
              <small>{new Date(msg.createdAt).toLocaleString()}</small>
              <strong>
                — <Link to={`/user/${msg.username}`}>{msg.username}</Link>
              </strong>
            </>
          )}

          {user?.username === msg.username && editingId !== msg.id && (
            <div className="actions">
              <button onClick={() => handleEditStart(msg)}>✏️ Edit</button>
              <button onClick={() => handleDelete(msg.id)}>🗑️ Delete</button>
            </div>
          )}
        </div>
      ))}

      <div className="write-btn-container">
        <button className="write-btn" onClick={() => navigate("/writemsg")}>
          ✍️
        </button>
      </div>

      {/* Logout-knapp längst ner */}
      {user && (
        <div className="logout-wrapper">
          <LogoutButton />
        </div>
      )}
    </Layout>
  );
};

export default FlowPage;
