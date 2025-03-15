import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import App from "./App.jsx";
import 'regenerator-runtime/runtime';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap App inside BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);
