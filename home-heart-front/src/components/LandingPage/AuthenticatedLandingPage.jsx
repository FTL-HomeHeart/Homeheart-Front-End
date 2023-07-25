import React from "react";
import Features from "./Features";
import ImageCard from "./Hero";
import ImageCardGetStarted from "../GetStartedPage/GetStartedPage";
import HowItWorks from "./HowItWorks";
import HowItWorksAuth from "./HowItWorksAuth";

export default function AuthenticatedLandingPage({user}) {
  return (
    <div>
      <ImageCardGetStarted user={user} />
      {/*  to be replaced by modified HowItWorks for auth-ed users later on */}
      <HowItWorksAuth />
      <Features />
    </div>
  );
}
