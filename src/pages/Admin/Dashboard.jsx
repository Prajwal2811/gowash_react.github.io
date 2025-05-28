import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Navbar from '../../components/Admin/Navbar'; // Adjust path if needed
import Sidebar from '../../components/Admin/Sidebar';

const Dashboard = () => {
  return (
    <>
      {/* Show Navbar */}
      <Navbar />

      {/* Main layout */}
      <Container fluid>
        <Row>
          {/* Sidebar on left */}
          <Col md={3} className="bg-light" style={{ minHeight: '100vh' }}>
            <Sidebar />
          </Col>

          {/* Dashboard main content */}
          <Col md={9} className="p-4">
            {/* <h2>Welcome to GoWash Admin Dashboard</h2> */}
            <p>This is your dashboard where you can manage your application.</p>
            {/* Add more dashboard widgets/components here */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
