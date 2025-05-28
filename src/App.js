import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route, useLocation } from 'react-router-dom';

import AppNavbar from './components/Navbar'; // Rename file if needed
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

import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import AllCustomers from './pages/Admin/Customers';
import AddCustomer from './pages/Admin/AddCustomer';
import EditCustomer from './pages/Admin/EditCustomer';
import AllStaff from './pages/Admin/Staff';
import AddStaff from './pages/Admin/AddStaff';
import Orders from './pages/Admin/Orders';
import Reports from './pages/Admin/Reports';
import Service from './pages/Admin/Service';
import AddService from './pages/Admin/AddService';
import AdminSettings from './pages/Admin/AdminSettings';

const App = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isProfileRoute = location.pathname.startsWith('/my-profile');

  const shouldHideNavbar = isAdminRoute || isProfileRoute;

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
      {!shouldHideNavbar && (
        <AppNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      )}

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/customers" element={<AllCustomers />} />
        <Route path="/admin/customers/add" element={<AddCustomer />} />
        <Route path="/admin/customers/edit/:id" element={<EditCustomer />} />
        <Route path="/admin/staff" element={<AllStaff />} />
        <Route path="/admin/staff/add" element={<AddStaff />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/services" element={<Service />} />
        <Route path="/admin/services/add" element={<AddService />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />

        {/* Profile Route */}
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
    </>
  );
};

export default App;
