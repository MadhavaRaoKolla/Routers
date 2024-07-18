import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Errorboundary from "./Components/Errorboundary.jsx";
import Fallbackui from "./Components/FallbackUI/Fallbackui.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Errorboundary fallback={Fallbackui}>
        <App />
      </Errorboundary>
    </BrowserRouter>
  </React.StrictMode>
);
