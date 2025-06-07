import React, { useState } from 'react';
import { Nav, Collapse } from 'react-bootstrap';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', path: '/admin/dashboard' },
    {
      key: 'customers',
      label: 'Customers',
      submenu: [
        { key: 'all-customers', label: 'All Customers', path: '/admin/customers' },
      ],
    },
    {
      key: 'staff',
      label: 'Staff Members',
      submenu: [
        { key: 'all-staff', label: 'All Staff', path: '/admin/staff' },
        { key: 'add-staff', label: 'Add Staff', path: '/admin/staff/add' },
      ],
    },
    { key: 'orders', label: 'Orders', path: '/admin/orders' },
    {
      key: 'services',
      label: 'Services',
      submenu: [
        { key: 'services', label: 'Services', path: '/admin/services' },
        { key: 'add', label: 'Add Services', path: '/admin/services/add' },
      ],
    },
    { key: 'settings', label: 'Settings', path: '/admin/settings' },
    { key: 'logout', label: 'Logout', path: '/admin' },
  ];

  return (
    <div className="vh-100 bg-light border-end p-3" style={{ width: '100%' }}>
      <Nav className="flex-column">
        {menuItems.map((item) => (
          <div key={item.key}>
            {item.submenu ? (
              <>
                <div
                  onClick={() => toggleMenu(item.key)}
                  className="nav-link d-flex justify-content-between align-items-center"
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                  {openMenus[item.key] ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                </div>
                <Collapse in={openMenus[item.key]}>
                  <div className="ps-3">
                    {item.submenu.map((sub) => (
                      <Nav.Link
                        as={NavLink}
                        to={sub.path}
                        key={sub.key}
                        className="text-dark"
                        style={{ fontSize: '0.9rem' }}
                      >
                        {sub.label}
                      </Nav.Link>
                    ))}
                  </div>
                </Collapse>
              </>
            ) : (
              <Nav.Link
                as={NavLink}
                to={item.path}
                className="text-dark"
              >
                {item.label}
              </Nav.Link>
            )}
          </div>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
