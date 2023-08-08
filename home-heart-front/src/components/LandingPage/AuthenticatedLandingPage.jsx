import React from "react";
import Features from "./Features";
import ImageCard from "./Hero";
import ImageCardGetStarted from "../GetStartedPage/GetStartedPage";
import HowItWorks from "./HowItWorks";
import HowItWorksAuth from "./HowItWorksAuth";

export default function AuthenticatedLandingPage({user, userData}) {
  // console.log(user.userId)
  console.log("USER IN AUTH:", user); 
  return (
    <div>
      <ImageCardGetStarted user={user} userData={userData} />
      {/*  to be replaced by modified HowItWorks for auth-ed users later on */}
      <HowItWorksAuth />
      <Features />
    </div>
  );
}

