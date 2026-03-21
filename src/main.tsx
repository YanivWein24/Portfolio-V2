import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import legacyPwaCleanupBootstrap from "./utils/legacyPwaCleanup";

const startApp = () => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

void legacyPwaCleanupBootstrap(startApp);
