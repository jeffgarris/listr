import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import ListsContextProvider from "./contexts/ListsContextProvider.tsx";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KindeProvider
      clientId="fc60bdb5c1ed4ad4979220b576f13a9e"
      domain="https://jeffgarris.kinde.com"
      redirectUri="http://localhost:5174"
      logoutUri="http://localhost:5174"
    >
      <ListsContextProvider>
        <App />
      </ListsContextProvider>
    </KindeProvider>
  </StrictMode>
);
