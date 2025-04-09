// Message.jsx
import React from "react";
import { formatTime } from "../utils/timeFormatter";
import avatars from "../utils/avatars";

const Message = ({ message, currentUser }) => {
  const isOwnMessage = message.username === currentUser;
  const avatar = avatars[message.username?.charAt(0).toUpperCase()] || avatars["default"];

  return (
    <div className={`flex items-start gap-2 my-2 ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      {!isOwnMessage && (
        <img
          src={avatar}
          alt="avatar"
          className="w-8 h-8 rounded-full border shadow"
        />
      )}

      <div
        className={`max-w-xs md:max-w-md p-3 rounded-xl shadow-md text-sm ${
          isOwnMessage
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        {!isOwnMessage && <p className="font-semibold">{message.username}</p>}
        <p className="break-words">{message.text}</p>
        <p className="text-[10px] text-right mt-1 text-gray-600">{formatTime(message.time)}</p>
      </div>
    </div>
  );
};

export default Message;
