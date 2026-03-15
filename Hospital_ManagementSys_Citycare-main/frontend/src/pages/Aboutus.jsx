import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Docs from "./Docs";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | CityCare Medical Institute"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
      <Docs />
    </>
  );
};

export default AboutUs;
