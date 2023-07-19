import React from "react";
import Features from "./Features";
import ImageCard from "./Hero";
import ImageCardGetStarted from "../GetStartedPage/GetStartedPage";
export default function AuthenticatedLandingPage() {
  return (
    <div>
      <ImageCardGetStarted /> 
      <Features />
    </div>
  );
}
