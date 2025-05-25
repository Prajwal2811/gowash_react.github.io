import React, { useState } from "react";
import "./Pricing.css";

const services = [
  "Dry Clean",
  "Wash and Steam Iron",
  "Wash and Fold",
  "Shoe Cleaning",
  "Steam Iron",
  "Carpet Cleaning",
  "Curtain Laundry",
  "Stain Removals",
];

  const itemsData = {
    "Dry Clean": [
      "Shirt", "Trousers", "Saree", "Kurta", "Salwar", "Jeans", "Jacket", "Coat", "Blazer", "Dress",
      "Skirt", "Scarf", "Dupatta", "Sweater", "Hoodie", "Waistcoat", "Gown", "Suit", "Overcoat", "Tunic"
    ],
    "Wash and Steam Iron": [
      "Shirt", "T-shirt", "Trousers", "Kurta", "Pajama", "Top", "Blouse", "Leggings", "Jeans", "Skirt",
      "Shorts", "Salwar", "Tank Top", "Dungaree", "Track Pant", "Hoodie", "Sweatpants", "Pullover", "Vest", "Capri"
    ],
    "Wash and Fold": [
      "Bedsheet", "Pillow Cover", "Towel", "Handkerchief", "Curtain", "Blanket", "Napkin", "Bathrobe", "Mat", "Duvet",
      "Quilt", "Sofa Cover", "Rug", "Apron", "Cushion Cover", "Doormat", "Table Cloth", "Washcloth", "Comforter", "Fleece Blanket"
    ],
    "Shoe Cleaning": [
      "Sports Shoes", "Formal Shoes", "Casual Shoes", "Leather Boots", "Sneakers", "Heels", "Sandals", "Loafers", "Ankle Boots", "Flip-Flops",
      "Canvas Shoes", "Moccasins", "Running Shoes", "Slippers", "Crocs", "Juttis", "Wedges", "Derby Shoes", "Oxford Shoes", "Platform Shoes"
    ],
    "Steam Iron": [
      "Shirt", "Trousers", "Top", "Saree", "Kurta", "Jeans", "Blouse", "Dupatta", "Salwar", "Skirt",
      "Dress", "Gown", "Scarf", "Hoodie", "Coat", "Tunic", "Jacket", "Sweater", "Polo T-shirt", "Tank Top"
    ],
    "Carpet Cleaning": [
      "Small Carpet", "Medium Carpet", "Large Carpet", "Wool Carpet", "Silk Carpet", "Cotton Carpet", "Shaggy Carpet", "Runner Carpet", "Bathroom Mat", "Doormat",
      "Handmade Rug", "Machine Rug", "Area Rug", "Persian Carpet", "Kilim Carpet", "Kids Play Mat", "Bedside Mat", "Prayer Rug", "Living Room Rug", "Entrance Rug"
    ],
    "Curtain Laundry": [
      "Window Curtain", "Door Curtain", "Sheer Curtain", "Heavy Curtain", "Silk Curtain", "Cotton Curtain", "Blackout Curtain", "Shower Curtain", "Valance", "Drapes",
      "Eyelet Curtain", "Tab Top Curtain", "Rod Pocket Curtain", "Linen Curtain", "Polyester Curtain", "Thermal Curtain", "Velvet Curtain", "Patterned Curtain", "Plain Curtain", "Layered Curtain"
    ],
    "Stain Removals": [
      "Shirt (Ink Stain)", "Jeans (Oil Stain)", "Saree (Food Stain)", "Kurta (Color Bleed)", "Dress (Makeup Stain)", "Top (Grease)", "Trousers (Mud)", "Coat (Coffee)", "Sweater (Wine)", "Jacket (Rust)",
      "Dupatta (Sweat)", "Scarf (Paint)", "Skirt (Lipstick)", "Leggings (Pen Ink)", "Hoodie (Chewing Gum)", "Blouse (Blood Stain)", "Shorts (Tea)", "Waistcoat (Marker)", "Polo T-shirt (Oil)", "Suit (Curry)"
    ]
  };

const serviceItems = {};
for (const service in itemsData) {
  serviceItems[service] = itemsData[service].map((item) => ({
    name: item,
    price: Math.floor(Math.random() * 100) + 30,
  }));
}

const Pricing = () => {
  const [activeTab, setActiveTab] = useState(services[0]);

  return (
    <div className="pricing-container">
      <h2 className="pricing-heading">Our Laundry Services</h2>

      <div className="pricing-tabs">
        {services.map((service) => (
          <button
            key={service}
            onClick={() => setActiveTab(service)}
            className={`pricing-tab ${
              activeTab === service ? "active" : ""
            }`}
          >
            {service}
          </button>
        ))}
      </div>

      <div className="pricing-card">
        <h3 className="pricing-subheading">{activeTab} Pricing</h3>
        <ul className="pricing-list">
          {serviceItems[activeTab].map((item, index) => (
            <li key={index} className="pricing-item">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pricing;
