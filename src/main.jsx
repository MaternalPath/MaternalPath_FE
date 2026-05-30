import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ToastContainer, toast } from "react-toastify";

import AppRoutes from "./Routes.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <AppRoutes />
  </StrictMode>,
);
