import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

const StaffSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear staff login info if needed
    localStorage.removeItem('staffLoggedIn');
    navigate('/staff'); // redirect to staff login
  };

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', path: '/staff/dashboard' },
    { key: 'new-request', label: 'New Request', path: '/staff/new-request' },
    { key: 'order-history', label: 'Order History', path: '/staff/order-history' },
    { key: 'logout', label: 'Logout', action: handleLogout },
  ];

  return (
    <div className="vh-100 bg-light border-end p-3" style={{ width: '100%' }}>
      <Nav className="flex-column">
        {menuItems.map((item) =>
          item.action ? (
            <div
              key={item.key}
              onClick={item.action}
              className="nav-link text-dark"
              style={{ cursor: 'pointer' }}
            >
              {item.label}
            </div>
          ) : (
            <Nav.Link
              as={NavLink}
              to={item.path}
              key={item.key}
              className="text-dark"
              activeclassname="active"
            >
              {item.label}
            </Nav.Link>
          )
        )}
      </Nav>
    </div>
  );
};

export default StaffSidebar;
