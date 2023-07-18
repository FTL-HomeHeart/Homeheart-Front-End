import React from "react";
import Features from "./Features";
import ImageCard from "./Hero";
export default function AuthenticatedLandingPage() {
  return (
    <div>
      <h1>You are authenticated!</h1>
      <ImageCard />
      <Features />
    </div>
  );
}