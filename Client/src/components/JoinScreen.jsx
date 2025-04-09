import React, { useState } from "react";
import { notify } from './Notification'; // toast function

const JoinScreen = ({ onJoin }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      notify(`Welcome to WonderChat, ${username}! 👋`);
      onJoin(username);
    } else {
      notify("Please enter a username 😅");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-80 text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Chat</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition duration-200"
        >
          Join
        </button>
      </form>
    </div>
  );
};

export default JoinScreen;
