import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(
  (() => {
    const panel = document.getElementById("pane-justified-1").querySelectorAll(".mui-panel")[1];

    const app = document.createElement("div");
    panel.appendChild(app);
    return app;
  })(),
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
