import React from "react";
import Features from "./Features";
import ImageCard from "./Hero";
import ImageCardGetStarted from "../GetStartedPage/GetStartedPage";
import HowItWorks from "./HowItWorks";
export default function AuthenticatedLandingPage() {
  return (
    <div>
      <ImageCardGetStarted />
      {/*  to be replaced by modified HowItWorks for auth-ed users later on */}
      <HowItWorks />
      <Features />
    </div>
  );
}
