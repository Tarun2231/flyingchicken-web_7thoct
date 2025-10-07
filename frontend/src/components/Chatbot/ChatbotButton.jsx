import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-primary rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 animate-bounce-gentle"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </button>

      {/* Chat Window */}
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatbotButton;

