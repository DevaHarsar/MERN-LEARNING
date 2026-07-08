import "./ChatBotComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

function ChatBotComponent() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! How can I help you today?",
    },
  ]);

  const sendMessage = async (userMessage) => {
    const token = localStorage.getItem("token");

    if(token === null) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Please log in to use the chat feature."
        }
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    try {
      // `${import.meta.env.VITE_CHATBOT_API}/chat`
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          token: token,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.response.assistantMessage,
          products: data.response.products || [],
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong.",
        },
      ]);
    }
  };
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    await sendMessage(message);
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
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user" ? "user-message" : "bot-message"
                }
              >
                <p>{msg.text}</p>

                {msg.products && msg.products.length > 0 && (
                  <div className="chat-products">
                    {msg.products.map((product) => (
                      <div className="chat-product-card" key={product._id}>
                        <img src={product.images[0]} alt={product.title} />

                        <h4>{product.title}</h4>

                        <p>₹{product.price}</p>

                        <p>Stock : {product.stock ? "In Stock" : "Out of Stock"}</p>

                        <button onClick={() => navigate(`/products/${product._id}`)}>
                          View Product
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
