import React from "react";

const Contact = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contact Us</h2>
      <p style={styles.message}>Coming Soon 📞</p>
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
    backgroundColor: "#fdfdfd",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#17a2b8", // A calm blueish tone
  },
  message: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};

export default Contact;
