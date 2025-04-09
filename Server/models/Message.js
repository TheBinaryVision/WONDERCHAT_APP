import React from "react";

const Message = ({ message, currentUser }) => {
  // Safe check to prevent error
  if (!message || typeof message !== 'object') return null;

  const { username = "Unknown", text = "", time } = message;

  const isOwnMessage = username === currentUser;

  return (
    <div className={`message ${isOwnMessage ? "own" : ""}`}>
      <p>
        <strong>{username}:</strong> {text}
      </p>
      <small>{new Date(time).toLocaleTimeString()}</small>
    </div>
  );
};

export default Message;
