import React from 'react';
import { Navbar as RBNavbar, Container, Nav, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiBell, FiMenu } from 'react-icons/fi';

const Navbar = ({ activeTab, setActiveTab, toggleSidebar }) => {
  return (
    <RBNavbar bg="light" variant="light" expand="lg" sticky="top" className="shadow-sm">
      <Container fluid>
        {/* Burger Icon */}
        <Button variant="light" className="me-2 d-md-none" onClick={toggleSidebar}>
          <FiMenu size={20} />
        </Button>

        {/* Logo */}
        <RBNavbar.Brand as={Link} to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#212529' }}>
          GoWash
        </RBNavbar.Brand>

        <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Notification Icon */}
            <Nav.Link href="#" className="position-relative me-3" style={{ color: '#212529' }}>
              <FiBell size={22} />
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: '0.6rem' }}
              >
                3
              </Badge>
            </Nav.Link>

            {/* Logout */}
            <Button variant="outline-danger" size="sm" onClick={() => window.location.href = '/admin'}>
              Logout
            </Button>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;
