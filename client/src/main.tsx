import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthService } from "@genezio/auth";

// TODO: Add your token and region from the Genezio dashboard https://app.genez.io/dashboard
AuthService.getInstance().setTokenAndRegion(
  "0-wjytckm7xl7zye3eph6vd5esui0xqvfj",
  "us-east-1"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
