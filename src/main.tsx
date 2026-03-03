import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.css";
import { RouterProvider } from "react-router";
import { ToastProvider } from "./providers/toast";
import { ThemeProvider } from "./providers/theme";
import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ToastProvider>
  </StrictMode>,
);
