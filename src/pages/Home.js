import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate("/my-profile");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to GoWash Home</h2>
      <p style={styles.message}>Under Development 🚧</p>
      <button style={styles.button} onClick={goToProfile}>
        Go to My Profile
      </button>
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
    color: "#333",
    backgroundColor: "#f7f9fc",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "15px",
    color: "#007BFF",
  },
  message: {
    fontSize: "1.3rem",
    marginBottom: "25px",
    fontWeight: "bold",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
