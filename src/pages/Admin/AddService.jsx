import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

function AddService() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('services');

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace with API call
    alert(`New Service Added:\n${JSON.stringify(formData, null, 2)}`);
    navigate('/admin/services'); // redirect to service list
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={2} className="p-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </Col>
          <Col xs={12} md={9} lg={10} className="p-4">
            <h4 className="mb-4">Add New Service</h4>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Wash & Fold"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Price (₹)</Form.Label>
                    <Form.Control
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g., 99"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter service description"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" name="image" onChange={handleChange} accept="image/*" />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="me-2">
                    Add Service
                  </Button>
                  <Button variant="secondary" onClick={() => navigate('/admin/services')}>
                    Cancel
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddService;
