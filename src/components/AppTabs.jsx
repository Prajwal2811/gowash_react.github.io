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
      {showPrev && (
        <button className="scroll-btn left" onClick={() => handleScroll("left")}>&#8592;</button>
      )}
      {showNext && (
        <button className="scroll-btn right" onClick={() => handleScroll("right")}>&#8594;</button>
      )}
      <div className="scrollable-tabs-wrapper" ref={scrollRef}>
        <ul
          className="nav nav-pills nav-fill gap-2 p-2 rounded-2 flex-nowrap"
          role="tablist"
          style={{ whiteSpace: 'nowrap', marginBottom: 0 }}
        >
          {tabs.map((tab) => (
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
  );
};

export default AppTabs;
