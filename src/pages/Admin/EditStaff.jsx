import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Table } from 'react-bootstrap';

import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

// Mock staff data
const staffData = [
  { id: 1, name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com', phone: '999-888-7777', status: 'Active' },
  { id: 2, name: 'Anita Singh', email: 'anita.singh@example.com', phone: '888-777-6666', status: 'Active' },
  { id: 3, name: 'Vikram Patel', email: 'vikram.patel@example.com', phone: '777-666-5555', status: 'Inactive' },
  { id: 4, name: 'Sneha Sharma', email: 'sneha.sharma@example.com', phone: '666-555-4444', status: 'Active' },
];

// Mock customer data
const customerData = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' },
];

// Mock orders assigned to staff (delivered orders only)
const staffDeliveredOrders = {
  1: [ // Staff ID 1's delivered orders
    {
      orderId: 108,
      customerId: 1,
      customerName: 'John Doe',
      date: '2025-05-26',
      total: 320,
      status: 'Delivered',
      details: 'Wash & Fold - Jeans (4 pcs)',
    },
    {
      orderId: 109,
      customerId: 1,
      customerName: 'John Doe',
      date: '2025-05-28',
      total: 300,
      status: 'Delivered',
      details: 'Dry Cleaning & Iron Only - Blazer (1), Shirt (2)',
    },
  ],
  2: [ // Staff ID 2's delivered orders
    {
      orderId: 210,
      customerId: 2,
      customerName: 'Jane Smith',
      date: '2025-05-20',
      total: 400,
      status: 'Delivered',
      details: 'Iron Only - Shirt (5 pcs)',
    },
  ],
  3: [], // no orders delivered yet
  4: [], // no orders delivered yet
};

function EditStaff() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [staff, setStaff] = useState(null);
  const [activeTab, setActiveTab] = useState('staff-list');

  useEffect(() => {
    const foundStaff = staffData.find((s) => s.id === parseInt(id));
    if (foundStaff) {
      setStaff(foundStaff);
    } else {
      alert('Staff not found');
      navigate('/admin/staff');
    }
  }, [id, navigate]);

  if (!staff) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Staff details updated:\n${JSON.stringify(staff, null, 2)}`);
    navigate('/admin/staff');
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
            <h4 className="mb-4">Edit Staff</h4>
            <Card className="mb-4">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={staff.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={staff.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={staff.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="status">
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="status" value={staff.status} onChange={handleChange}>
                      <option>Active</option>
                      <option>Inactive</option>
                    </Form.Select>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="me-2">
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={() => navigate('/admin/staff')}>
                    Cancel
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <h5>Successfully Delivered Orders</h5>
            {staffDeliveredOrders[staff.id]?.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total (₹)</th>
                    <th>Details</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {staffDeliveredOrders[staff.id].map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId}</td>
                      <td>{order.customerName}</td>
                      <td>{order.date}</td>
                      <td>{order.total}</td>
                      <td>{order.details}</td>
                      <td>
                        <span className="badge bg-success">{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No delivered orders for this staff member.</p>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default EditStaff;
