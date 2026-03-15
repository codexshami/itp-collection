import React from "react";
import { Link } from "react-router-dom";

const Docs = () => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>DOCTORS</h1>
        <p>
          Welcome to the City Hospital Doctors Portal! Here, you can find all
          the information you need about our esteemed team of medical
          professionals. Our doctors are experts in their fields, committed to
          providing exceptional care and ensuring the well-being of our
          patients. Browse through the profiles to learn more about their
          specializations, experience, and the services they offer. Whether you
          need a consultation, a second opinion, or ongoing treatment, our
          doctors are here to help you achieve your health goals.
        </p>
        <Link to={"/doctors"} className="link-button">
          Click here to view all doctors
        </Link>
      </div>
      <div className="banner">
        <img src="/doc.webp" alt="hero" className="animated-image" />
      </div>
    </div>
  );
};

export default Docs;
