import React, { useState } from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import Navbar from '../../components/Staff/Navbar';
import Sidebar from '../../components/Staff/Sidebar';

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedTables, setExpandedTables] = useState({ orders: false });

  const toggleExpand = (tableName) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  const orders = [
    { id: 'ORD001', customer: 'Amit Sharma', service: 'Dry Clean', date: '2025-06-05', status: 'Completed', amount: 240 },
    { id: 'ORD002', customer: 'Sneha Patel', service: 'Wash & Fold', date: '2025-06-04', status: 'Pending', amount: 140 },
    { id: 'ORD003', customer: 'Rahul Verma', service: 'Steam Iron', date: '2025-06-03', status: 'Picked Up', amount: 60 },
    { id: 'ORD004', customer: 'Priya Mehta', service: 'Carpet Cleaning', date: '2025-06-02', status: 'Delivered', amount: 500 },
  ];

  const renderStatusBadge = (status) => {
    const statusMap = {
      Active: 'success',
      Inactive: 'secondary',
      Completed: 'success',
      Pending: 'warning',
      'Picked Up': 'info',
      Delivered: 'primary',
    };
    return <span className={`badge bg-${statusMap[status] || 'light'}`}>{status}</span>;
  };

  const stats = [
    { title: 'Assigned Orders', value: 4, bg: 'primary' },
    { title: 'Pending Deliveries', value: 1, bg: 'warning' },
    { title: 'Completed Orders', value: 2, bg: 'success' },
  ];

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={2} className="p-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </Col>

          <Col md={9} lg={10} className="p-4">
            <h4 className="mb-4">Welcome to Your Staff Dashboard</h4>

            {/* Summary Cards */}
            <Row className="g-4 mb-4">
              {stats.map((stat, index) => (
                <Col key={index} xs={12} sm={6} lg={4}>
                  <Card bg={stat.bg} text="white" className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>{stat.title}</Card.Title>
                      <Card.Text className="fs-4 fw-bold">{stat.value}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Orders Table */}
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>My Orders</Card.Title>
                <Table striped bordered hover responsive size="sm">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(expandedTables.orders ? orders : orders.slice(0, 3)).map((o) => (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{o.customer}</td>
                        <td>{o.service}</td>
                        <td>{o.date}</td>
                        <td>{renderStatusBadge(o.status)}</td>
                        <td>{o.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-end">
                  <button
                    className="btn btn-link p-0"
                    onClick={() => toggleExpand('orders')}
                  >
                    {expandedTables.orders ? 'Show Less' : 'See More'}
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StaffDashboard;
