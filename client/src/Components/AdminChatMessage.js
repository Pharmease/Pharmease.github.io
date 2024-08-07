import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";

const AdminChatMessage = ({ message, currentUser }) => {
  const [showImage, setShowImage] = useState(false);
  const isSender = message.sender === "admin";
  const isImage = message.type === "image";

  const handleClose = () => setShowImage(false);
  const handleShow = () => setShowImage(true);

  return (
    <div className={`chat-message ${isSender ? "sent" : "received"}`}>
      <Card className={`message-bubble ${isSender ? "sender" : "receiver"}`}>
        <Card.Body>
          {isImage ? (
            <div onClick={handleShow} className="image-message">
              <img
                src={message.text}
                alt="sent image"
                className="message-image-thumbnail"
              />
            </div>
          ) : (
            <Card.Text>{message.text}</Card.Text>
          )}
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

      <Modal show={showImage} onHide={handleClose} centered>
        <Modal.Body className="image-modal-body">
          <img src={message.text} alt="full image" className="full-image" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminChatMessage;
