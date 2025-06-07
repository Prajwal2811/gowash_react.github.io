import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Button,
  Modal,
  Form,
  InputGroup,
  ListGroup,
} from 'react-bootstrap';
import Navbar from '../../components/Staff/Navbar';
import Sidebar from '../../components/Staff/Sidebar';

function OrderHistory() {
  const [activeTab, setActiveTab] = useState('order-history');
  const location = useLocation();

  const acceptedOrder = location.state?.acceptedOrder;

  const initialOrders = acceptedOrder
    ? [
        {
          ...acceptedOrder,
          status: 'Accepted',
          products: [
            { id: 'P001', name: 'Shirt', price: 150, maxQuantity: 5 },
            { id: 'P002', name: 'Trousers', price: 300, maxQuantity: 3 },
            { id: 'P003', name: 'Jacket', price: 1200, maxQuantity: 2 },
            { id: 'P004', name: 'Socks', price: 50, maxQuantity: 10 },
            { id: 'P005', name: 'Tie', price: 200, maxQuantity: 4 },
          ],
        },
      ]
    : [];

  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderProducts, setSelectedOrderProducts] = useState([]);
  const [productSelection, setProductSelection] = useState({}); // { productId: { selected: bool, quantity: number } }

  const DELIVERY_CHARGE = 45;
  const GST_RATE = 0.18;

  const handlePickupClick = (order) => {
    setSelectedOrderProducts(order.products || []);

    const initSelection = {};
    (order.products || []).forEach((p) => {
      initSelection[p.id] = { selected: false, quantity: 1 };
    });
    setProductSelection(initSelection);

    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedOrderProducts([]);
    setProductSelection({});
  };

  const handleCheckboxChange = (productId) => {
    setProductSelection((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        selected: !prev[productId].selected,
      },
    }));
  };

  const handleQuantityChange = (productId, newQty) => {
    if (newQty < 1) return;
    const maxQty = selectedOrderProducts.find((p) => p.id === productId)?.maxQuantity || 10;
    if (newQty > maxQty) return;

    setProductSelection((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: newQty,
      },
    }));
  };

  // Filter selected products with quantities > 0
  const selectedProducts = selectedOrderProducts.filter(
    (p) => productSelection[p.id]?.selected
  );

  const subtotal = selectedProducts.reduce(
    (sum, product) => sum + product.price * productSelection[product.id].quantity,
    0
  );

  const gstAmount = subtotal * GST_RATE;
  const totalAmount = subtotal + gstAmount + DELIVERY_CHARGE;

  const handlePlaceOrder = () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product.');
      return;
    }
    // Place order logic here
    alert(
      `Order placed!\nSubtotal: ₹${subtotal.toFixed(
        2
      )}\nDelivery: ₹${DELIVERY_CHARGE}\nGST (18%): ₹${gstAmount.toFixed(
        2
      )}\nTotal: ₹${totalAmount.toFixed(2)}`
    );
    handleModalClose();
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
            <h3 className="mb-4">Order History</h3>

            {orders.length === 0 ? (
              <p>No accepted orders to display.</p>
            ) : (
              <Card>
                <Card.Body>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.customerName}</td>
                          <td>{order.status}</td>
                          <td>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => handlePickupClick(order)}
                            >
                              Pick Up
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            )}

            {/* Modal */}
            <Modal show={showModal} onHide={handleModalClose} size="lg" centered dialogClassName="modal-90w">
              <Modal.Header closeButton>
                <Modal.Title>Products List & Invoice</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  {/* Left side - Products List */}
                  <Col md={6} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <h5>Select Products</h5>
                    <Table striped bordered hover size="sm" responsive>
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th>Product</th>
                          <th>Price (₹)</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrderProducts.map((product) => {
                          const selection = productSelection[product.id] || {
                            selected: false,
                            quantity: 1,
                          };
                          return (
                            <tr key={product.id}>
                              <td className="text-center">
                                <Form.Check
                                  type="checkbox"
                                  checked={selection.selected}
                                  onChange={() => handleCheckboxChange(product.id)}
                                />
                              </td>
                              <td>{product.name}</td>
                              <td>{product.price}</td>
                              <td>
                                <InputGroup style={{ maxWidth: '110px' }}>
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() =>
                                      handleQuantityChange(product.id, selection.quantity - 1)
                                    }
                                    disabled={selection.quantity <= 1}
                                  >
                                    -
                                  </Button>
                                  <Form.Control
                                    type="number"
                                    size="sm"
                                    value={selection.quantity}
                                    onChange={(e) => {
                                      let val = parseInt(e.target.value, 10);
                                      if (isNaN(val)) val = 1;
                                      handleQuantityChange(product.id, val);
                                    }}
                                    min={1}
                                    max={product.maxQuantity}
                                  />
                                  <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() =>
                                      handleQuantityChange(product.id, selection.quantity + 1)
                                    }
                                    disabled={selection.quantity >= product.maxQuantity}
                                  >
                                    +
                                  </Button>
                                </InputGroup>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>

                  {/* Right side - Selected Products Invoice */}
                  <Col md={6} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <h5>Invoice</h5>
                    {selectedProducts.length === 0 ? (
                      <p>No products selected.</p>
                    ) : (
                      <ListGroup variant="flush">
                        {selectedProducts.map((product) => (
                          <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
                            <div>
                              {product.name} x {productSelection[product.id].quantity}
                            </div>
                            <div>
                              ₹
                              {(
                                product.price * productSelection[product.id].quantity
                              ).toFixed(2)}
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}

                    {/* Totals */}
                    <div className="mt-4 border-top pt-3">
                      <div className="d-flex justify-content-between">
                        <div>Subtotal</div>
                        <div>₹{subtotal.toFixed(2)}</div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>Delivery Charge</div>
                        <div>₹{DELIVERY_CHARGE.toFixed(2)}</div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div>GST (18%)</div>
                        <div>₹{gstAmount.toFixed(2)}</div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold fs-5">
                        <div>Total</div>
                        <div>₹{totalAmount.toFixed(2)}</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  onClick={handlePlaceOrder}
                  disabled={selectedProducts.length === 0}
                >
                  Place Order
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OrderHistory;
