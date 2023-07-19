import React from "react";
import HowItWorks from "./HowItWorks";
import Vision from "./Vision";
import Features from "./Features";
import Testimonials from "./Testimonials";
import ImageCard from "./Hero";
const LandingPage = () => {
  return (
    <div>
      <ImageCard />
      <HowItWorks />
      <Vision />
      <Features />
      <Testimonials />
    </div>
  );
};

export default LandingPage;
