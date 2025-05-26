import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">
      <div className="about-card">
        <div className="accent-bar" />
        <div className="about-content">
          <h2 className="about-heading">About GoWash</h2>
          <p className="about-text">
            At <span className="highlight">GoWash</span>, we believe in making laundry effortless, convenient, and eco-friendly.
            Founded in 2025, our mission is to transform the way people care for their clothes by offering fast, reliable,
            and affordable laundry services right at your doorstep.
          </p>
          <p className="about-text">
            We use advanced cleaning techniques and environmentally safe detergents to ensure your garments are treated
            with the utmost care. Whether it's daily wear, delicate fabrics, or special occasions, GoWash handles it all
            with professional expertise.
          </p>
          <p className="about-text">
            Customer satisfaction is at the heart of everything we do. Our easy-to-use app and website allow you to schedule
            pickups and deliveries seamlessly, so you can spend less time worrying about laundry and more time doing what you love.
          </p>
          <p className="about-text">
            Join thousands of happy customers who trust GoWash for their laundry needs. We’re committed to quality, sustainability,
            and exceptional service. Experience the future of laundry today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
