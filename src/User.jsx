import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useRef, useState, useEffect } from "react";
import { Dropdown, Container, Row, Col, Button, Form, Card, ProgressBar, Modal, Badge, Navbar, Nav, Pagination  } from 'react-bootstrap';



const ProfilePage = () => {
    const currencies = ['INR', 'USD', 'EUR', 'GBP', 'JPY'];
    const [selectedCurrency, setSelectedCurrency] = useState('INR');
    const [activeTab, setActiveTab] = useState("profile");
    const scrollRef = useRef();
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const scrollAmount = 150;

    const handleScroll = (direction) => {
        const container = scrollRef.current;
        const scrollTo = direction === "left" ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;
        container.scrollTo({ left: scrollTo, behavior: "smooth" });
    };

    const checkButtons = () => {
        const el = scrollRef.current;
        if (!el) return;
        setShowPrev(el.scrollLeft > 0);
        setShowNext(el.scrollLeft + el.offsetWidth < el.scrollWidth);
    };

    useEffect(() => {
        checkButtons();
        const el = scrollRef.current;
        el.addEventListener("scroll", checkButtons);
        return () => el.removeEventListener("scroll", checkButtons);
    }, []);


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
    
    // Sample dummy orders with statuses
    const [orders] = useState([
      {
        id: 101,
        services: ["Wash & Iron", "Dry Cleaning"],
        pickupDate: "2025-05-24",
        pickupTime: "8am - 10am",
        status: "New order",
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


    const [modalOrder, setModalOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

      // Pagination state
      const itemsPerPage = 3;
      const [currentPage, setCurrentPage] = useState(1);
      const totalPages = Math.ceil(orders.length / itemsPerPage);

      // Get orders for current page
      const paginatedOrders = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );

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

      // Badge color based on status
      const statusVariant = {
      "New Order": "secondary",
      "Accepted": "info",
      "Picked Up": "primary",
      "In Cleaning": "warning",
      "Out for Delivery": "success",
      "Due": "danger",
      "Canceled": "dark",
    };
      

      const [selectedStatus, setSelectedStatus] = React.useState("All Orders");

      const [showDeleteModal, setShowDeleteModal] = useState(false);

      const handleDeleteProfile = () => {
      setShowDeleteModal(false);
      // Add your deletion logic here, e.g. API call
      console.log("Profile deleted");
      };




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


      const fileInputRef = useRef();

      const handleFileSelect = () => {
          fileInputRef.current.click();
      };

      const handleFileChange = (e) => {
          const file = e.target.files[0];
          if (file) {
          console.log("Selected file:", file);
          // You can add preview or upload logic here
          }
      };


      const [notifications, setNotifications] = useState(3); // example count
      const [showDropdown, setShowDropdown] = useState(false);

      const toggleDropdown = () => {
          setShowDropdown(!showDropdown);
          // Optionally clear notifications when opening dropdown:
          if (!showDropdown) setNotifications(0);
      };


        // Dummy last order data - replace with your actual last order data
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


      const [showUpgradeInfo, setShowUpgradeInfo] = useState(false);

      const handleUpgradeClick = () => {
        setShowUpgradeInfo(true);
      };

  return (
    <div className="bg-white min-vh-100">
      {/* Navbar */}
      <Navbar expand="lg" className="bg-white border-bottom shadow-sm px-4 py-2 d-flex align-items-center">
        {/* Logo + Brand */}
          <Navbar.Brand href="#" className="d-flex align-items-center gap-2">
              <span className="fw-semibold text-warning" style={{ fontFamily: 'cursive' }}>
              GoWash
              </span>
          </Navbar.Brand>
        {/* Center: Nav Links */}
          <Nav className="flex-grow-1 justify-content-center gap-4 fw-semibold">
              <Nav.Link href="#" className="text-dark">Home</Nav.Link>
              <Nav.Link href="#" className="text-dark">About Us</Nav.Link>
              <Nav.Link href="#" className="text-dark">Pricing</Nav.Link>
              <Nav.Link href="#" className="text-dark">Contact Us</Nav.Link>
          </Nav>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-3">
            <Dropdown>
                <Dropdown.Toggle
                    variant="light"
                    className="rounded-3 fw-semibold px-3 py-2"
                    id="currency-dropdown"
                >
                    {selectedCurrency}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {currencies.map(currency => (
                    <Dropdown.Item
                        key={currency}
                        active={currency === selectedCurrency}
                        onClick={() => setSelectedCurrency(currency)}
                    >
                        {currency}
                    </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
                </Dropdown>

            <div style={{ position: "relative", display: "inline-block" }}>
          <Button
            variant="light"
            className="rounded-3 p-2"
            onClick={toggleDropdown}
          >
            <i className="bi bi-bell"></i>
            {notifications > 0 && (
              <Badge
                bg="danger"
                pill
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  fontSize: "0.6rem",
                }}
              >
                {notifications}
              </Badge>
            )}
          </Button>

          {showDropdown && (
            <div
              style={{
                position: "absolute",
                right: 0,
                marginTop: 8,
                width: 250,
                background: "white",
                border: "1px solid #ccc",
                borderRadius: 6,
                boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                zIndex: 1000,
              }}
            >
              <div style={{ padding: 12 }}>
                <strong>Notifications</strong>
              </div>
              <hr style={{ margin: 0 }} />
              <div style={{ maxHeight: 150, overflowY: "auto" }}>
                {notifications === 0 ? (
                  <div style={{ padding: 12, color: "#666" }}>
                    No new notifications
                  </div>
                ) : (
                  <>
                    <div style={{ padding: 12 }}>Notification 1</div>
                    <div style={{ padding: 12 }}>Notification 2</div>
                    <div style={{ padding: 12 }}>Notification 3</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

            {/* Profile Dropdown */}
            <Dropdown align="end">
                <Dropdown.Toggle
                  variant="transparent"
                  id="profileDropdown"
                  className="rounded-circle p-2"
                  style={{ cursor: 'pointer', border: 'none' }}
                >
                  <i className="bi bi-person-fill fs-5"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">My Profile</Dropdown.Item>
                  <Dropdown.Item href="#">Orders</Dropdown.Item>
                  <Dropdown.Item href="#">Settings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#" className="text-danger">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </div>
      </Navbar>


        {/* Tabs */}
        <Container className="py-3 position-relative">
        {showPrev && (
          <button className="scroll-btn left" onClick={() => handleScroll("left")}>
            &#8592;
          </button>
        )}
        {showNext && (
          <button className="scroll-btn right" onClick={() => handleScroll("right")}>
            &#8594;
          </button>
        )}
        <div className="scrollable-tabs-wrapper" ref={scrollRef}>
          <ul className="nav nav-pills nav-fill gap-2 p-2 rounded-2 flex-nowrap"
              role="tablist"
              style={{ whiteSpace: 'nowrap', marginBottom: 0 }}>
              {[
                { id: "profile", icon: "fa-id-card", label: "My Profile" },
                { id: "pickup", icon: "fa-user-group", label: "Request Pickup" },
                { id: "order", icon: "fa-ticket", label: "My Order" },
                { id: "occasion", icon: "fa-ticket", label: "Occasional Service" },
                { id: "alteration", icon: "fa-ticket", label: "Alteration Service" },
                { id: "payment", icon: "fa-wallet", label: "Payment Details" },
                { id: "setting", icon: "fa-sliders", label: "Setting" },
                { id: "delete", icon: "fa-trash-can", label: "Delete Profile" },
              ].map((tab) => (
                <li className="nav-item" role="presentation" key={tab.id}>
                  <button
                    className={`nav-link rounded-2 ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                    style={{
                      backgroundColor: activeTab === tab.id ? '#0a3758' : 'transparent',
                      color: activeTab === tab.id ? '#fff' : '#000',
                    }}
                  >
                    <i className={`fa-solid ${tab.icon} me-2`}></i>
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>

        </div>
        </Container>


      {/* Page Body */}
      <Container className="py-2">
        <Row>
          {/* Sidebar */}
          <Col md={3}>
            <Card className="text-white text-center bg-danger mb-3">
              <Card.Body>
                <div className="bg-white rounded-circle mx-auto mb-2" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-person-fill text-danger fs-1"></i>
                </div>
                <h5 className="card-title">Wasant Gawade</h5>
                <p className="card-text small">1st Floor, RK Business Centre,<br />Dharampeth Extension, Shivaji Nagar, Nagpur, Maharashtra, India - 440010</p>
              </Card.Body>
            </Card>

            <StatusItem icon="bi-envelope-fill" title="Verified Email" subtitle="24 May 2025 4:29 AM" />
            <StatusItem icon="bi-phone-fill" title="Verified Mobile Number" subtitle="2024-10-12 12:42:41" />
            <StatusItem icon="bi-clipboard-fill" title="Complete Basic Info" subtitle="Not Verified" />

            <div className="mt-3">
              <p className="text-muted small">Complete Your Profile</p>
              <ProgressBar now={75} label="75%" />
            </div>

           <Button variant="outline-danger" className="mt-3 w-100" onClick={handleUpgradeClick}>
            Upgrade Pro
          </Button>

           {showUpgradeInfo && (
              <Card className="mt-3">
                <Card.Body>
                  <Card.Title>Go Pro and Unlock Premium Features</Card.Title>
                  <Card.Text>
                    ✅ Unlimited access to all features <br />
                    ✅ Priority customer support <br />
                    ✅ Detailed analytics and reporting <br />
                    ✅ Early access to new features <br />
                    <strong>Only ₹499/month</strong>
                  </Card.Text>
                  <Button style={{ backgroundColor:  '#0a3758', color: '#fff' }} >Subscribe Now</Button>
                </Card.Body>
              </Card>
            )}

          </Col>

          {/* Main Content */}
          <Col md={9}>
            {activeTab === "profile" && (
              <Card>
                <Card.Body>
                  <h5 className="mb-4"><i className="bi bi-clipboard"></i> Personal Information</h5>
                   <div className="d-flex align-items-center gap-3 mb-4">
                    <div className="bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                        <i className="bi bi-person-fill fs-2 text-muted"></i>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />

                   <Button
                    variant="light"
                    className="border text-secondary"
                    onClick={handleFileSelect}
                    >
                    <i className="bi bi-upload me-2"></i> Choose File
                    </Button>

                    </div>

                  <Form>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="firstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control defaultValue="Wasant" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="lastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control defaultValue="Gawade" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control defaultValue="wasant@yopmail.com" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="phone">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control defaultValue="5268423028" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control as="textarea" rows={3} defaultValue="1st Floor, RK Business Centre, Dharampeth Extension, Shivaji Nagar, Nagpur, Maharashtra, India - 440010" />
                    </Form.Group>
                    <Button style={{ backgroundColor:  '#0a3758', color: '#fff' }}  variant="primary">Update Details</Button>
                    
                  </Form>
                </Card.Body>
              </Card>
            )}

            {activeTab === "pickup" && (
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
            )}

            {activeTab === "order" && (
                  <>
                    <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-4">
                            <i className="bi bi-cart"></i> My Order
                          </h5>
                           <select
                              className="form-select form-select-sm w-auto"
                              value={selectedStatus}
                              onChange={e => setSelectedStatus(e.target.value)}
                            >
                              <option>All Orders</option>
                              {Object.keys(statusVariant).map(status => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                        </div>

                        {paginatedOrders.map((order, index) => (
                          <div
                            key={index}
                            className="border rounded p-3 mb-3 position-relative"
                          >
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <h6 className="fw-bold mb-1 d-flex align-items-center gap-2">
                                  Order ID: <span className="text-dark">#{order.id}</span>
                                  <span className={`badge bg-${statusVariant[order.status] || "secondary"}`}>
                                    {order.status}
                                  </span>
                                </h6>
                                <small className="text-muted">{order.services.join(", ")}</small>
                              </div>
                              <button
                                type="button" style={{ backgroundColor:  '#0a3758', color: '#fff' }}  
                                className="btn btn-sm btn-outline-primary"
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
                        <Pagination>
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

                    {modalOrder && (
                      <Modal show={showModal} onHide={handleCloseModal} centered>
                        <Modal.Header closeButton>
                          <Modal.Title>Order Details : #{modalOrder.id}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <h6 className="fw-bold mb-2">Service</h6>
                          <div className="mb-3 text-muted">{modalOrder.services.join(", ")}</div>

                          <div className="mb-3 row">
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
                          <div className="d-flex gap-4 flex-wrap mb-4">
                            {modalOrder.products.map((item, idx) => (
                              <div
                                key={idx}
                                className="text-center border p-2 rounded"
                                style={{ minWidth: "120px" }}
                              >
                                {item.image && (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    height="40"
                                    className="mb-2"
                                  />
                                )}
                                <div className="fw-semibold">{item.name}</div>
                                <small className="text-muted">Qty: {item.quantity}</small>
                                <br />
                                <small className="text-muted">Price: ₹{item.price}</small>
                                <br />
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
                              <div className="border p-3 text-danger rounded bg-light">
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
            )}

            {activeTab === "occasion" && (
                <Card>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5><i className="bi bi-calendar-event"></i> Occasional Service Request</h5>
                        </div>

                          <p className="text-muted mb-4">
                          Book special services for festivals, weddings, parties and more.
                          </p>

                          <form>
                          <div className="mb-3">
                              <label className="form-label fw-semibold">Occasion Type</label>
                              <select className="form-select">
                              <option value="">Select Occasion</option>
                              <option>Wedding</option>
                              <option>Festival</option>
                              <option>Birthday</option>
                              <option>House Party</option>
                              <option>Other</option>
                              </select>
                          </div>

                          <div className="row">
                              <div className="mb-3 col-md-6">
                              <label className="form-label fw-semibold">Preferred Date</label>
                              <input type="date" className="form-control" />
                              </div>
                              <div className="mb-3 col-md-6">
                              <label className="form-label fw-semibold">Preferred Time Slot</label>
                              <select className="form-select">
                                  <option value="">Select Time</option>
                                  <option value="8am-10am">8am - 10am</option>
                                  <option value="10am-12pm">10am - 12pm</option>
                                  <option value="12pm-2pm">12pm - 2pm</option>
                                  <option value="2pm-4pm">2pm - 4pm</option>
                                  <option value="4pm-6pm">4pm - 6pm</option>
                              </select>
                              </div>
                          </div>

                          <div className="mb-3">
                              <label className="form-label fw-semibold">Additional Notes</label>
                              <textarea className="form-control" rows="3" placeholder="Any specific instructions or requests?" />
                          </div>

                          <div className="text-end">
                              <button style={{ backgroundColor:  '#0a3758', color: '#fff' }}   type="submit" className="btn btn-primary px-4">
                              Request Service
                              </button>
                          </div>
                          </form>
                    </Card.Body>
                    </Card>

            )}

            {activeTab === "alteration" && (
            <Card>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5><i className="bi bi-tools"></i> Alteration Service Request</h5>
                    </div>
                    
                    <p className="text-muted mb-4">
                    Request clothing alterations such as hemming, fitting, or repair.
                    </p>

                    <form>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Alteration Type</label>
                        <select className="form-select">
                        <option value="">Select Alteration</option>
                        <option>Length Adjustment</option>
                        <option>Sleeve Alteration</option>
                        <option>Waist Fitting</option>
                        <option>Button/Zipper Repair</option>
                        <option>Patchwork</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Garment Type</label>
                        <select className="form-select">
                        <option value="">Select Garment</option>
                        <option>Shirt</option>
                        <option>Pants</option>
                        <option>Dress</option>
                        <option>Jacket</option>
                        <option>Other</option>
                        </select>
                    </div>

                    <div className="row">
                        <div className="mb-3 col-md-6">
                        <label className="form-label fw-semibold">Preferred Pickup Date</label>
                        <input type="date" className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                        <label className="form-label fw-semibold">Preferred Time</label>
                        <select className="form-select">
                            <option value="">Select Time</option>
                            <option value="8am-10am">8am - 10am</option>
                            <option value="10am-12pm">10am - 12pm</option>
                            <option value="12pm-2pm">12pm - 2pm</option>
                            <option value="2pm-4pm">2pm - 4pm</option>
                            <option value="4pm-6pm">4pm - 6pm</option>
                        </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-semibold">Additional Instructions</label>
                        <textarea className="form-control" rows="3" placeholder="Describe your alteration needs..." />
                    </div>

                    <div className="text-end">
                        <button style={{ backgroundColor:  '#0a3758', color: '#fff' }}   type="submit" className="btn btn-primary px-4">
                        Submit Request
                        </button>
                    </div>
                    </form>
                </Card.Body>
                </Card>

            )}

            {activeTab === "donation" && (
              <Card className="text-center p-4">
                  <Card.Body>
                  <h5 className="mb-3">Donation Pickup</h5>
                  <div className="text-muted">🚧 Coming Soon</div>
                  </Card.Body>
              </Card>
            )}


           {activeTab === "payment" && (
                <Card>
                   <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5><i className="bi bi-credit-card"></i> Payment Details</h5>
                      </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                        <div className="border rounded p-3 bg-light">
                            <h6 className="fw-semibold mb-2">Saved Payment Method</h6>
                            <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <div className="fw-bold">VISA **** 1234</div>
                                <small className="text-muted">Expires: 08/26</small>
                            </div>
                            <button className="btn btn-sm btn-outline-danger">Remove</button>
                            </div>
                        </div>
                        </div>

                        <div className="col-md-6">
                        <div className="border rounded p-3 bg-light">
                            <h6 className="fw-semibold mb-2">Add New Card</h6>
                            <form>
                            <input type="text" className="form-control mb-2" placeholder="Card Number" />
                            <div className="d-flex gap-2 mb-2">
                                <input type="text" className="form-control" placeholder="MM/YY" />
                                <input type="text" className="form-control" placeholder="CVV" />
                            </div>
                            <button  style={{ backgroundColor:  '#0a3758', color: '#fff' }}   className="btn btn-primary btn-sm w-100">Save Card</button>
                            </form>
                        </div>
                        </div>
                    </div>

                    <hr />

                    <div className="mt-4">
                        <h6 className="fw-semibold mb-2">Transaction History</h6>
                        <table className="table table-bordered table-sm">
                        <thead className="table-light">
                            <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Mode</th>
                            <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>001</td>
                            <td>24 May 2025</td>
                            <td>₹500</td>
                            <td>Credit Card</td>
                            <td><span className="badge bg-success">Paid</span></td>
                            </tr>
                            <tr>
                            <td>002</td>
                            <td>22 May 2025</td>
                            <td>₹250</td>
                            <td>UPI</td>
                            <td><span className="badge bg-success">Paid</span></td>
                            </tr>
                            <tr>
                            <td>003</td>
                            <td>19 May 2025</td>
                            <td>₹300</td>
                            <td>Cash</td>
                            <td><span className="badge bg-secondary">Pending</span></td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </Card.Body>
                </Card>
            )}


            {activeTab === "setting" && (
                <Card>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5>
                        <i className="bi bi-gear-fill"></i> Setting
                      </h5>
                    </div>
                    {/* Password Change */}
                    <div className="mb-4">
                        <h6 className="fw-semibold mb-3">Change Password</h6>
                        <form className="row g-3">
                        <div className="col-md-4">
                            <input type="password" className="form-control" placeholder="Current Password" />
                        </div>
                        <div className="col-md-4">
                            <input type="password" className="form-control" placeholder="New Password" />
                        </div>
                        <div className="col-md-4">
                            <input type="password" className="form-control" placeholder="Confirm Password" />
                        </div>
                        <div className="col-12">
                            <button style={{ backgroundColor:  '#0a3758', color: '#fff' }}   className="btn btn-warning mt-2">Update Password</button>
                        </div>
                        </form>
                    </div>

                    <hr />

                    {/* Notification Preferences */}
                    <div>
                        <h6 className="fw-semibold mb-3">Notification Preferences</h6>
                        <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="emailNoti" defaultChecked />
                        <label className="form-check-label" htmlFor="emailNoti">
                            Receive email notifications
                        </label>
                        </div>
                        <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="smsNoti" />
                        <label className="form-check-label" htmlFor="smsNoti">
                            Receive SMS updates
                        </label>
                        </div>
                        <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="promoNoti" defaultChecked />
                        <label className="form-check-label" htmlFor="promoNoti">
                            Get promotional offers
                        </label>
                        </div>
                        <button style={{ backgroundColor:  '#0a3758', color: '#fff' }}   className="btn btn-success mt-2">Save Preferences</button>
                    </div>
                    </Card.Body>
                </Card>
            )}


           {activeTab === "delete" && (
                <Card>
                    <Card.Body>
                    <h5> <i className="bi bi-trash-fill"></i> Delete Profile</h5>

                    <p className="text-muted">
                        This action will permanently delete your profile and all associated data. This cannot be undone.
                    </p>

                    <div className="alert alert-warning">
                        Please confirm that you want to delete your profile. We’re sorry to see you go!
                    </div>

                    <button className="btn btn-outline-danger" onClick={() => setShowDeleteModal(true)}>
                        Delete My Profile
                    </button>

                    {/* Delete Confirmation Modal */}
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                        <Modal.Header closeButton>
                        <Modal.Title className="text-danger">Confirm Deletion</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p>
                            Are you absolutely sure you want to delete your profile? This action cannot be undone.
                        </p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDeleteProfile}>
                            Yes, Delete
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    </Card.Body>
                </Card>
            )}

          </Col>
        </Row>
      </Container>
    </div>
  );
};

const StatusItem = ({ icon, title, subtitle }) => (
  <div className="d-flex align-items-start gap-2 mb-2">
    <i className={`bi ${icon} fs-4 text-muted`}></i>
    <div>
      <div className="fw-semibold small">{title}</div>
      <div className="text-muted small">{subtitle}</div>
    </div>
  </div>
);

export default ProfilePage;
