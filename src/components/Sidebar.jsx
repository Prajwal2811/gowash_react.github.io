import React from 'react';
import { Dropdown, Container, Row, Col, Button, Form, Card, ProgressBar, Modal, Badge, Navbar, Nav, Pagination  } from 'react-bootstrap';
import { useState } from 'react';
const Sidebar = () => {
  const [showUpgradeInfo, setShowUpgradeInfo] = useState(false);
  
  const handleUpgradeClick = () => {
    setShowUpgradeInfo(true);
  };

  
  const StatusItem = ({ icon, title, subtitle }) => (
    <div className="d-flex align-items-start gap-2 mb-2">
      <i className={`bi ${icon} fs-4 text-muted`}></i>
      <div>
        <div className="fw-semibold small">{title}</div>
        <div className="text-muted small">{subtitle}</div>
      </div>
    </div>
  );
  return (
    <>
     <Col>
        <Card className="text-white text-center bg-danger mb-3">
          <Card.Body>
            <div className="bg-white rounded-circle mx-auto mb-2" style={{ width: '80px', height: '80px' }}>
              <i className="bi bi-person-fill text-danger fs-1"></i>
            </div>
            <h5 className="card-title">Wasant Gawade</h5>
            <p className="card-text small">1st Floor, RK Business Centre,<br />Dharampeth Extension, Shivaji Nagar, Nagpur, Maharashtra, India - 440010</p>
          </Card.Body>
        </Card>

        <StatusItem icon="bi-envelope-fill" title="Verified Email" subtitle="24 May 2025 4:29 AM" />
        <StatusItem icon="bi-phone-fill" title="Verified Mobile Number" subtitle="2024-10-12 12:42:41" />
        <StatusItem icon="bi-clipboard-fill" title="Complete Basic Info" subtitle="Not Verified" />

        <div className="mt-3">
          <p className="text-muted small">Complete Your Profile</p>
          <ProgressBar now={75} label="75%" />
        </div>

        <Button variant="outline-danger" className="mt-3 w-100" onClick={handleUpgradeClick}>
        Upgrade Pro
      </Button>

        {showUpgradeInfo && (
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Go Pro and Unlock Premium Features</Card.Title>
              <Card.Text>
                ✅ Unlimited access to all features <br />
                ✅ Priority customer support <br />
                ✅ Detailed analytics and reporting <br />
                ✅ Early access to new features <br />
                <strong>Only ₹499/month</strong>
              </Card.Text>
              <Button style={{ backgroundColor:  '#0a3758', color: '#fff' }} >Subscribe Now</Button>
            </Card.Body>
          </Card>
        )}

      </Col>
    </>
  );
};

export default Sidebar;
  