import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import { useState, useRef, useHistory } from "react";
import HandleLogin from "../Functions/HandleLogin";

const LoginForm = ({ setSuccess }) => {
  const [validated, setValidated] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  //   const history = useHistory();

  const inputRefs = {
    email: {
      ref: useRef(),
      error: null,
    },
    password: {
      ref: useRef(),
      error: passwordError,
      setError: setPasswordError,
    },
  };

  const setStates = { setValidated, setError, setIsPending, setSuccess };

  return (
    <Form
      className="custom-form"
      onSubmit={(e) => HandleLogin({ e, inputRefs, setStates })}
    >
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

export default LoginForm;
