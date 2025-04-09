import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { notify } from "../components/Notification";
import { fetchChatHistory } from "../services/api";

const SocketContext = createContext();

const socket = io("http://localhost:5000"); // Adjust URL if deployed

export const SocketProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch previous messages when component mounts
    fetchChatHistory().then((history) => {
      setMessages(history || []);
    });

    // Listen for incoming messages
    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);

      if (msg.username !== username) {
        notify(`${msg.username} sent a message!`);
      }
    });

    // Listen for typing event
    socket.on("userTyping", (data) => {
      setTypingUser(data.username);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        setTypingUser("");
      }, 1000);
    });

    return () => {
      socket.off("receive_message");
      socket.off("userTyping");
    };
  }, [username]);

  const sendMessage = (text) => {
    const msg = {
      username,
      text,
      time: new Date().toISOString(), // use consistent format
    };
    socket.emit("sendMessage", msg); // emit to server
    setMessages((prev) => [...prev, msg]); // update local state instantly
  };

  const emitTyping = () => {
    socket.emit("typing", { username });
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        messages,
        sendMessage,
        emitTyping,
        isTyping,
        typingUser,
        username,
        setUsername,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
