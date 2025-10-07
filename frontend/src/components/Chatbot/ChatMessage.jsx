import React from "react";
import { Bot, User } from "lucide-react";

const ChatMessage = ({ message }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex ${
        message.isBot ? "justify-start" : "justify-end"
      } space-x-2`}
    >
      {message.isBot && (
        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-orange-600" />
        </div>
      )}

      <div
        className={`max-w-xs lg:max-w-md ${
          message.isBot ? "bg-gray-100" : "bg-orange-500 text-white"
        } rounded-2xl px-4 py-2`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        <p
          className={`text-xs mt-1 ${
            message.isBot ? "text-gray-500" : "text-orange-100"
          }`}
        >
          {formatTime(message.timestamp)}
        </p>
      </div>

      {!message.isBot && (
        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;

