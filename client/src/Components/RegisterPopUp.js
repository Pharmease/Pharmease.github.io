import { Modal, Button, Tab, Tabs } from "react-bootstrap";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const RegisterPopUp = ({ show, handleClose }) => {
  const [success, setSuccess] = useState(false);

  const handleOnClose = () => {
    handleClose();
    setSuccess(false);
  };

  return (
    <Modal show={show} onHide={handleOnClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login/Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!success && (
          <Tabs
            defaultActiveKey="login"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="login" title="Login">
              <LoginForm setSuccess={setSuccess}></LoginForm>
            </Tab>
            <Tab eventKey="register" title="Register">
              <RegisterForm setSuccess={setSuccess}></RegisterForm>
            </Tab>
          </Tabs>
        )}
        {success && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h5>You have Successfully Logged into your Account</h5>
            <Button variant="primary" onClick={handleOnClose}>
              Okay
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default RegisterPopUp;
