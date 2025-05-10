import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "./index.css";

import App from "./App.tsx";
import { onSigninCallback, userManager } from "./config.ts";
import { store } from "./store.ts";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthProvider userManager={userManager} onSigninCallback={onSigninCallback}>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);
