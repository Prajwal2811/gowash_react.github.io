// MyOrder.js
import React, { useRef, useState, useEffect } from "react";
import { Dropdown, Container, Row, Col, Button, Form, Card, ProgressBar, Modal, Badge, Navbar, Nav, Pagination  } from 'react-bootstrap';
const MyOrder = () => {
    const [selectedStatus, setSelectedStatus] = React.useState("All Orders");
    const statusVariant = {
      "New Order": "secondary",
      "Accepted": "info",
      "Picked Up": "primary",
      "In Cleaning": "warning",
      "Out for Delivery": "success",
      "Due": "danger",
      "Canceled": "dark",
    };

    // Sample dummy orders with statuses
    const [orders] = useState([
          {
            id: 101,
            services: ["Wash & Iron", "Dry Cleaning"],
            pickupDate: "2025-05-24",
            pickupTime: "8am - 10am",
            status: "New Order",
            products: [
              { name: "Shirt", quantity: 2, price: 50, image: "" },
              { name: "Trousers", quantity: 1, price: 80, image: "" },
            ],
            payment: null,
          },
          {
            id: 102,
            services: ["Iron Only"],
            pickupDate: "2025-05-25",
            pickupTime: "10am - 12pm",
            status: "Accepted",
            products: [{ name: "Shirt", quantity: 3, price: 50, image: "" }],
            payment: null,
          },
          {
            id: 103,
            services: ["Dry Cleaning"],
            pickupDate: "2025-05-25",
            pickupTime: "12pm - 2pm",
            status: "Picked Up",
            products: [{ name: "Jacket", quantity: 1, price: 120, image: "" }],
            payment: null,
          },
          {
            id: 104,
            services: ["Wash & Fold"],
            pickupDate: "2025-05-26",
            pickupTime: "2pm - 4pm",
            status: "In Cleaning",
            products: [{ name: "Jeans", quantity: 4, price: 80, image: "" }],
            payment: null,
          },
          {
            id: 105,
            services: ["Wash & Iron"],
            pickupDate: "2025-05-26",
            pickupTime: "4pm - 6pm",
            status: "Out for Delivery",
            products: [
              { name: "Shirt", quantity: 1, price: 50, image: "" },
              { name: "Trousers", quantity: 2, price: 80, image: "" },
            ],
            payment: null,
          },
          {
            id: 106,
            services: ["Dry Cleaning"],
            pickupDate: "2025-05-27",
            pickupTime: "8am - 10am",
            status: "Due",
            products: [{ name: "Coat", quantity: 1, price: 150, image: "" }],
            payment: null,
          },
          {
            id: 107,
            services: ["Wash & Iron"],
            pickupDate: "2025-05-27",
            pickupTime: "10am - 12pm",
            status: "Canceled",
            products: [{ name: "Shirt", quantity: 2, price: 50, image: "" }],
            payment: null,
          },
          {
            id: 108,
            services: ["Wash & Fold"],
            pickupDate: "2025-05-26",
            pickupTime: "9:00 AM - 11:00 AM",
            status: "Delivered",
            products: [{ name: "Jeans", quantity: 4, price: 80, image: "" }],
            payment: { amount: 320 },
          },
    ]);


    const [filteredOrders, setFilteredOrders] = useState(orders);
    const ordersPerPage = 3;

    const handleStatusChange = (status) => {
        setSelectedStatus(status);
        setCurrentPage(1); // Reset to first page
        if (status === "All Orders") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter(order => order.status === status));
        }
    };


    

     // Pagination state
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const paginatedOrders = filteredOrders.slice(
        (currentPage - 1) * ordersPerPage,
        currentPage * ordersPerPage
    );

    
    const [modalOrder, setModalOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleViewDetails = (order) => {
        setModalOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalOrder(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


   

    

    return (
    <>
        <Card className="mb-4">
            <Card.Body>
            {/* Header with Filter */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
                <h5 className="mb-2 mb-md-0">
                <i className="bi bi-cart me-2"></i> My Orders
                </h5>
                <select
                    className="form-select form-select-sm w-auto"
                    value={selectedStatus}
                    onChange={e => handleStatusChange(e.target.value)}
                    >
                    <option>All Orders</option>
                    {Object.keys(statusVariant).map(status => (
                        <option key={status} value={status}>
                        {status}
                        </option>
                    ))}
                </select>

            </div>

            {/* Orders List */}
            {paginatedOrders.map((order, index) => (
                <div key={index} className="border rounded p-3 mb-3">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start">
                    <div>
                    <h6 className="fw-bold mb-1">
                        Order ID: <span className="text-dark">#{order.id}</span>
                        <span
                        className={`badge bg-${statusVariant[order.status] || "secondary"} ms-2`}
                        >
                        {order.status}
                        </span>
                    </h6>
                    <small className="text-muted">{order.services.join(", ")}</small>
                    </div>
                    <button
                    className="btn btn-sm mt-3 mt-md-0"
                    style={{ backgroundColor: "#0a3758", color: "#fff" }}
                    onClick={() => handleViewDetails(order)}
                    >
                    View Details
                    </button>
                </div>

                <div className="row mt-3">
                    <div className="col-6">
                    <div className="text-muted small">Pickup Day</div>
                    <div className="fw-bold">{order.pickupDate}</div>
                    </div>
                    <div className="col-6">
                    <div className="text-muted small">Pickup Time</div>
                    <div className="fw-bold">{order.pickupTime}</div>
                    </div>
                </div>
                </div>
            ))}

            {/* Pagination */}
            <Pagination className="justify-content-center">
                <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                />
                <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                    key={i}
                    active={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                >
                    {i + 1}
                </Pagination.Item>
                ))}
                <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                />
                <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                />
            </Pagination>
            </Card.Body>
        </Card>

        {/* Order Details Modal */}
        {modalOrder && (
            <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Order Details : #{modalOrder.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className="fw-bold mb-2">Services</h6>
                <div className="mb-3 text-muted">{modalOrder.services.join(", ")}</div>

                <div className="row mb-3">
                <div className="col-6">
                    <small className="text-muted">Pickup Day</small>
                    <div className="fw-bold">{modalOrder.pickupDate}</div>
                </div>
                <div className="col-6">
                    <small className="text-muted">Pickup Time</small>
                    <div className="fw-bold">{modalOrder.pickupTime}</div>
                </div>
                </div>

                <h6 className="fw-bold mb-3">Products</h6>
                <div className="d-flex flex-wrap gap-3 mb-4">
                {modalOrder.products.map((item, idx) => (
                    <div
                    key={idx}
                    className="border p-2 rounded text-center"
                    style={{ minWidth: "120px" }}
                    >
                    {item.image && (
                        <img src={item.image} alt={item.name} height="40" className="mb-2" />
                    )}
                    <div className="fw-semibold">{item.name}</div>
                    <small className="text-muted">Qty: {item.quantity}</small><br />
                    <small className="text-muted">Price: ₹{item.price}</small><br />
                    <div className="text-success mt-1">
                        ₹{item.price * item.quantity}
                    </div>
                    </div>
                ))}
                </div>

                <h6 className="fw-bold mb-2">Payment Details</h6>
                {modalOrder.status === "Delivered" ? (
                modalOrder.payment ? (
                    <div className="p-2 border rounded bg-light">
                    <div className="fw-semibold">
                        Amount Paid: ₹{modalOrder.payment.amount}
                    </div>
                    </div>
                ) : (
                    <div className="p-3 border bg-light text-danger rounded">
                    No payment details found.
                    </div>
                )
                ) : (
                <div className="text-muted fst-italic">
                    Payment details will be shown after delivery.
                </div>
                )}

                <div className="mt-3 text-end fw-bold">
                Total: ₹
                {modalOrder.products.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                )}
                </div>
            </Modal.Body>
            </Modal>
        )}
        </>

    );
};

export default MyOrder;
