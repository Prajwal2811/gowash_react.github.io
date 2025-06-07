import React, { useState } from 'react';
import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

const AdminLists = () => {
  const [activeTab, setActiveTab] = useState('lists');

  // State to track which tables are expanded
  const [expandedTables, setExpandedTables] = useState({
    customers: false,
    services: false,
    staff: false,
    orders: false,
  });

  const toggleExpand = (tableName) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }));
  };

  const customers = [
    { id: 1, name: 'Amit Sharma', email: 'amit.sharma@gmail.com', phone: '9876543210', totalOrders: 12, status: 'Active' },
    { id: 2, name: 'Sneha Patel', email: 'sneha.patel@yahoo.com', phone: '8765432109', totalOrders: 5, status: 'Inactive' },
    { id: 3, name: 'Rahul Verma', email: 'rahul.v@gmail.com', phone: '7654321098', totalOrders: 8, status: 'Active' },
    { id: 4, name: 'Priya Mehta', email: 'priya.m@hotmail.com', phone: '9988776655', totalOrders: 3, status: 'Active' },
  ];

  const services = [
    { id: 1, name: 'Dry Clean', price: 120, status: 'Active' },
    { id: 2, name: 'Wash & Fold', price: 70, status: 'Active' },
    { id: 3, name: 'Steam Iron', price: 60, status: 'Inactive' },
    { id: 4, name: 'Carpet Cleaning', price: 500, status: 'Active' },
  ];

  const staff = [
    { id: 1, name: 'Ravi Kumar', email: 'ravi.k@gowash.com', phone: '9123456780', role: 'Pickup Agent', status: 'Active' },
    { id: 2, name: 'Anjali Singh', email: 'anjali.s@gowash.com', phone: '9234567891', role: 'Delivery Agent', status: 'Active' },
    { id: 3, name: 'Manoj Das', email: 'manoj.d@gowash.com', phone: '9345678912', role: 'Cleaner', status: 'Inactive' },
  ];

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
    { title: 'Total Orders', value: 1243, bg: 'primary' },
    { title: 'Active Customers', value: 321, bg: 'success' },
    { title: 'Pending Pickups', value: 87, bg: 'warning' },
    { title: 'Revenue (₹)', value: '₹1,50,230', bg: 'info' },
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
            <h4 className="mb-4">GoWash Admin Dashboard</h4>

            {/* Summary Cards */}
            <Row className="g-4 mb-4">
              {stats.map((stat, index) => (
                <Col key={index} xs={12} sm={6} lg={3}>
                  <Card bg={stat.bg} text="white" className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title>{stat.title}</Card.Title>
                      <Card.Text className="fs-4 fw-bold">{stat.value}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* 2-column grid for lists */}
            <Row className="mb-4 g-4">
              {/* Customers */}
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>Customers</Card.Title>
                    <Table striped bordered hover responsive size="sm">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Total Orders</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(expandedTables.customers ? customers : customers.slice(0, 3)).map((c) => (
                          <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td>{c.totalOrders}</td>
                            <td>{renderStatusBadge(c.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={() => toggleExpand('customers')}
                      >
                        {expandedTables.customers ? 'Show Less' : 'See More'}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Services */}
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>Services</Card.Title>
                    <Table striped bordered hover responsive size="sm">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Service Name</th>
                          <th>Price (₹)</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(expandedTables.services ? services : services.slice(0, 3)).map((s) => (
                          <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.price}</td>
                            <td>{renderStatusBadge(s.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={() => toggleExpand('services')}
                      >
                        {expandedTables.services ? 'Show Less' : 'See More'}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Staff */}
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>Staff</Card.Title>
                    <Table striped bordered hover responsive size="sm">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Role</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(expandedTables.staff ? staff : staff.slice(0, 3)).map((s) => (
                          <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.phone}</td>
                            <td>{s.role}</td>
                            <td>{renderStatusBadge(s.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    <div className="text-end">
                      <button
                        className="btn btn-link p-0"
                        onClick={() => toggleExpand('staff')}
                      >
                        {expandedTables.staff ? 'Show Less' : 'See More'}
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Orders */}
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>Orders</Card.Title>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminLists;
