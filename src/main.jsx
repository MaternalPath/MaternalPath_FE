import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ToastContainer } from "react-toastify";

import AppRoutes from "./Routes.jsx";
import { RoleProvider } from "./context/RoleContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RoleProvider>
      <ToastContainer />
      <AppRoutes />
    </RoleProvider>
  </StrictMode>,
);
