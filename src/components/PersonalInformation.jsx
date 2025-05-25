import React, { useRef } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  Card
} from "react-bootstrap";

const PersonalInformation = () => {
  const fileInputRef = useRef();

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // Add preview or upload logic here
    }
  };

  return (
    <Card>
      <Card.Body>
        <h5 className="mb-4">
          <i className="bi bi-clipboard"></i> Personal Information
        </h5>
        <div className="d-flex align-items-center gap-3 mb-4">
          <div
            className="bg-light rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "80px", height: "80px" }}
          >
            <i className="bi bi-person-fill fs-2 text-muted"></i>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <Button
            variant="light"
            className="border text-secondary"
            onClick={handleFileSelect}
          >
            <i className="bi bi-upload me-2"></i> Choose File
          </Button>
        </div>

      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control defaultValue="Anita" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control defaultValue="Sharma" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control defaultValue="anita.sharma@example.com" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control defaultValue="9876543210" />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            defaultValue="5th Avenue, Tower B, Andheri West, Mumbai, Maharashtra, India - 400053"
          />
        </Form.Group>
        <Button
          style={{ backgroundColor: "#0a3758", color: "#fff" }}
          variant="primary"
        >
          Update Details
        </Button>
      </Form>

      </Card.Body>
    </Card>
  );
};

export default PersonalInformation;
