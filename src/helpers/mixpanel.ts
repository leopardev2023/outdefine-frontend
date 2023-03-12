import mixpanel from "mixpanel-browser";
import {
  isDevelopment,
  isLocalhost,
  isStaging,
  isProduction,
  MIXPANEL_TOKEN,
  isMixpanelOFF,
} from "./env";

/**
 * @description Global operations
 */
export const mixpanel_init = () => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.init(MIXPANEL_TOKEN ?? "", { debug: isDevelopment });
};

export const mixpanel_track = (event: string, payload?: any) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.track(event, payload);
};

export const mixpanel_track_links = (linkSelector: string, description: string) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.track_links(linkSelector, description);
};

export const mixpanel_register = (payload: any) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.register(payload);
};
// e.g. register_once can be used to log first login date
export const mixpanel_register_once = (payload: any, isPersistent = false) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.register_once(payload);
  // if (isPersistent) mixpanel.register_once(payload);
  // else mixpanel.register_once(payload, 'None', { persistent: false });
};

/**
 * @description Profile operations
 */
export const mixpanel_identify = (id: any) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.identify(id);
};

export const mixpanel_people_set = (payload: any) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.people.set(payload);
};

export const mixpanel_people_set_once = (payload: any) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.people.set_once(payload);
};

export const mixpanel_people_increment = (payload: any) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.people.increment(payload);
};

export const mixpanel_people_append = (payload: any) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.people.append(payload);
};

export const mixpanel_people_union = (payload: any) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.people.union(payload);
};

export const mixpanel_people_unset = (payload: any) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.people.unset(payload);
};
export const mixpanel_people_remove = (payload: any) => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.people.remove(payload);
};
export const mixpanel_people_delete = () => {
  if (isLocalhost || isMixpanelOFF) return;
  mixpanel.people.delete_user();
};
