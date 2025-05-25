import React, { useRef, useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const AppTabs = ({ activeTab, setActiveTab }) => {
  const scrollRef = useRef();
  const scrollAmount = 150;

  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  const tabs = [
    { id: "profile", icon: "fa-id-card", label: "My Profile" },
    { id: "pickup", icon: "fa-user-group", label: "Request Pickup" },
    { id: "order", icon: "fa-ticket", label: "My Order" },
    { id: "occasion", icon: "fa-calendar-days", label: "Occasional Service" },
    { id: "alteration", icon: "fa-scissors", label: "Alteration Service" },
    { id: "payment", icon: "fa-wallet", label: "Payment Details" },
    { id: "setting", icon: "fa-sliders", label: "Setting" },
    { id: "delete", icon: "fa-trash-can", label: "Delete Profile" },
  ];

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    const scrollTo =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
    container.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  const checkButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowPrev(el.scrollLeft > 0);
    setShowNext(el.scrollLeft + el.offsetWidth < el.scrollWidth);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkButtons();
    el.addEventListener("scroll", checkButtons);
    return () => el.removeEventListener("scroll", checkButtons);
  }, []);

  return (
   <Container className="py-3 position-relative">
  {/* Scroll Left Button */}
  {showPrev && (
    <button
      className="scroll-btn left"
      onClick={() => handleScroll("left")}
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
        zIndex: 10,
        background: "#fff",
        border: "none",
        padding: "0.5rem 0.75rem",
        fontSize: "1.2rem",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        borderRadius: "0.5rem",
      }}
    >
      &#8592;
    </button>
  )}

  {/* Scrollable Tab List */}
  <div
    className="scrollable-tabs-wrapper"
    ref={scrollRef}
    style={{
      overflowX: "auto",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }}
  >
    <ul
      className="nav nav-pills nav-fill gap-2 p-2 rounded-2 flex-nowrap d-flex"
      role="tablist"
      style={{
        whiteSpace: "nowrap",
        marginBottom: 0,
        minWidth: "max-content",
      }}
    >
      {tabs.map((tab) => (
        <li className="nav-item" role="presentation" key={tab.id}>
          <button
            className={`nav-link rounded-2 ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
            type="button"
            style={{
              backgroundColor: activeTab === tab.id ? "#0a3758" : "transparent",
              color: activeTab === tab.id ? "#fff" : "#000",
              whiteSpace: "nowrap",
              minWidth: 120,
            }}
          >
            <i className={`fa-solid ${tab.icon} me-2`}></i>
            {tab.label}
          </button>
        </li>
      ))}
    </ul>
  </div>

  {/* Scroll Right Button */}
  {showNext && (
    <button
      className="scroll-btn right"
      onClick={() => handleScroll("right")}
      style={{
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translateY(-50%)",
        zIndex: 10,
        background: "#fff",
        border: "none",
        padding: "0.5rem 0.75rem",
        fontSize: "1.2rem",
        cursor: "pointer",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        borderRadius: "0.5rem",
      }}
    >
      &#8594;
    </button>
  )}
</Container>

  );
};

export default AppTabs;
