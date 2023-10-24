import React from "react";
import { useEffect, useState } from "react";
import "./OfferBanner.css";

const imageUrls = [
  "https://images.pexels.com/photos/5668770/pexels-photo-5668770.jpeg?auto=compress&cs=tinysrgb&w=600"
];

function OfferBanner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const backgroundImageStyle = {
    backgroundImage: `url(${imageUrls[currentImageIndex]})`,
    animation: "fade 1s linear forwards",
  };

  return (
    <div className="container">
      <div className="offerbanner-container" style={backgroundImageStyle}>
        <p>
          A new online shop
          <br />
          experience
        </p>
        <h4>
          Inspiring Connections: Empowering through Technology
          <br />
          Unlocking Potential, Enabling Progress: Embrace the Power of
          Technology
        </h4>
        <button
          className="btn btn-lg btn-outline-light"
          style={{ width: "250px", height: "50px", fontWeight: "900", color: "black " }}
        >
          SignUp
        </button>
      </div>
    </div>
  );
}

export default OfferBanner;
