import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';

import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

const mockOrders = [
  {
    orderId: 101,
    customerName: 'John Doe',
    date: '2025-05-24',
    total: 250,
    status: 'New Order',
    items: [
      { name: 'Shirt', quantity: 2, price: 50 },
      { name: 'Trousers', quantity: 1, price: 80 },
    ],
    acceptedBy: null,
    deliveredOn: null,
  },
  {
    orderId: 102,
    customerName: 'Jane Smith',
    date: '2025-05-25',
    total: 150,
    status: 'Accepted',
    items: [{ name: 'Shirt', quantity: 3, price: 50 }],
    acceptedBy: 'Staff A',
    deliveredOn: null,
  },
  {
    orderId: 103,
    customerName: 'Bob Johnson',
    date: '2025-05-26',
    total: 400,
    status: 'Delivered',
    items: [
      { name: 'Jacket', quantity: 1, price: 120 },
      { name: 'Jeans', quantity: 2, price: 140 },
    ],
    acceptedBy: 'Staff B',
    deliveredOn: '2025-05-28',
  },
  {
    orderId: 104,
    customerName: 'Alice Williams',
    date: '2025-05-27',
    total: 350,
    status: 'Canceled',
    items: [{ name: 'Dress', quantity: 1, price: 350 }],
    acceptedBy: null,
    deliveredOn: null,
  },
];

function getStatusBadge(status) {
  switch (status) {
    case 'Delivered':
      return 'success';
    case 'Canceled':
      return 'danger';
    case 'Accepted':
      return 'warning';
    case 'New Order':
      return 'info';
    default:
      return 'secondary';
  }
}

function OrderView() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const id = parseInt(orderId, 10);
    if (isNaN(id)) {
      navigate('/admin/orders');
      return;
    }

    const foundOrder = mockOrders.find((o) => o.orderId === id);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      navigate('/admin/orders');
    }
  }, [orderId, navigate]);

  if (!order) return null; // or spinner/loading

  return (
    <>
      <Navbar activeTab="orders" setActiveTab={() => {}} />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={2} className="p-0">
            <Sidebar activeTab="orders" setActiveTab={() => {}} />
          </Col>

          <Col xs={12} md={9} lg={10} className="p-4">
            <h3>Order Details - #{order.orderId}</h3>
            <Card className="mb-3">
              <Card.Body>
                <p>
                  <strong>Customer:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Date:</strong> {order.date}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`badge bg-${getStatusBadge(order.status)}`}>
                    {order.status}
                  </span>
                </p>
                {order.acceptedBy && (
                  <p>
                    <strong>Accepted By:</strong> {order.acceptedBy}
                  </p>
                )}
                {order.status === 'Delivered' && order.deliveredOn && (
                  <p>
                    <strong>Delivered On:</strong> {order.deliveredOn}
                  </p>
                )}
              </Card.Body>
            </Card>

            <h5>Order Items</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price (₹)</th>
                  <th>Subtotal (₹)</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h5>Total: ₹{order.total}</h5>

            <Button variant="secondary" onClick={() => navigate('/admin/orders')}>
              Back to Orders
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OrderView;
