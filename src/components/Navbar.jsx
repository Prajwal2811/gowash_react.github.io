import React, { useState } from "react";
import { Dropdown, Button, Badge, Nav, Navbar as BsNavbar, Modal, Form, Tabs, Tab } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { GoogleLogin, googleLogout } from '@react-oauth/google'; // For Google OAuth

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

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authTab, setAuthTab] = useState('signin'); // 'signin' or 'signup'
  const [user, setUser] = useState(null); // Store logged in user info

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
    setUser(null);
    navigate('/');
  };

  // Dummy handlers for sign in and sign up form submissions
  const handleSignIn = (e) => {
    e.preventDefault();
    // TODO: validate form and login user
    setUser({ name: "Demo User" }); // simulate login
    setShowAuthModal(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // TODO: validate form and register user
    setUser({ name: "New User" }); // simulate signup & login
    setShowAuthModal(false);
  };

  // Google Login success callback
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    // TODO: send credentialResponse.credential token to backend to verify & create user session
    setUser({ name: "Google User" }); // simulate user login
    setShowAuthModal(false);
  };

  // Google login failure callback
  const handleGoogleLoginError = () => {
    alert("Google login failed. Try again.");
  };

  return (
    <>
      <BsNavbar expand="lg" className="bg-white border-bottom shadow-sm px-4 py-2 sticky-top" collapseOnSelect>
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

            {/* Show Sign In/Up or Profile dropdown based on user login */}
            {!user ? (
              <>
                <Button variant="outline-primary" onClick={() => { setAuthTab('signin'); setShowAuthModal(true); }}>
                  Sign In
                </Button>
              </>
            ) : (
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
            )}
          </div>
        </BsNavbar.Collapse>
      </BsNavbar>

      {/* Auth Modal */}
      <Modal show={showAuthModal} onHide={() => setShowAuthModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{authTab === 'signin' ? 'Sign In' : 'Sign Up'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs activeKey={authTab} onSelect={(k) => setAuthTab(k)} className="mb-3" justify>
            <Tab eventKey="signin" title="Sign In">
              <Form onSubmit={handleSignIn}>
                <Form.Group className="mb-3" controlId="signInEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signInPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-2">
                  Sign In
                </Button>
              </Form>
              <div className="text-center my-2">or</div>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            </Tab>

            <Tab eventKey="signup" title="Sign Up">
              <Form onSubmit={handleSignUp}>
                <Form.Group className="mb-3" controlId="signUpName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter full name" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signUpEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signUpPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-2">
                  Sign Up
                </Button>
              </Form>
              <div className="text-center my-2">or</div>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppNavbar;
