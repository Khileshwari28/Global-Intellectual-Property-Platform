import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./common/styles/custom.css";
import App from "./App.jsx";


import { loadPermissions } from "./common/utils/permissions"; // 🔴 Import the function to load permissions

const root = createRoot(document.getElementById("root"));

async function startApp() {
  try {
    await loadPermissions(); // 🔴 This loads backend permissions
    console.log("Permissions loaded successfully");
  } catch (error) {
    console.error("Failed to load permissions:", error);
  }

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

startApp();
