import { Modal, Form, Button, } from "react-bootstrap";
import { useState } from "react";

const DrugOrderPopUp = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    Name: "",
    phoneNo: "",
    Drugs: "",
    Pharmacy: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const serverUrl =
      process.env.REACT_APP_SERVER_URL || "http://localhost:3001";

    // Send form data to backend
    const response = await fetch(`${serverUrl}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMessage("Order Placed Successfully");
    } else {
      setMessage("Failed to Place Order");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Place Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!message && (
          <Form className="custom-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="Name"
                type="text"
                required
                placeholder="Enter your name"
                value={formData.Name}
                onChange={handleChange}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                name="phoneNo"
                type="tel"
                required
                placeholder="Enter your phone number"
                value={formData.phoneNo}
                onChange={handleChange}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Drugs You Want to Buy</Form.Label>
              <Form.Control
                name="Drugs"
                as="textarea"
                rows={3}
                required
                placeholder="List the drugs you want to buy"
                value={formData.Drugs}
                onChange={handleChange}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pharmacy You Want to Buy From</Form.Label>
              <Form.Control
                name="Pharmacy"
                type="text"
                required
                placeholder="Enter the pharmacy name"
                value={formData.Pharmacy}
                onChange={handleChange}
                disabled={loading}
              />
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </div>
            {loading && (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            )}
          </Form>
        )}
        {message && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h3>{message}</h3>
            <Button variant="primary" onClick={handleClose}>
              Okay
            </Button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default DrugOrderPopUp;
