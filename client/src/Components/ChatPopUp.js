import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Navbar, Container, Card } from "react-bootstrap";
import {
  database,
  onValue,
  ref,
  push,
  set,
  getStorage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "./firebase";
import ChatMessage from "./ChatMessage";

const ChatPopUp = ({ userId, show, handleClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(userId);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const messagesEndRef = useRef(null);
  const storage = getStorage();
  const adminId = process.env.CHAT_ADMIN_ID;

  const chatNode = `${userId}_${"gWloEoWvWKQMcrOjMEXOmpn4O062"}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const messagesRef = ref(database, `chats/${chatNode}/messages`);
    onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();
        const messagesList = data
          ? Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }))
          : [];
        setMessages(messagesList);
      },
      (error) => {
        console.error("Error reading data:", error); // Log any errors
      }
    );
  }, [chatNode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageFile) {
      handleImageUpload(imageFile);
    } else if (message.trim()) {
      const messagesRef = ref(database, `chats/${chatNode}/messages`);
      const newMessageRef = push(messagesRef);
      set(newMessageRef, {
        sender: "user",
        text: message,
        timestamp: Date.now(),
        senderId: userId,
        receiverId: "gWloEoWvWKQMcrOjMEXOmpn4O062",
      });
      setMessage("");
    }
  };

  const handleImageUpload = (file) => {
    const storageReference = storageRef(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageReference, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploading(true);
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const messagesRef = ref(database, `chats/${chatNode}/messages`);
          const newMessageRef = push(messagesRef);
          set(newMessageRef, {
            sender: "user",
            text: downloadURL,
            timestamp: Date.now(),
            senderId: userId,
            receiverId: "gWloEoWvWKQMcrOjMEXOmpn4O062",
            type: "image",
          });
          setUploading(false);
          setImageFile(null);
          setUploadProgress(0);
        });
      }
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setUploadProgress(0);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="chat-modal"
    >
      <Navbar bg="dark" variant="dark" className="chat-navbar">
        <Container>
          <Navbar.Brand>Dr Yerimah</Navbar.Brand>
          <Modal.Header closeButton></Modal.Header>
        </Container>
      </Navbar>
      <Modal.Body className="chat-modal-body">
        <div className="messages-container">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} currentUser={username} />
          ))}
          {uploading && (
            <div className={`chat-message sent`}>
              <Card className={`message-bubble sender`}>
                <Card.Body>
                  <div className="image-message">
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="preview"
                      className="message-image-thumbnail"
                    />
                    <div className="progress-circle">
                      <svg className="progress-circle-svg">
                        <circle cx="30" cy="30" r="28" />
                        <circle
                          cx="30"
                          cy="30"
                          r="28"
                          style={{
                            strokeDashoffset: `calc(176 - (176 * ${uploadProgress}) / 100)`,
                          }}
                        />
                      </svg>
                      <div className="progress-text">
                        {Math.round(uploadProgress)}%
                      </div>
                    </div>
                  </div>
                  <Card.Footer className="message-timestamp">
                    <small className="text-muted">
                      {new Date(Date.now()).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </small>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <Form onSubmit={handleSubmit} className="message-form">
          <Form.Group className="message-input-group">
            <div className="input-wrapper">
              <Form.Control
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="message-input"
                onPaste={(e) => {
                  const items = e.clipboardData.items;
                  for (let i = 0; i < items.length; i++) {
                    if (items[i].type.indexOf("image") !== -1) {
                      const file = items[i].getAsFile();
                      setImageFile(file);
                    }
                  }
                }}
              />
              {imageFile && (
                <div className="image-preview-container">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Selected"
                    className="image-preview"
                  />
                  <Button
                    variant="danger"
                    onClick={handleRemoveImage}
                    className="remove-image-button"
                  >
                    &times;
                  </Button>
                </div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input"
                style={{ display: "none" }}
                id="file-upload"
              />
              <label htmlFor="file-upload" className="file-upload-label">
                <i className="bi bi-paperclip"></i>
              </label>
            </div>
            <Button variant="success" type="submit" className="send-button">
              <i className="bi bi-send"></i>
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChatPopUp;
