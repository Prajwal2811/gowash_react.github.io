import React, { useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

const customerData = [
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

function Customers() {
  const [activeTab, setActiveTab] = useState('all-customers');
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/admin/customers/add');
  };

  const handleEdit = (id) => {
    navigate(`/admin/customers/edit/${id}`);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this customer?');
    if (confirmed) {
      alert(`Deleted customer with ID ${id}`);
      // Handle deletion logic here
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
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Customer List</h4>
              <Button variant="primary" size="sm" onClick={handleCreate}>
                <FaPlus className="me-1" /> Create Customer
              </Button>
            </div>

            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerData.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>
                      <span
                        className={`badge bg-${customer.status === 'Active' ? 'success' : 'secondary'}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(customer.id)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(customer.id)}
                      >
                        <FaTrashAlt />
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

export default Customers;
