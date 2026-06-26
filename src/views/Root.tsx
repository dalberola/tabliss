import React from "react";
import AuthProvider from "../contexts/auth";
import ErrorProvider from "../contexts/error";
import TimeProvider from "../contexts/time";
import UiProvider from "../contexts/ui";
import IntlProvider from "../locales/IntlProvider";
import App from "./App";

const Root: React.FC = () => (
  <React.StrictMode>
    <ErrorProvider>
      <UiProvider>
        <IntlProvider>
          <TimeProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </TimeProvider>
        </IntlProvider>
      </UiProvider>
    </ErrorProvider>
  </React.StrictMode>
);

export default Root;
