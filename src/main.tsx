import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Modal from "./components/Modal.tsx";
import { ModalProvider } from "./contexts/ModalContext";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import ListsContextProvider from "./contexts/ListsContextProvider.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <KindeProvider
        clientId="fc60bdb5c1ed4ad4979220b576f13a9e"
        domain="https://jeffgarris.kinde.com"
        redirectUri={window.location.origin}
        logoutUri={window.location.origin}
      >
        <ListsContextProvider>
          <App />
          <Modal />
        </ListsContextProvider>
      </KindeProvider>
    </ModalProvider>
  </StrictMode>
);
