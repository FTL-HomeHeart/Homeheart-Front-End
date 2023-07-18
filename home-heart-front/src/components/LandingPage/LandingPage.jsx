import React from "react";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import Testimonials from "./Testimonials";
import ImageCard from "./Hero";
const LandingPage = () => {
  return (
    <div>
      <ImageCard />
      <HowItWorks />
      <Features />
      <Testimonials />
    </div>
  );
};

export default LandingPage;
