import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About GoWash</h2>
      <p style={styles.message}>Coming Soon 🚀</p>
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
    color: "#555",
    backgroundColor: "#f0f4f8",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#007BFF",
  },
  message: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};

export default About;
