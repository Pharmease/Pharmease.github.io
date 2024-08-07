import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import { useState, useRef, useHistory } from "react";
import HandleRegister from "../Functions/HandleRegister";

const RegisterForm = ({ setSuccess }) => {
  const [validated, setValidated] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [numError, setNumError] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  //   const history = useHistory();

  const inputRefs = {
    name: {
      ref: useRef(),
    },
    email: {
      ref: useRef(),
      error: null,
    },
    password: {
      ref: useRef(),
      error: passwordError,
      setError: setPasswordError,
    },
    rePassword: {
      ref: useRef(),
      error: null,
    },
    number: {
      ref: useRef(),
      error: numError,
      setError: setNumError,
    },
  };
  const setStates = { setValidated, setError, setIsPending, setSuccess };

  return (
    <Form
      className="custom-form"
      onSubmit={(e) => HandleRegister({ e, inputRefs, setStates })}
    >
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          required
          placeholder="Enter your full name"
          disabled={isPending}
          ref={inputRefs.name.ref}
        />
        <Form.Control.Feedback type="invalid">
          Enter your Name
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label> Phone Number</Form.Label>

        <InputGroup className="mb-3" hasValidation>
          <InputGroup.Text id="basic-addon1">+234</InputGroup.Text>
          <Form.Control
            type="tel"
            required
            placeholder="Enter your phone number"
            ref={inputRefs.number.ref}
            isInvalid={numError}
            disabled={isPending}
          />
        </InputGroup>
        <Form.Control.Feedback type="invalid">
          Enter a Valid Phone Number
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          required
          placeholder="Email Address"
          ref={inputRefs.email.ref}
          disabled={isPending}
        />
        <Form.Control.Feedback type="invalid">
          Enter a Valid Email
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          required
          placeholder="Password"
          ref={inputRefs.password.ref}
          isInvalid={passwordError}
          disabled={isPending}
        />
        <Form.Control.Feedback type="invalid">
          {passwordError || "Enter a valid password"}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          required
          placeholder="Re-Enter Password"
          ref={inputRefs.rePassword.ref}
          isInvalid={passwordError}
          disabled={isPending}
        />
        <Form.Control.Feedback type="invalid">
          {passwordError || "Re-enter password to confirm"}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="d-flex justify-content-end mt-4">
        <Button type="submit" variant="primary" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
      {isPending && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </Form>
  );
};

export default RegisterForm;
