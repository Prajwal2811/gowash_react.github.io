import React, { useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

const initialServices = [
  { serviceId: 1, name: 'Dry Clean', category: 'Laundry', price: 120, status: 'Active' },
  { serviceId: 2, name: 'Wash and Steam Iron', category: 'Laundry', price: 90, status: 'Active' },
  { serviceId: 3, name: 'Wash and Fold', category: 'Laundry', price: 70, status: 'Active' },
  { serviceId: 4, name: 'Shoe Cleaning', category: 'Accessories', price: 150, status: 'Active' },
  { serviceId: 5, name: 'Steam Iron', category: 'Ironing', price: 60, status: 'Inactive' },
  { serviceId: 6, name: 'Carpet Cleaning', category: 'Home Services', price: 500, status: 'Active' },
  { serviceId: 7, name: 'Curtain Laundry', category: 'Home Services', price: 300, status: 'Active' },
  { serviceId: 8, name: 'Stain Removals', category: 'Special Care', price: 200, status: 'Active' },
];

function getStatusBadge(status) {
  switch (status) {
    case 'Active':
      return 'success';
    case 'Inactive':
      return 'secondary';
    default:
      return 'light';
  }
}

function Services() {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState(initialServices);
  const navigate = useNavigate();

  const handleEdit = (serviceId) => {
    navigate(`/admin/service/edit/${serviceId}`);
  };

  const handleDelete = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.serviceId !== serviceId));
    }
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={2} className="p-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </Col>

          <Col xs={12} md={9} lg={10} className="p-4">
            <h3>Services List</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Service ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price (₹)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.serviceId}>
                    <td>{service.serviceId}</td>
                    <td>{service.name}</td>
                    <td>{service.category}</td>
                    <td>{service.price}</td>
                    <td>
                      <span className={`badge bg-${getStatusBadge(service.status)}`}>
                        {service.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(service.serviceId)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(service.serviceId)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Services;
