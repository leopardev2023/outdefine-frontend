import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "reportWebVitals";

import { store } from "./app/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { ErrorBoundary } from "react-error-boundary";

//@ts-ignore
import LogRocket from "logrocket";

import { Toaster } from 'react-hot-toast';
import App from "./App";

import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import "react-month-picker/scss/month-picker.scss";
import "./index.scss";
import { isStaging, LOGROCKET_URL, SENTRY_DSN, SENTRY_TRACES_SAMPLE_RATE } from "helpers/env";
import { mixpanel_init } from "helpers/mixpanel";
import Page500 from "./views/error-pages/Page500";

if (isStaging) {
  // LogRocket initialization
  LogRocket.init(LOGROCKET_URL || "");

  // Sentry initialization
  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: Number(SENTRY_TRACES_SAMPLE_RATE || "1.0"),
  });
}

// Mixpanel initialization
mixpanel_init();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <ErrorBoundary FallbackComponent={Page500}>
          <App />
        </ErrorBoundary>
        <Toaster />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
