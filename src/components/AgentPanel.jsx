import { useState } from "react";

function AgentPanel({ mode, latticeType, vectors, onApply }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [error, setError] = useState("");

  async function sendMessage() {
    if (!message.trim() || loading) return;
    setLoading(true);
    setError("");
    setResponseText("");

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          state: { mode, latticeType, vectors },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Agent request failed");
      }

      if (data.clarification) {
        setResponseText(data.clarification);
      } else {
        onApply(data);
        setResponseText(data.explanation || "Simulator updated.");
      }

      setMessage("");
    } catch (err) {
      setError(err.message || "Could not connect to the agent server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="agent-card">
      <div className="card-title">AI LATTICE AGENT</div>
      <div className="agent-description">
        Tell the agent what lattice or vector change you want.
      </div>

      <textarea
        className="agent-input agent-textarea"
        rows="3"
        value={message}
        placeholder={'Try: "Create a BCC lattice"'}
        disabled={loading}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
      />

      <button
        className="agent-send-btn"
        onClick={sendMessage}
        disabled={loading || !message.trim()}
      >
        {loading ? "THINKING..." : "ASK AGENT"}
      </button>

      {responseText && <div className="agent-response">{responseText}</div>}
      {error && <div className="agent-error">{error}</div>}
    </div>
  );
}

export default AgentPanel;
