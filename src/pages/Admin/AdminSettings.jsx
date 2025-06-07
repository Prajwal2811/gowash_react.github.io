import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

function AdminSettings() {
  const [activeTab, setActiveTab] = useState('settings');

  const [settings, setSettings] = useState({
    siteName: 'GoWash',
    supportEmail: 'support@gowash.com',
    contactNumber: '9876543210',
    address: '123 Main St, Mumbai',
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with API call
    alert(`Settings Updated:\n${JSON.stringify(settings, null, 2)}`);
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
            <h4 className="mb-4">Admin Settings</h4>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="siteName">
                    <Form.Label>Site Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="siteName"
                      value={settings.siteName}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="supportEmail">
                    <Form.Label>Support Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="supportEmail"
                      value={settings.supportEmail}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="contactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactNumber"
                      value={settings.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="address"
                      value={settings.address}
                      onChange={handleChange}
                      rows={2}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="maintenanceMode">
                    <Form.Check
                      type="switch"
                      label="Maintenance Mode"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Save Settings
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

export default AdminSettings;
