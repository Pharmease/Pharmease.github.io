import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Navbar } from "react-bootstrap";
import { database, onValue, ref, push, set } from "./firebase";
import ChatMessage from "./ChatMessage";

const ChatPopUp = ({ userId, show, handleClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(userId);
  const messagesEndRef = useRef(null);

  const chatNode = `${userId}_${"Lmyt1TnogNOEEvUlGVGHzJ8FCnB3"}`;

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
    const messagesRef = ref(database, `chats/${chatNode}/messages`);
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      sender: "user",
      text: message,
      timestamp: Date.now(),
      senderId: userId,
      receiverId: "Lmyt1TnogNOEEvUlGVGHzJ8FCnB3",
    });
    setMessage("");
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
        <Navbar.Brand>Dr Yerimah</Navbar.Brand>
      </Navbar>
      <Modal.Body className="chat-modal-body">
        <div className="messages-container">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} currentUser={username} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <Form onSubmit={handleSubmit} className="message-form">
          <Form.Group className="message-input-group">
            <Form.Control
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="message-input"
            />
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
