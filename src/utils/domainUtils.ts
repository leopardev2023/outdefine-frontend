import utils from "./utils";
import ROLES from "constants/userRole";

const SUBDOMAINS = {
  JOBS: "jobs",
  HIRE: "hire",
};

const getSubDomain = () => {
  if (utils.isNull(window)) return null;
  const [sub1, sub2] = window.location.hostname.split(".");
  if (sub1 === "localhost") return SUBDOMAINS.JOBS; //Only for development purpose
  return sub2;
};

const getUserRoleForDomain = () => {
  const domain = getSubDomain();
  switch (domain) {
    case SUBDOMAINS.JOBS:
      return ROLES.APPLICANT_ROLE;
    case SUBDOMAINS.HIRE:
      return ROLES.CLIENT_ROLE;
    default:
      return null;
  }
};

const getLinkForUserRole = (role) => {
  switch (role) {
    case ROLES.APPLICANT_ROLE:
      return "https://www.jobs.outdefine.com";
    case ROLES.CLIENT_ROLE:
      return "https://www.hire.outdefine.com";
    default:
      return null;
  }
};

export default {
  SUBDOMAINS,
  getSubDomain,
  getUserRoleForDomain,
  getLinkForUserRole,
};
