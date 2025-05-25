import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [animate, setAnimate] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      quote:
        '"GoWash has made laundry so easy! I can schedule pickups with just a few taps."',
      author: "— Priya S., Mumbai",
    },
    {
      quote: '"Affordable and reliable. I use GoWash every week!"',
      author: "— Rahul K., Delhi",
    },
    {
      quote: '"Fast and convenient service, highly recommend GoWash!"',
      author: "— Komal K., Nagpur",
    },
    {
      quote: '"Excellent customer support and timely pickups. Love GoWash!"',
      author: "— Girish P., Pune",
    },
    {
      quote: '"GoWash saves me so much time, a must-have service."',
      author: "— Tushar M., Hyderabad",
    },
    {
      quote:
        '"Reliable and hygienic. I trust GoWash for all my laundry needs."',
      author: "— Suraj D., Pune",
    },
    {
      quote: '"Affordable pricing and great service. GoWash is my go-to."',
      author: "— Aditya S., Indore",
    },
    {
      quote:
        '"Simple app, quick service, and excellent results every time."',
      author: "— Nilesh K., Kalyan",
    },
  ];

  const totalTestimonials = testimonials.length;

  // Ref to store the timer ID so we can clear on unmount or manual change
  const autoScrollTimer = useRef(null);

  useEffect(() => {
    // Animate page fade in on mount
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Clear any previous timer
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
    // Set interval to auto scroll every 3 seconds
    autoScrollTimer.current = setInterval(() => {
      setCurrentTestimonial((prev) =>
        prev === totalTestimonials - 1 ? 0 : prev + 1
      );
    }, 3000);

    // Cleanup on unmount
    return () => clearInterval(autoScrollTimer.current);
  }, [totalTestimonials]);

  const goToProfile = () => {
    navigate("/my-profile");
  };

  // On manual click, reset timer to avoid instant auto change
  const nextTestimonial = () => {
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    setCurrentTestimonial((prev) =>
      prev === totalTestimonials - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    setCurrentTestimonial((prev) =>
      prev === 0 ? totalTestimonials - 1 : prev - 1
    );
  };

  const styles = {
    page: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#333",
      backgroundColor: "#f7f9fc",
      paddingBottom: "60px",
    },
    banner: {
      backgroundColor: "#007BFF",
      color: "#fff",
      padding: "80px 20px",
      textAlign: "center",
      opacity: animate ? 1 : 0,
      animationName: animate ? "fadeIn" : undefined,
      animationDuration: "1s",
      animationFillMode: "forwards",
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
      transition: "background-color 0.3s ease, color 0.3s ease",
    },
    services: {
      padding: "60px 20px",
      textAlign: "center",
      opacity: animate ? 1 : 0,
      animationName: animate ? "fadeIn" : undefined,
      animationDuration: "1s",
      animationFillMode: "forwards",
      animationDelay: "0.4s",
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
      opacity: 0,
      animationName: "fadeIn",
      animationDuration: "1s",
      animationFillMode: "forwards",
      animationTimingFunction: "ease-out",
    },
    cardTitle: {
      fontSize: "1.2rem",
      marginBottom: "10px",
      color: "#007BFF",
    },
    testimonials: {
      padding: "60px 20px",
      backgroundColor: "#e9f3ff",
      textAlign: "center",
      opacity: animate ? 1 : 0,
      animationName: animate ? "fadeIn" : undefined,
      animationDuration: "1s",
      animationFillMode: "forwards",
      animationDelay: "1.4s",
    },
    testimonialBox: {
      maxWidth: "600px",
      margin: "20px auto",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease",
      opacity: 0,
      animationName: "fadeIn",
      animationDuration: "1s",
      animationFillMode: "forwards",
      animationTimingFunction: "ease-out",
      position: "relative",
      minHeight: "130px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    quote: {
      fontSize: "1.1rem",
      fontStyle: "italic",
      marginBottom: "10px",
    },
    author: {
      fontWeight: "bold",
      color: "#555",
      marginTop: "auto",
    },
    footer: {
      backgroundColor: "#007BFF",
      color: "white",
      padding: "20px 15px",
      textAlign: "center",
      fontSize: "0.9rem",
      opacity: animate ? 1 : 0,
      animationName: animate ? "fadeIn" : undefined,
      animationDuration: "1s",
      animationFillMode: "forwards",
      animationDelay: "2.3s",
    },
    footerLink: {
      color: "#dbe9ff",
      margin: "0 10px",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
    sliderControls: {
      marginTop: "15px",
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    },
    iconButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "8px",
      borderRadius: "50%",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
      transition: "background-color 0.3s ease",
      width: "40px",
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#007BFF",
      fontSize: "20px",
      userSelect: "none",
    },
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 6px 15px rgba(0, 123, 255, 0.3);
        }
        .banner-button:hover {
          background-color: #0056b3;
          color: white;
        }
        .testimonial-box:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        .icon-button:hover {
          background-color: #007BFF;
          color: white;
        }
        a.footer-link:hover {
          color: #fff !important;
          text-decoration: underline;
        }
      `}</style>

      <div style={styles.page}>
        {/* Banner */}
        <section style={styles.banner}>
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

        {/* Services */}
        <section style={styles.services}>
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
                  animationDelay: `${0.6 + i * 0.3}s`,
                  opacity: 1,
                }}
              >
                <h3 style={styles.cardTitle}>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Slider */}
        <section style={styles.testimonials}>
          <h2 style={styles.sectionHeading}>What Our Customers Say</h2>

          <div
            className="testimonial-box"
            style={{
              ...styles.testimonialBox,
              opacity: animate ? 1 : 0,
              animationDelay: "1.5s",
            }}
          >
            <p style={styles.quote}>{testimonials[currentTestimonial].quote}</p>
            <p style={styles.author}>{testimonials[currentTestimonial].author}</p>
          </div>

          <div style={styles.sliderControls}>
            <button
              aria-label="Previous Testimonial"
              onClick={prevTestimonial}
              className="icon-button"
              style={styles.iconButton}
            >
              {/* Left Arrow SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L6.707 7l4.647 4.646a.5.5 0 0 1-.708.708l-5-5a.5.5 0 0 1 0-.708l5-5a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>

            <button
              aria-label="Next Testimonial"
              onClick={nextTestimonial}
              className="icon-button"
              style={styles.iconButton}
            >
              {/* Right Arrow SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l5 5a.5.5 0 0 1 0 .708l-5 5a.5.5 0 1 1-.708-.708L9.293 7 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>© 2025 GoWash. All rights reserved.</p>
          <p>
            <a href="/about" className="footer-link" style={styles.footerLink}>
              About
            </a>
            |
            <a href="/contact" className="footer-link" style={styles.footerLink}>
              Contact
            </a>
            |
            <a href="/privacy" className="footer-link" style={styles.footerLink}>
              Privacy Policy
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Home;
