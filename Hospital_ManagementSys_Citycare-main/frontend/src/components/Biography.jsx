import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who we are</h3>
        <p>
          City Hospital is a dedicated provider of advanced hospital management
          solutions designed to enhance efficiency and elevate patient care.
        </p>
        <p>
          At City Hopital , we understand the intricate challenges faced by
          hospitals and clinics in managing operations while delivering
          high-quality care.
        </p>
        <p>
          Our robust platform includes essential modules such as patient
          management, appointment scheduling, billing and invoicing, inventory
          control, and insightful analytics.
        </p>
        <p>
          Backed by a team of passionate healthcare and technology experts, City
          Hopital is committed to providing exceptional customer service and
          continuous innovation
        </p>
        <p>
          We collaborate closely with our clients to understand their challenges
          and deliver tailored solutions that drive operational excellence and
          positive patient outcomes.
        </p>
        <p>
          Join us in transforming healthcare management with City Hospital.
          Empower your institution to thrive in a dynamic healthcare landscape,
          while ensuring a seamless and compassionate experience for patients.
        </p>
      </div>
    </div>
  );
};

export default Biography;
