import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketContext";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import DarkModeToggle from "./DarkModeToggle";

const ChatRoom = () => {
  const {
    messages,
    sendMessage,
    emitTyping,
    isTyping,
    typingUser,
    username,
    setUsername,
  } = useSocket();

  const [text, setText] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      sendMessage(text);
      setText("");
    }
  };

  const handleTyping = () => {
    emitTyping();
  };

  // If no username yet, prompt user to enter name
  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <h2 className="text-2xl font-bold mb-4">Enter your name</h2>
        <input
          type="text"
          className="p-2 rounded-md border border-gray-300 dark:bg-gray-800 dark:border-gray-600"
          placeholder="Your name"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setUsername(e.target.value.trim());
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <div className="flex justify-between items-center p-4 shadow-md bg-gray-100 dark:bg-gray-800">
        <h1 className="text-xl font-bold">Welcome, {username}</h1>
        <DarkModeToggle />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            currentUser={username}
          />
        ))}
        {isTyping && <TypingIndicator username={typingUser} />}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-600"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
