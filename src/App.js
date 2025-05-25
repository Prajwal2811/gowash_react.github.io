import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar'; // AppNavbar.js
import Sidebar from './components/Sidebar';
import AppTabs from "./components/AppTabs";

import PersonalInformation from './components/PersonalInformation';
import RequestPickup from './components/RequestPickup';
import MyOrder from './components/MyOrder';
import OccasionalService from './components/OccasionalService';
import AlterationService from './components/AlterationService';
import PaymentDetails from './components/PaymentDetails';
import Setting from './components/Setting';
import DeleteProfile from './components/DeleteProfile';

import Home from './pages/Home';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';

const App = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const location = useLocation();

  // Show profile/dashboard layout only on /profile and subpaths (you can adjust this)
  const isProfileRoute = location.pathname.startsWith('/profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <PersonalInformation />;
      case 'pickup': return <RequestPickup />;
      case 'order': return <MyOrder />;
      case 'occasion': return <OccasionalService />;
      case 'alteration': return <AlterationService />;
      case 'payment': return <PaymentDetails />;
      case 'setting': return <Setting />;
      case 'delete': return <DeleteProfile />;
      default: return <PersonalInformation />;
    }
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />

        {/* Profile route - you can also create nested routes here */}
        <Route
          path="/my-profile/*"
          element={
            <>
              <AppTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <Container>
                <Row>
                  <Col md={3}>
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                  </Col>
                  <Col md={9}>
                    {renderContent()}
                  </Col>
                </Row>
              </Container>
            </>
          }
        />
      </Routes>

      {/* Optionally: if user manually visits /profile but no route matched, fallback: */}
      {!isProfileRoute && null}
    </>
  );
};

export default App;
