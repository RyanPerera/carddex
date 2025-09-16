import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="flex flex-col min-h-screen max-w-full bg-background">
      <App />
    </div>
  </StrictMode>
);
