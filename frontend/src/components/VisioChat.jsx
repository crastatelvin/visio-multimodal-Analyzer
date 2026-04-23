import { useState } from "react";
import { askQuestion } from "../services/api";

export default function VisioChat({ jobId }) {
  const [messages, setMessages] = useState([{ role: "visio", text: "Ask me anything about this document." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const q = input.trim();
    if (!q || !jobId || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await askQuestion(jobId, q);
      setMessages((prev) => [...prev, { role: "visio", text: res.answer }]);
    } catch (_e) {
      setMessages((prev) => [...prev, { role: "visio", text: "Unable to answer right now." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card dashboard-card">
      <div className="mono-title">VISIO Q&A</div>
      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.role}`}>{m.text}</div>
        ))}
        {loading && <div className="chat-msg visio">Analyzing...</div>}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input className="chat-input" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
        <button className="upload-btn" onClick={send}>ASK</button>
      </div>
    </div>
  );
}
