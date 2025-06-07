import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import Navbar from '../../components/Staff/Navbar';
import Sidebar from '../../components/Staff/Sidebar';
import { useNavigate } from 'react-router-dom';

const initialOrders = [
  {
    id: 1,
    customerName: 'John Doe',
    address: '123 Main St, Springfield',
    phone: '123-456-7890',
    orderDetails: 'Order #001',
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    address: '456 Oak Ave, Metropolis',
    phone: '987-654-3210',
    orderDetails: 'Order #002',
  },
  // Add more sample orders if needed
];

function NewRequest() {
  const [activeTab, setActiveTab] = useState('new-requests'); // To highlight menu in Sidebar/Navbar
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleAcceptClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleModalAccept = () => {
    setOrders((prev) => prev.filter((o) => o.id !== selectedOrder.id));
    setShowModal(false);

    // Redirect to Order History with accepted order in state (optional)
    navigate('/staff/order-history', { state: { acceptedOrder: selectedOrder } });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Container fluid>
        <Row>
          <Col xs={12} md={3} lg={2} className="p-0">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </Col>

          <Col md={9} lg={10} className="p-4">
            <h4 className="mb-4">New Request Orders</h4>

            {orders.length === 0 ? (
              <p>No new requests available.</p>
            ) : (
              <Table striped bordered hover responsive size="sm">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer Name</th>
                    <th>Order Details</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customerName}</td>
                      <td>{order.orderDetails}</td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleAcceptClick(order)}
                        >
                          Accept
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            {/* Modal for Accept */}
            <Modal show={showModal} onHide={handleModalClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Accept Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedOrder && (
                  <>
                    <p>
                      <strong>Customer Address:</strong> {selectedOrder.address}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {selectedOrder.phone}
                    </p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleModalAccept}>
                  Accept
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NewRequest;
