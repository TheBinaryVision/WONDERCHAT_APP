// TypingIndicator.jsx
import React from "react";

const TypingIndicator = ({ username }) => {
  if (!username) return null;

  return (
    <div className="text-sm italic text-gray-500 mt-1 ml-2 animate-pulse">
      {username} is typing...
    </div>
  );
};

export default TypingIndicator;
