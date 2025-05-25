import React from 'react';
import { useRef, useState, useEffect } from "react";
import { Dropdown, Container, Row, Col, Button, Form, Card, ProgressBar, Modal, Badge, Navbar, Nav, Pagination  } from 'react-bootstrap';



const RequestPickup = () => {
    const [showModal, setShowModal] = useState(false);
    
    const lastOrder = {
        id: 12345,
        pickupDate: "2025-05-24",
        pickupTime: "10:00 AM - 12:00 PM",
        address: "123, Main Street, Your City",
        items: [
          { name: "Laundry", quantity: 3 },
          { name: "Dry Cleaning", quantity: 2 },
        ],
      };

    const servicesList = [
        "Dry Clean", "Wash and Steam Iron", "Wash and Fold", "Shoe Cleaning",
        "Steam Iron", "Carpet Cleaning", "Curtain Laundry", "Stain Removals"
    ];

    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [expressDelivery, setExpressDelivery] = useState(false);
    const [days, setDays] = useState([]);

    useEffect(() => {
            const nextSevenDays = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i);
            return {
                label: date.toLocaleDateString("en-GB", {
                weekday: "long",
                day: "2-digit",
                month: "short",
                year: "numeric"
                }),
                value: date.toISOString().split("T")[0]
            };
            });
            setDays(nextSevenDays);
        }, []);
    
    
        const toggleService = (service) => {
            setSelectedServices((prev) => {
            if (prev.includes(service)) {
                return prev.filter((s) => s !== service);
            } else if (prev.length < 3) {
                return [...prev, service];
            } else {
                return prev; // prevent adding more than 3
            }
            });
        };
    
        const getFilteredTimeSlots = () => {
            if (!selectedDay) return [];
    
            const todayStr = new Date().toISOString().split("T")[0];
    
            if (selectedDay === todayStr) {
                const currentHour = new Date().getHours();
                return timeSlots.filter(slot => slot.end > currentHour);
            }
    
            return timeSlots;
        };
    
        const timeSlots = [
          { label: "8am - 10am", start: 8, end: 10 },
          { label: "10am - 12pm", start: 10, end: 12 },
          { label: "12pm - 2pm", start: 12, end: 14 },
          { label: "2pm - 4pm", start: 14, end: 16 },
          { label: "4pm - 6pm", start: 16, end: 18 },
        ];


    const [showExpressModal, setShowExpressModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    
    const resetForm = () => {
        setSelectedServices([]);
        setSelectedDay(null);
        setSelectedTime("");
        setExpressDelivery(false);
        setShowExpressModal(false);
        setShowConfirmModal(false);
    };
    const handleRepeatClick = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleReorder = () => {
    // Add reorder logic here - e.g. call API or navigate to order confirmation page
        setShowModal(false);
    };
  return (
    <>
      <Card>
        <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>
                <i className="bi bi-person-lines-fill"></i> Request Pickup
                </h5>
                <Button variant="outline-secondary"  size="sm" onClick={handleRepeatClick}>
                Repeat Last Schedule
                </Button>
            </div>


            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Last Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>
                    <strong>Order ID:</strong> {lastOrder.id}
                </p>
                <p>
                    <strong>Pickup Date:</strong> {lastOrder.pickupDate}
                </p>
                <p>
                    <strong>Pickup Time:</strong> {lastOrder.pickupTime}
                </p>
                <p>
                    <strong>Pickup Address:</strong> {lastOrder.address}
                </p>
                <p>
                    <strong>Items:</strong>
                </p>
                <ul>
                    {lastOrder.items.map((item, idx) => (
                    <li key={idx}>
                        {item.name} — Quantity: {item.quantity}
                    </li>
                    ))}
                </ul>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button style={{ backgroundColor:  '#0a3758', color: '#fff' }}   variant="primary" onClick={handleReorder}>
                    Reorder
                </Button>
                </Modal.Footer>
            </Modal>

            <h6 className="mt-3">Select Service</h6>
            <div className="row g-2">
            {servicesList.map((service, i) => (
                <div className="col-6 col-md-3" key={i}>
                <button 
                    className={`btn w-100 ${selectedServices.includes(service) ? 'text-white' : 'btn-light'}`}
                    style={selectedServices.includes(service) ? { backgroundColor: '#0a3758' } : {}}
                    onClick={() => toggleService(service)}
                >
                    {service}
                </button>
                </div>
            ))}
            </div>


            <h6 className="mt-4">Choose Day</h6>
            <div className="row g-2">
                {days.map((day, i) => (
                    <div className="col-6 col-md-4 col-lg-3" key={i}>
                    <button
                        className={`btn w-100 ${selectedDay === day.value ? "text-white" : "btn-light"}`}
                        style={selectedDay === day.value ? { backgroundColor: '#0a3758' } : {}}
                        onClick={() => setSelectedDay(day.value)}
                    >
                        {day.label}
                    </button>

                    </div>
                ))}
            </div>


            <h6 className="mt-4">Choose Time</h6>
            <div className="row g-2">
            {getFilteredTimeSlots().map((time, i) => (
                <div className="col-6 col-md-4 col-lg-3" key={i}>
                <button
                    className={`btn w-100 ${selectedTime === time.label ? "text-white" : "btn-light"}`}
                    style={selectedTime === time.label ? { backgroundColor: '#0a3758' } : {}}
                    onClick={() => setSelectedTime(time.label)}
                >
                    {time.label}
                </button>

                </div>
            ))}
            </div>



            <div className="form-check mt-2">
            <input
                type="checkbox"
                className="form-check-input"
                id="expressDelivery"
                checked={expressDelivery}
                onChange={(e) => {
                    const checked = e.target.checked;
                    setExpressDelivery(checked);
                    if (checked) {
                    setShowExpressModal(true);
                    }
                }}
                />

            <label className="form-check-label" htmlFor="expressDelivery">
                Express Delivery
            </label>

            {showExpressModal && (
                <>
                    <div className="modal show fade d-block" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Express Delivery Details</h5>
                                <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowExpressModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Get your laundry delivered within 4 hours!</strong></p>
                                <ul className="list-unstyled mt-3">
                                <li>✅ Pickup & delivery in <strong>under 4 hours</strong></li>
                                <li>🚀 Prioritized processing in our facility</li>
                                <li>💰 Additional charge: <strong>₹99 per order</strong></li>
                                <li>📍 Available only in select serviceable areas</li>
                                <li>⏰ Available between: <strong>8am – 4pm</strong></li>
                                </ul>
                                <div className="alert alert-warning mt-3">
                                Note: Express Delivery is subject to service availability and may not apply on weekends or public holidays.
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowExpressModal(false)}
                                >
                                Close
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>

                        <div className="modal-backdrop fade show"></div>
                </>
                )}

            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="light" onClick={resetForm}>
            <i className="bi bi-arrow-counterclockwise"></i>
            </Button>

            <Button style={{ backgroundColor:  '#0a3758', color: '#fff' }}   variant="primary" onClick={() => setShowConfirmModal(true)}>
            Schedule
            </Button>
            {showConfirmModal && (
            <>
                <div className="modal show fade d-block" tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Your Pickup Request</h5>
                        <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowConfirmModal(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <p>Please review your selections before scheduling:</p>
                        <ul className="list-unstyled">
                        <li><strong>Selected Services:</strong> {selectedServices.join(", ") || "None"}</li>
                        <li><strong>Selected Day:</strong> {
                            days.find(d => d.value === selectedDay)?.label || "Not selected"
                        }</li>
                        <li><strong>Selected Time Slot:</strong> {selectedTime || "Not selected"}</li>
                        <li><strong>Express Delivery:</strong> {expressDelivery ? "Yes (₹99 extra)" : "No"}</li>
                        </ul>
                    </div>
                    <div className="modal-footer">
                        <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                        </Button>
                        <Button
                        variant="primary" style={{ backgroundColor:  '#0a3758', color: '#fff' }}  
                        onClick={() => {
                            setShowConfirmModal(false);
                        }}
                        >
                        Confirm & Schedule
                        </Button>
                    </div>
                    </div>
                </div>
                </div>
                <div className="modal-backdrop fade show"></div>
            </>
            )}


            </div>
        </Card.Body>
        </Card>
    </>
  );
};

export default RequestPickup;
