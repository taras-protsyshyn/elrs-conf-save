import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(
  (() => {
    const panel = document.body;

    const app = document.createElement("div");
    app.id = "elrs-config-saver";

    panel.prepend(app);

    return app;
  })(),
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
