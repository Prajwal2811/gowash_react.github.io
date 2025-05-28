import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

const mockCustomerData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '987-654-3210',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '456-789-0123',
    status: 'Active',
  },
];

function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('all-customers');

  useEffect(() => {
    const found = mockCustomerData.find((c) => c.id === parseInt(id));
    if (found) {
      setCustomer(found);
    } else {
      navigate('/admin/customers');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Customer:', customer);
    navigate('/admin/customers');
  };

  if (!customer) return null;

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Container fluid>
            <Row>
                <Col xs={12} md={3} lg={2} className="p-0">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                </Col>

                <Col xs={12} md={9} lg={10} className="p-4">
                <h4 className="mb-4">Edit Customer</h4>

                <Card>
                    <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={customer.name}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>

                        <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={customer.email}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>

                        <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            name="phone"
                            value={customer.phone}
                            onChange={handleChange}
                            required
                        />
                        </Form.Group>

                        <Form.Group className="mb-4">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                            name="status"
                            value={customer.status}
                            onChange={handleChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </Form.Select>
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                        <Button
                            variant="secondary"
                            className="me-2"
                            onClick={() => navigate('/admin/customers')}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Save Changes
                        </Button>
                        </div>
                    </Form>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            </Container>
    </>
  );
}

export default EditCustomer;
