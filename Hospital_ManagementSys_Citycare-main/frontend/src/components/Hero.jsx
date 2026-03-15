import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className=" banner">
        <h1>{title}</h1>
        <p>
          {" "}
          Welcome to City Hospital!, your premier solution for streamlined
          healthcare administration.At our hospital, we believe in leveraging
          cutting-edge technology to simplify complex processes. Our
          comprehensive suite of features includes robust patient management,
          seamless appointment scheduling, integrated billing and invoicing,
          inventory management, and insightful analytics.{" "}
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
