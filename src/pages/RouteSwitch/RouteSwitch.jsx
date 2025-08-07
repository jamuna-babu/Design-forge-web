import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../LandingPage/LandingPage";
import GenerateImage from "../GenerateImage/GenerateImage";
import CreateTemplatePage from "../CreateTemplatePage/CreateTemplatePage";

function RouteSwitch() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/generate-image" element={<GenerateImage />} />
      <Route path="/create-template" element={<CreateTemplatePage />} />
    </Routes>
  );
}

export default RouteSwitch;
