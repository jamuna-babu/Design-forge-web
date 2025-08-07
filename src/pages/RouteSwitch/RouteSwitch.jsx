import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import GenerateImage from "../GenerateImage/GenerateImage";

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/generate-image" element={<GenerateImage />} />
    </Routes>
  );
}

export default RouteSwitch;
