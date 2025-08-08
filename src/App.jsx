import React from "react";
import TemplateCanvas from "./components/TemplateEditor/TemplateCanvas";
import { BrowserRouter } from "react-router-dom";
import RouteSwitch from "./pages/RouteSwitch/RouteSwitch";
import BaseContainer from "./pages/Base/BaseContainer";

function App() {
  return (
    <BrowserRouter>
      <BaseContainer />
    </BrowserRouter>
    // <div>
    //   <h1>DesignForge Canvas</h1>
    //   <TemplateCanvas />
    // </div>
  );
}

export default App;
