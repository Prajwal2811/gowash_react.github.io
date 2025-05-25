import React from "react";

const Pricing = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Our Pricing Plans</h2>
      <p style={styles.message}>Coming Soon 💸</p>
    </div>
  );
};

const styles = {
  container: {
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#444",
    backgroundColor: "#f3f6fa",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#28a745",
  },
  message: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};

export default Pricing;
