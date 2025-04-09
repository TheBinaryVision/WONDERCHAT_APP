import React, { useState } from "react";
import JoinScreen from "./components/JoinScreen";
import ChatRoom from "./components/ChatRoom";
import { SocketProvider } from "./context/SocketContext";

function App() {
  const [username, setUsername] = useState("");

  return (
    <SocketProvider>
      {username ? (
        <ChatRoom />
      ) : (
        <JoinScreen onJoin={setUsername} />
      )}
    </SocketProvider>
  );
}

export default App;
