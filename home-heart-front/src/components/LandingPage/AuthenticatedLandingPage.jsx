import React from "react";
import Features from "./Features";
import ImageCard from "./Hero";
import ImageCardGetStarted from "../GetStartedPage/GetStartedPage";
export default function AuthenticatedLandingPage() {
  return (
    <div>
      <h1>You are authenticated!</h1>
      <ImageCardGetStarted />
      <Features />
    </div>
  );
}