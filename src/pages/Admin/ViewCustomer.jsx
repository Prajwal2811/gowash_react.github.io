import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Table, Modal } from 'react-bootstrap';

import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

const mockCustomerData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '456-789-0123',
    status: 'Active',
  },
];

const mockOrderHistory = {
  1: [
    {
      orderId: 101,
      services: ["Wash & Iron", "Dry Cleaning"],
      pickupDate: "2025-05-24",
      pickupTime: "8am - 10am",
      status: "New Order",
      products: [
        { name: "Shirt", quantity: 2, price: 50, image: "" },
        { name: "Trousers", quantity: 1, price: 80, image: "" },
      ],
      payment: null,
      acceptedBy: null,
      deliveredAt: null,
    },
    {
      orderId: 102,
      services: ["Iron Only"],
      pickupDate: "2025-05-25",
      pickupTime: "10am - 12pm",
      status: "Accepted",
      products: [{ name: "Shirt", quantity: 3, price: 50, image: "" }],
      payment: null,
      acceptedBy: "Agent A",
      deliveredAt: null,
    },
    {
      orderId: 103,
      services: ["Dry Cleaning"],
      pickupDate: "2025-05-25",
      pickupTime: "12pm - 2pm",
      status: "Picked Up",
      products: [{ name: "Jacket", quantity: 1, price: 120, image: "" }],
      payment: null,
      acceptedBy: "Agent B",
      deliveredAt: null,
    },
    {
      orderId: 104,
      services: ["Wash & Fold"],
      pickupDate: "2025-05-26",
      pickupTime: "2pm - 4pm",
      status: "In Cleaning",
      products: [{ name: "Jeans", quantity: 4, price: 80, image: "" }],
      payment: null,
      acceptedBy: "Agent C",
      deliveredAt: null,
    },
    {
      orderId: 105,
      services: ["Wash & Iron"],
      pickupDate: "2025-05-26",
      pickupTime: "4pm - 6pm",
      status: "Out for Delivery",
      products: [
        { name: "Shirt", quantity: 1, price: 50, image: "" },
        { name: "Trousers", quantity: 2, price: 80, image: "" },
      ],
      payment: null,
      acceptedBy: "Agent D",
      deliveredAt: null,
    },
    {
      orderId: 106,
      services: ["Dry Cleaning"],
      pickupDate: "2025-05-27",
      pickupTime: "8am - 10am",
      status: "Due",
      products: [{ name: "Coat", quantity: 1, price: 150, image: "" }],
      payment: null,
      acceptedBy: "Agent E",
      deliveredAt: null,
    },
    {
      orderId: 107,
      services: ["Wash & Iron"],
      pickupDate: "2025-05-27",
      pickupTime: "10am - 12pm",
      status: "Canceled",
      products: [{ name: "Shirt", quantity: 2, price: 50, image: "" }],
      payment: null,
      acceptedBy: null,
      deliveredAt: null,
    },
    {
      orderId: 108,
      services: ["Wash & Fold"],
      pickupDate: "2025-05-26",
      pickupTime: "9:00 AM - 11:00 AM",
      status: "Delivered",
      products: [{ name: "Jeans", quantity: 4, price: 80, image: "" }],
      payment: { amount: 320 },
      acceptedBy: "Agent F",
      deliveredAt: "2025-05-27 11:30 AM",
    },
    {
      orderId: 109,
      services: ["Dry Cleaning", "Iron Only"],
      pickupDate: "2025-05-28",
      pickupTime: "1pm - 3pm",
      status: "Delivered",
      products: [
        { name: "Blazer", quantity: 1, price: 200, image: "" },
        { name: "Shirt", quantity: 2, price: 50, image: "" },
      ],
      payment: { amount: 300 },
      acceptedBy: "Agent G",
      deliveredAt: "2025-05-29 2:00 PM",
    },
  ],
  2: [
    {
      orderId: 201,
      services: ["Wash & Iron"],
      pickupDate: "2024-04-18",
      pickupTime: "10am - 12pm",
      status: "Canceled",
      products: [{ name: "T-shirt", quantity: 3, price: 40, image: "" }],
      payment: null,
      acceptedBy: null,
      deliveredAt: null,
    },
  ],
  3: [],
};


function ViewCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('all-customers');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const found = mockCustomerData.find((c) => c.id === parseInt(id));
    if (found) {
      setCustomer(found);
    } else {
      navigate('/admin/customers');
    }
  }, [id, navigate]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  if (!customer) return null;

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={2} className="p-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </Col>

          <Col xs={12} md={9} lg={10} className="p-4">
            <h4 className="mb-4">View Customer</h4>

            <Card className="mb-4">
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" value={customer.name} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={customer.email} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" value={customer.phone} disabled />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control type="text" value={customer.status} disabled />
                  </Form.Group>

                  <Button variant="secondary" onClick={() => navigate('/admin/customers')}>
                    Back to Customers
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <h5 className="mb-3">Order History</h5>
            <Card>
              <Card.Body>
                {mockOrderHistory[customer.id]?.length > 0 ? (
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Pickup Date</th>
                        <th>Total</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrderHistory[customer.id].map((order) => (
                        <tr key={order.orderId} onClick={() => handleOrderClick(order)} style={{ cursor: 'pointer' }}>
                          <td>{order.orderId}</td>
                          <td>{order.pickupDate}</td>
                          <td>{order.payment ? `₹${order.payment.amount}` : '—'}</td>
                          <td>{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <p>No orders found for this customer.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Order Details Modal */}
      <Modal show={!!selectedOrder} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order #{selectedOrder?.orderId} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Pickup:</strong> {selectedOrder.pickupDate} ({selectedOrder.pickupTime})</p>
              <p><strong>Services:</strong> {selectedOrder.services?.join(', ')}</p>
              {selectedOrder.acceptedBy && (
                <p><strong>Accepted By:</strong> {selectedOrder.acceptedBy}</p>
              )}
              {selectedOrder.deliveredAt && (
                <p><strong>Delivered At:</strong> {selectedOrder.deliveredAt}</p>
              )}
              <h6>Products:</h6>
              <ul>
                {selectedOrder.products?.map((p, idx) => (
                  <li key={idx}>
                    {p.name} - {p.quantity} × ₹{p.price} = ₹{p.quantity * p.price}
                  </li>
                ))}
              </ul>
              {selectedOrder.payment && (
                <p><strong>Total Paid:</strong> ₹{selectedOrder.payment.amount}</p>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewCustomer;
