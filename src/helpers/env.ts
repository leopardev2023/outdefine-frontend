const {
  REACT_APP_NODE_ENV: NODE_ENV,
  REACT_APP_LOGROCKET_URL: LOGROCKET_URL,
  REACT_APP_SENTRY_TRACES_SAMPLE_RATE: SENTRY_TRACES_SAMPLE_RATE,
  REACT_APP_SENTRY_DSN: SENTRY_DSN,
  REACT_APP_MIXPANEL_TOKEN: MIXPANEL_TOKEN,
  REACT_APP_MIXPANEL_ENABLED: MIXPANEL_ENABLED,
} = process.env;

const isProduction = NODE_ENV === "production";
const isDevelopment = NODE_ENV === "development";
const isStaging = isProduction || isDevelopment;
const isLocalhost = NODE_ENV === "localhost";
const isMixpanelON = MIXPANEL_ENABLED;
const isMixpanelOFF = !MIXPANEL_ENABLED;

export {
  isProduction,
  isDevelopment,
  isStaging,
  isLocalhost,
  isMixpanelON,
  isMixpanelOFF,
  NODE_ENV,
  LOGROCKET_URL,
  SENTRY_TRACES_SAMPLE_RATE,
  SENTRY_DSN,
  MIXPANEL_TOKEN,
};
