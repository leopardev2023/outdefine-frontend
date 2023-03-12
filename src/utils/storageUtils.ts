import * as Sentry from "@sentry/react";
/* global localStorage */
const APP_ID = "OUTDEFINE_";

export const setItem = (key: string, data: any) => {
  localStorage.setItem(APP_ID + key, JSON.stringify(data));
};

export const getItem = (key = "", defaultVal: any = "") => {
  try {
    return JSON.parse(localStorage.getItem(APP_ID + key) || "") || defaultVal;
  } catch (e) {
    Sentry.captureException(e);
    return defaultVal || false;
  }
};

export const deleteItem = (key: string) => {
  localStorage.removeItem(APP_ID + key);
};

export const getProfileId = () => getItem("USER_ID", "");
export const setUserId = (data: string) => setItem("USER_ID", data);
export const deleteUserId = () => deleteItem("USER_ID");

export const getToken = () => getItem("TOKEN", "");
export const setToken = (data: string) => setItem("TOKEN", data);
export const deleteToken = () => deleteItem("TOKEN");

export const getCookie = (cname: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const clearInfo = () => {
  deleteUserId();
  deleteToken();
};
