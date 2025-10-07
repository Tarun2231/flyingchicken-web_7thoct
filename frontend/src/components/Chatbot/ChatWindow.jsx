import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User } from "lucide-react";
import ChatMessage from "./ChatMessage";
import api from "../../utils/api";

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi 👋, I'm your Flying Chicken Assistant! How can I help you?",
      isBot: true,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus input when chat opens
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      isBot: false,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await api.post("/chat", {
        message: userMessage.text,
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.data.message,
        isBot: true,
        timestamp: response.data.data.timestamp,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try again later or contact our support team for immediate assistance. 😊",
        isBot: true,
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-end z-50">
      <div className="bg-white rounded-t-2xl shadow-2xl w-full max-w-md h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-primary rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold">
                Flying Chicken Assistant
              </h3>
              <p className="text-orange-100 text-sm">Online now</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-orange-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-center space-x-2 text-gray-500">
              <Bot className="w-5 h-5" />
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

