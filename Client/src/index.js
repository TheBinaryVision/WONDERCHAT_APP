import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SocketProvider } from "./context/SocketContext";
import "./index.css"; // keep your tailwind styles linked

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketProvider>
    <App />
  </SocketProvider>
);
