// By James

// DASHBOARD
const CLIENT_DASHBOARD = "/dashboard";

// PROFILE
const CLIENT_PROFILE = "/company/*";
const PROFILE_EDIT = "/edit";
const PROFILE_PREFERNCE_EDIT = "/edit/preference";
const PROFILE_COMPANY_EDIT = "/edit/companyinfo";
const CLIENT_PROFILE_MANAGE_JOB = "/manage/*";
const CLIENT_JOB_CREATE_POST = "/job/create";
const CLIENT_JOB_EDIT_POST = "/job/:status/edit/:id";
const CLIENT_JOB_VIEW_POST = "/job/:status/view/:id";
const CLIENT_JOBS_VIEW = "company/job/:id";

// TALENT
const CLIENT_TALENT = "/talent/*";
//assessment
const CLIENT_ACCOUNT = "/account";
const CLIENT_INVOICE = "/account/invoice";
const CLIENT_MYTEAM = "/account/team";

//SETTINGS
const CLIENT_SETTINGS = "/settings";

export default {
  CLIENT_DASHBOARD,
  CLIENT_SETTINGS,
  CLIENT_PROFILE,
  CLIENT_PROFILE_MANAGE_JOB,
  PROFILE_EDIT,
  PROFILE_PREFERNCE_EDIT,
  PROFILE_COMPANY_EDIT,

  CLIENT_JOB_CREATE_POST,
  CLIENT_JOB_VIEW_POST,
  CLIENT_JOB_EDIT_POST,

  // Talent
  CLIENT_TALENT,

  CLIENT_ACCOUNT,
  CLIENT_INVOICE,
  CLIENT_MYTEAM,
  CLIENT_JOBS_VIEW,
};
