import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

function AddStaff() {
  const navigate = useNavigate();
  const [staff, setStaff] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with API call later
    alert(`New Staff Added:\n${JSON.stringify(staff, null, 2)}`);
    navigate('/admin/staff'); // redirect to staff list
  };

  const [activeTab, setActiveTab] = useState('staff-list');

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={2} className="p-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </Col>
          <Col xs={12} md={9} lg={10} className="p-4">
            <h4 className="mb-4">Add New Staff</h4>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={staff.name}
                      onChange={handleChange}
                      placeholder="Enter full name"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={staff.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={staff.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="status" value={staff.status} onChange={handleChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Form.Select>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="me-2">
                    Add Staff
                  </Button>
                  <Button variant="secondary" onClick={() => navigate('/admin/staff')}>
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

export default AddStaff;
