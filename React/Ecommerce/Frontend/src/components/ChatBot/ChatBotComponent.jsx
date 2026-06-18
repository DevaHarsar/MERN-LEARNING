import "./ChatBotComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function ChatBotComponent() {
  const [message, setMessage] = useState("");
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    console.log(message);

    setMessage("");
  };

  return (
    <div className="chatbot-container">
      {!chatbotOpen && (
        <button className="chatbot-toggle" onClick={() => setChatbotOpen(true)}>
          <FontAwesomeIcon icon={faRobot} />
        </button>
      )}

      {chatbotOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <FontAwesomeIcon icon={faRobot} />
              <span>Dev AI Assistant</span>
            </div>

            <button className="close-btn" onClick={() => setChatbotOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="chatbot-messages">
            <div className="bot-message">
              Hello! How can I help you today?
            </div>
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask about products..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatBotComponent;
