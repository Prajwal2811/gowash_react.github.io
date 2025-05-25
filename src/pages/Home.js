import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fadeInAnimation = {
  animationName: "fadeIn",
  animationDuration: "1s",
  animationFillMode: "forwards",
  opacity: 0,
};

const Home = () => {
  const navigate = useNavigate();

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const goToProfile = () => {
    navigate("/my-profile");
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
          .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 6px 15px rgba(0, 123, 255, 0.3);
          }
          .service-card {
            transition: all 0.3s ease;
          }
          .banner-button:hover {
            background-color: #0056b3;
            color: white;
          }
          .testimonial-box {
            transition: transform 0.3s ease;
          }
          .testimonial-box:hover {
            transform: scale(1.03);
            box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          }
          .footer {
            background-color: #007BFF;
            color: white;
            padding: 20px 15px;
            text-align: center;
            font-size: 0.9rem;
            opacity: 0;
            animation-name: fadeIn;
            animation-duration: 1s;
            animation-fill-mode: forwards;
          }
          .footer a {
            color: #dbe9ff;
            margin: 0 10px;
            text-decoration: none;
            transition: color 0.3s ease;
          }
          .footer a:hover {
            color: #fff;
            text-decoration: underline;
          }
        `}
      </style>

      <div style={styles.page}>
        {/* Banner Section */}
        <section
          style={{
            ...styles.banner,
            ...(animate ? fadeInAnimation : {}),
          }}
        >
          <h1 style={styles.bannerTitle}>Welcome to GoWash 🚿</h1>
          <p style={styles.bannerSubtitle}>
            Smart Laundry Scheduling at Your Fingertips
          </p>
          <button
            className="banner-button"
            style={styles.bannerButton}
            onClick={goToProfile}
          >
            Go to My Profile
          </button>
        </section>

        {/* Services Section */}
        <section
          style={{
            ...styles.services,
            ...(animate ? { ...fadeInAnimation, animationDelay: "0.4s" } : {}),
          }}
        >
          <h2 style={styles.sectionHeading}>Our Services</h2>
          <div style={styles.serviceGrid}>
            {[
              {
                title: "📦 Pickup & Delivery",
                desc: "Schedule laundry pickup and delivery right from your dashboard.",
              },
              {
                title: "🧼 Washing & Folding",
                desc: "Professional cleaning and folding with high-quality detergents.",
              },
              {
                title: "💳 Online Payments",
                desc: "Pay securely online with multiple payment options.",
              },
            ].map(({ title, desc }, i) => (
              <div
                key={i}
                className="service-card"
                style={{
                  ...styles.serviceCard,
                  opacity: 0,
                  animationName: "fadeIn",
                  animationDuration: "1s",
                  animationFillMode: "forwards",
                  animationDelay: `${0.6 + i * 0.3}s`,
                }}
              >
                <h3 style={styles.cardTitle}>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          style={{
            ...styles.testimonials,
            ...(animate ? { ...fadeInAnimation, animationDelay: "1.4s" } : {}),
          }}
        >
          <h2 style={styles.sectionHeading}>What Our Customers Say</h2>
          {[
            {
              quote:
                '"GoWash has made laundry so easy! I can schedule pickups with just a few taps."',
              author: "— Priya S., Mumbai",
            },
            {
              quote: '"Affordable and reliable. I use GoWash every week!"',
              author: "— Rahul K., Delhi",
            },
          ].map(({ quote, author }, i) => (
            <div
              key={i}
              className="testimonial-box"
              style={{
                ...styles.testimonialBox,
                opacity: 0,
                animationName: "fadeIn",
                animationDuration: "1s",
                animationFillMode: "forwards",
                animationDelay: `${1.6 + i * 0.3}s`,
              }}
            >
              <p style={styles.quote}>{quote}</p>
              <p style={styles.author}>{author}</p>
            </div>
          ))}
        </section>

        {/* Footer Section */}
        <footer
          className="footer"
          style={animate ? { animationDelay: "2.3s" } : {}}
        >
          <p>Designed and Developed By Prajwal I | © 2025 GoWash. All rights reserved.</p>
          <p>
            <a href="/terms">Terms</a> | <a href="/privacy">Privacy</a> |{" "}
            <a href="/contact">Contact Us</a>
          </p>
        </footer>

      </div>
    </>
  );
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
    backgroundColor: "#f7f9fc",
    paddingBottom: "60px",
  },

  // Banner
  banner: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "80px 20px",
    textAlign: "center",
    opacity: 0,
  },
  bannerTitle: {
    fontSize: "3rem",
    marginBottom: "10px",
  },
  bannerSubtitle: {
    fontSize: "1.2rem",
    marginBottom: "25px",
  },
  bannerButton: {
    padding: "12px 25px",
    fontSize: "1rem",
    backgroundColor: "#fff",
    color: "#007BFF",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },

  // Services
  services: {
    padding: "60px 20px",
    textAlign: "center",
    opacity: 0,
  },
  sectionHeading: {
    fontSize: "2rem",
    color: "#007BFF",
    marginBottom: "30px",
  },
  serviceGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  serviceCard: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    width: "280px",
    textAlign: "left",
  },
  cardTitle: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#007BFF",
  },

  // Testimonials
  testimonials: {
    padding: "60px 20px",
    backgroundColor: "#e9f3ff",
    textAlign: "center",
    opacity: 0,
  },
  testimonialBox: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease",
  },
  quote: {
    fontSize: "1.1rem",
    fontStyle: "italic",
    marginBottom: "10px",
  },
  author: {
    fontWeight: "bold",
    color: "#555",
  },
};

export default Home;
