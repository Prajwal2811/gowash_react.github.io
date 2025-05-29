import React, { useState } from 'react';
import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Navbar from '../../components/Admin/Navbar';
import Sidebar from '../../components/Admin/Sidebar';

const staffData = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '999-888-7777',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Anita Singh',
    email: 'anita.singh@example.com',
    phone: '888-777-6666',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Vikram Patel',
    email: 'vikram.patel@example.com',
    phone: '777-666-5555',
    status: 'Inactive',
  },
  {
    id: 4,
    name: 'Sneha Sharma',
    email: 'sneha.sharma@example.com',
    phone: '666-555-4444',
    status: 'Active',
  },
];

function Staff() {
  const [activeTab, setActiveTab] = useState('staff-list');
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/staff/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      alert(`Deleted staff with ID ${id}`);
      // Add your deletion logic here
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
            <h4 className="mb-4">Staff List</h4>

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
                {staffData.map((staff) => (
                  <tr key={staff.id}>
                    <td>{staff.id}</td>
                    <td>{staff.name}</td>
                    <td>{staff.email}</td>
                    <td>{staff.phone}</td>
                    <td>
                      <span
                        className={`badge bg-${staff.status === 'Active' ? 'success' : 'secondary'}`}
                      >
                        {staff.status}
                      </span>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEdit(staff.id)}
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(staff.id)}
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

export default Staff;
