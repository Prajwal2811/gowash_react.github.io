import React, { useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

const mockOrders = [
  {
    orderId: 101,
    customerName: 'John Doe',
    date: '2025-05-24',
    total: 250,
    status: 'New Order',
  },
  {
    orderId: 102,
    customerName: 'Jane Smith',
    date: '2025-05-25',
    total: 150,
    status: 'Accepted',
  },
  {
    orderId: 103,
    customerName: 'Bob Johnson',
    date: '2025-05-26',
    total: 400,
    status: 'Delivered',
  },
  {
    orderId: 104,
    customerName: 'Alice Williams',
    date: '2025-05-27',
    total: 350,
    status: 'Canceled',
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

function Orders() {
  const [activeTab, setActiveTab] = useState('orders');
  const navigate = useNavigate();

  const handleView = (orderId) => {
    navigate(`/admin/order/view/${orderId}`);
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
            <h3>Orders List</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total (₹)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.customerName}</td>
                    <td>{order.date}</td>
                    <td>{order.total}</td>
                    <td>
                      <span className={`badge bg-${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleView(order.orderId)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Orders;
