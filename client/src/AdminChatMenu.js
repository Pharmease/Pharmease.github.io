import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Form,
  FormControl,
  ListGroup,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { database, onValue, ref } from "./Components/firebase";
import UseVerifyUser from "./CustomUseHooks/UseVerifyUser";
import AdminChatPopUp from "./Components/AdminChatPopUp";

const AdminChatMenu = () => {
  const history = useHistory();
  const firstRender = useRef(true);
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { loggedIn, uid, isPending } = UseVerifyUser();
  const [chatShow, setChatShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChatClose = () => setChatShow(false);
  const handleChatShow = () => setChatShow(true);

  useEffect(() => {
    if (!firstRender.current) {
      if (!isPending && !loggedIn) {
        history.push("/");
      } else {
        const chatsRef = ref(database, "admin-users");
        onValue(chatsRef, (snapshot) => {
          const adminUsers = snapshot.val();
          if (adminUsers && adminUsers[uid]) {
            setIsAdmin(true);
          } else {
            history.push("/");
          }
        });
      }
    } else {
      firstRender.current = false;
    }
  }, [loggedIn, isPending, uid, history]);

  useEffect(() => {
    if (!isAdmin) return;
    const chatsRef = ref(database, "chats");
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      const chatList = [];

      if (data) {
        for (const chatId in data) {
          const messages = data[chatId].messages;
          const messageKeys = Object.keys(messages);
          const lastMessage = messages[messageKeys[messageKeys.length - 1]];

          const userId = chatId.split("_")[0];

          const userDetailsRef = ref(database, `UsersDetails/${userId}`);
          onValue(userDetailsRef, (userSnapshot) => {
            const userDetails = userSnapshot.val();

            chatList.push({
              id: chatId,
              name: userDetails.name,
              lastMessage: lastMessage.text,
              time: new Date(lastMessage.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              }),
              userId,
            });

            setChats([...chatList]);
          });
        }
      }
    });
  }, [isAdmin]);

  useEffect(() => {
    const filterChats = () => {
      if (!searchQuery) {
        setFilteredChats(chats);
      } else {
        const query = searchQuery.toLowerCase();
        const filtered = chats.filter(
          (chat) =>
            chat.name.toLowerCase().includes(query) ||
            chat.userId.toLowerCase().includes(query)
        );
        setFilteredChats(filtered);
      }
    };

    filterChats();
  }, [searchQuery, chats]);

  const handleSelectUser = (userId, userName) => {
    setSelectedUser({ id: userId, name: userName });
    handleChatShow();
  };

  return (
    <Container className="chat-menu-container">
      <Row className="mt-3">
        <Col>
          <Form>
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Search users..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputGroup.Text className="search-icon">
                <i className="bi bi-search"></i>
              </InputGroup.Text>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <ListGroup className="chat-list">
            {filteredChats.length > 0 &&
              filteredChats.map((chat) => (
                <ListGroup.Item
                  key={chat.id}
                  className="chat-list-item"
                  onClick={() => handleSelectUser(chat.userId, chat.name)}
                >
                  <Row>
                    <Col xs={8}>
                      <strong className="chat-name">{chat.name}</strong>
                      <br />
                      <span className="chat-preview">{chat.lastMessage}</span>
                    </Col>
                    <Col xs={4} className="text-right">
                      <span className="chat-time">{chat.time}</span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
      {loggedIn && selectedUser && (
        <AdminChatPopUp
          adminId={uid}
          user={selectedUser}
          setSelectedUser={setSelectedUser}
          show={chatShow}
          handleClose={handleChatClose}
        ></AdminChatPopUp>
      )}
    </Container>
  );
};

export default AdminChatMenu;
