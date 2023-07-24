import React from "react";
import HowItWorks from "./HowItWorks";
import Vision from "./Vision";
import Features from "./Features";
import Testimonials from "./Testimonials";
import ImageCard from "./Hero";
import MedicalProfessionalsGrid from "../MedicalProfessionalsGrid/MedicalProfessionalsGrid";
import MedicalProfessionalDetailedView from "../MedicalProfessionalDetailedView/MedicalProfessionalDetailedView";
import AppointmetConfirmedPage from "../AppointmentConfirmed/AppointmetConfirmed";
const LandingPage = () => {
  return (
    <div>
      <ImageCard />
      <HowItWorks />
      <Vision />
      <Features />
      <Testimonials />
      <MedicalProfessionalsGrid />
      <MedicalProfessionalDetailedView /> 
      {/* <AppointmetConfirmedPage /> */}
    </div>
  );
};

export default LandingPage;
