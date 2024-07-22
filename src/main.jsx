import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Errorboundary from "./Components/Errorboundary.jsx";
import Fallbackui from "./Components/FallbackUI/Fallbackui.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Errorboundary fallback={Fallbackui}>
        <Auth0Provider
          domain="dev-j6fj50h3ykdq860y.us.auth0.com"
          clientId="PXuSdeL8MQoNJwDwfwV4nsCxebI2SEjt"
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <App />
        </Auth0Provider>
      </Errorboundary>
    </BrowserRouter>
  </React.StrictMode>
);
