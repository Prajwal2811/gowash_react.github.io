import React, { useState } from "react";
import { Dropdown, Button, Badge, Nav, Navbar as BsNavbar } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AppNavbar = ({ activeTab, setActiveTab }) => {
  const currencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY'];
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
 

  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    "You have a new message from Admin.",
    "Your order #1234 has been shipped.",
    "A new user signed up using your referral code.",
    "System maintenance scheduled for 10:00 PM tonight.",
    "Reminder: Meeting with sales team at 3:00 PM.",
    "You received a new comment on your post.",
  ]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };


  const navigate = useNavigate();

  const handleLogout = () => {
    // Optional: clear tokens or session data
    // localStorage.removeItem('authToken');

    // Navigate to home page
    navigate('/');
  };


  return (
    <BsNavbar expand="lg" className="bg-white border-bottom shadow-sm px-4 py-2" collapseOnSelect>
        <BsNavbar.Brand href="#" className="d-flex align-items-center gap-2">
          <span className="fw-semibold text-warning" style={{ fontFamily: 'cursive' }}>
            GoWash
          </span>
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="responsive-navbar-nav" />
        <BsNavbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-auto fw-semibold text-center d-flex flex-column flex-lg-row align-items-center gap-3">
            <NavLink to="/" className="nav-link text-dark text-nowrap">Home</NavLink>
            <NavLink to="/about" className="nav-link text-dark text-nowrap">About Us</NavLink>
            <NavLink to="/pricing" className="nav-link text-dark text-nowrap">Pricing</NavLink>
            <NavLink to="/contact" className="nav-link text-dark text-nowrap">Contact Us</NavLink>
            <Nav.Link href="/my-profile" onClick={() => setActiveTab('profile')} className="text-dark text-nowrap">
              My Profile
            </Nav.Link>
          </Nav>

          {/* Right Actions */}
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0 justify-content-center justify-content-lg-end w-100">
            {/* Currency Dropdown */}
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
                className="rounded-3 fw-semibold px-3 py-2"
                id="currency-dropdown"
              >
                {selectedCurrency}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {currencies.map(currency => (
                  <Dropdown.Item
                    key={currency}
                    active={currency === selectedCurrency}
                    onClick={() => setSelectedCurrency(currency)}
                  >
                    {currency}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <Button
                variant="light"
                className="rounded-3 p-2"
                onClick={toggleDropdown}
                aria-label="Notifications"
              >
                <i className="bi bi-bell"></i>
                {notifications.length > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    style={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      fontSize: "0.6rem",
                    }}
                  >
                    {notifications.length}
                  </Badge>
                )}
              </Button>

              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: 8,
                    width: 250,
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                  }}
                >
                  <div style={{ padding: 12 }}>
                    <strong>Notifications</strong>
                  </div>
                  <hr style={{ margin: 0 }} />
                  <div style={{ maxHeight: 150, overflowY: "auto" }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: 12, color: "#666" }}>
                        No new notifications
                      </div>
                    ) : (
                      notifications.map((note, index) => (
                        <div key={index} style={{ padding: 12, borderBottom: "1px solid #eee" }}>
                          {note}
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div style={{ padding: 8, textAlign: "center" }}>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={clearNotifications}
                      >
                        Clear All
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="transparent"
                id="profileDropdown"
                className="rounded-circle p-2"
                style={{ cursor: 'pointer', border: 'none' }}
                aria-label="User Profile"
              >
                <i className="bi bi-person-fill fs-5"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setActiveTab('profile')}>My Profile</Dropdown.Item>
                <Dropdown.Item onClick={() => setActiveTab('order')}>Orders</Dropdown.Item>
                <Dropdown.Item onClick={() => setActiveTab('setting')}>Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </BsNavbar.Collapse>
      </BsNavbar>

  );
};

export default AppNavbar;
