import React from "react";
import { Card } from "react-bootstrap";

const ChatMessage = ({ message, currentUser }) => {
  const isSender = message.sender === "admin";

  return (
    <div className={`chat-message ${isSender ? "sent" : "received"}`}>
      <Card className={`message-bubble ${isSender ? "sender" : "receiver"}`}>
        <Card.Body>
          <Card.Text>{message.text}</Card.Text>
          <Card.Footer className="message-timestamp">
            <small className="text-muted">
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChatMessage;
