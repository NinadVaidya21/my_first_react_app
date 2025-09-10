import React, { useState } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! 🎬 Ask me anything about movies." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      setMessages([
        ...newMessages,
        { role: "bot", text: data.reply || "Hmm, I’m not sure 🤔" },
      ]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "bot", text: "⚠️ Error contacting server." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask about movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
