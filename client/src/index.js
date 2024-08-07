import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CSS/index.css";
import "./CSS/chat.css";
import "./CSS/adminChatMenu.css";
// import "./CSS/adminChat.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./CSS/chatMessage.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
