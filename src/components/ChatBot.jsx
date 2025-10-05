import React, { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const res = await fetch(process.env.REACT_APP_N8N_CHATBOT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_N8N_API_KEY}`
      },
      body: JSON.stringify({
        message: input,
        sessionId: "s1",      // más adelante lo puedes hacer dinámico
        paperId: "paper-123"  // id del paper actual
      })
    });
    const data = await res.json();
    setMessages([...messages, { role: "user", content: input }, { role: "bot", content: data.reply }]);
    setInput("");
  };

  return (
    <div className="chatbot">
      <h2>Asistente de Papers</h2>
      <div className="chat-window">
        {messages.map((m, i) => (
          <p key={i} className={m.role}>{m.content}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu pregunta..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

export default Chatbot;

