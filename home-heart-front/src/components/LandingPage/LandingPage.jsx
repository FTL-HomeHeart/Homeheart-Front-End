import React from "react";
import HowItWorks from "./HowItWorks";
import Vision from "./Vision";
import Features from "./Features";
import Testimonials from "./Testimonials";
import ImageCard from "./Hero";
import MedicalProfessionalsGrid from "../MedicalProfessionalsGrid/MedicalProfessionalsGrid";
const LandingPage = () => {
  return (
    <div>
      <ImageCard />
      <HowItWorks />
      <Vision />
      <Features />
      <Testimonials />
      <MedicalProfessionalsGrid />
    </div>
  );
};

export default LandingPage;
