import React from "react";
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "./history";
import config from "../auth_config.json";
import "./index.css";
import App from "./App";

const onRedirectCallback = (appState: any) => {
  history.push(appState?.returnTo || window.location.pathname);
};

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      redirectUri={"http://localhost:8080"}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
