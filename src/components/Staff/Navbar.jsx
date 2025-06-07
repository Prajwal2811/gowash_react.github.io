import React, { useState, useRef, useEffect } from 'react';
import { Navbar as RBNavbar, Container, Nav, Button, Badge, ListGroup, Overlay } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiBell, FiMenu } from 'react-icons/fi';

const notificationsData = [
  { id: 1, message: 'New order received', time: '2 mins ago' },
  { id: 2, message: 'Staff member updated', time: '10 mins ago' },
  { id: 3, message: 'Service price changed', time: '1 hour ago' },
];

const Navbar = ({ activeTab, setActiveTab, toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const bellRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bellRef.current && !bellRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            <div ref={bellRef} className="position-relative me-3" style={{ cursor: 'pointer', color: '#212529' }}>
              <FiBell size={22} onClick={() => setShowNotifications((prev) => !prev)} />
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: '0.6rem' }}
              >
                {notificationsData.length}
              </Badge>

              {/* Notification Dropdown */}
              <Overlay
                target={bellRef.current}
                show={showNotifications}
                placement="bottom"
                rootClose
                onHide={() => setShowNotifications(false)}
              >
                {({ placement, arrowProps, show: _show, popper, ...props }) => (
                  <div
                    {...props}
                    style={{
                      position: 'absolute',
                      backgroundColor: 'white',
                      border: '1px solid rgba(0,0,0,.15)',
                      borderRadius: '0.25rem',
                      width: '250px',
                      boxShadow: '0 0.5rem 1rem rgba(0,0,0,.15)',
                      zIndex: 1050,
                      ...props.style,
                    }}
                  >
                    <ListGroup variant="flush">
                      {notificationsData.map((n) => (
                        <ListGroup.Item key={n.id} action>
                          <div style={{ fontSize: '0.9rem' }}>{n.message}</div>
                          <small className="text-muted">{n.time}</small>
                        </ListGroup.Item>
                      ))}
                      {notificationsData.length === 0 && (
                        <ListGroup.Item className="text-center text-muted">No notifications</ListGroup.Item>
                      )}
                    </ListGroup>
                  </div>
                )}
              </Overlay>
            </div>

            {/* Logout */}
            <Button variant="outline-danger" size="sm" onClick={() => window.location.href = '/staff'}>
              Logout
            </Button>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
};

export default Navbar;
