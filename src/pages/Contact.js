import React from "react";

const Contact = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.columns}>
          {/* Left Side: Contact Form */}
          <div style={styles.left}>
            <h2 style={styles.heading}>Contact Us</h2>
            <form style={styles.form}>
              <input type="text" placeholder="Your Name" style={styles.input} required />
              <input type="email" placeholder="Your Email" style={styles.input} required />
              <textarea placeholder="Your Message" rows="4" style={styles.textarea} required />
              <button type="submit" style={styles.button}>Send Message</button>
            </form>
          </div>

          {/* Right Side: Contact Details */}
          <div style={styles.right}>
            <h3 style={styles.subheading}>Get in Touch</h3>
            <p style={styles.detail}><strong>📧 Email:</strong> support@example.com</p>
            <p style={styles.detail}><strong>📞 Phone:</strong> +91 98765 43210</p>
            <p style={styles.detail}><strong>📍 Address:</strong> 123, Main Street, Mumbai, India</p>
            <p style={styles.note}>We typically respond within 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    fontFamily: "'Segoe UI', sans-serif",
    boxSizing: "border-box",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "1000px",
    width: "100%",
    padding: "30px",
    boxSizing: "border-box",
  },
  columns: {
    display: "flex",
    flexDirection: "row",
    gap: "30px",
    flexWrap: "wrap",
  },
  left: {
    flex: "1 1 50%",
    minWidth: "280px",
  },
  right: {
    flex: "1 1 50%",
    minWidth: "280px",
    paddingLeft: "20px",
    borderLeft: "1px solid #eee",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#0d6efd",
  },
  subheading: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    color: "#333",
  },
  detail: {
    fontSize: "1rem",
    marginBottom: "12px",
    color: "#555",
  },
  note: {
    marginTop: "20px",
    fontStyle: "italic",
    color: "#888",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  textarea: {
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    resize: "vertical",
    width: "100%",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px",
    fontSize: "1rem",
    backgroundColor: "#0d6efd",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
  },
};

// Add responsive behavior using a media query
const mediaQuery = window.matchMedia("(max-width: 768px)");
if (mediaQuery.matches) {
  styles.columns.flexDirection = "column";
  styles.right.paddingLeft = "0";
  styles.right.borderLeft = "none";
  styles.right.paddingTop = "20px";
}

export default Contact;
