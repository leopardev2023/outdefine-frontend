export const DASHBOARD = "dashboard";
export const PROFILE = "profile";
export const JOBS = "jobs";
export const JOBS_APPLIED = "Applied";
export const JOBS_SAVED = "Saved";
export const JOBS_INTERVIEWS = "Interviews";
export const JOBS_OFFER = "Offer";
export const JOBS_MANAGE_JOBS = "Manage jobs";
export const ASSESSMENTS = "assessments";
export const ACCOUNT = "account";
export const INVOICE = "invoice";
export const TOKENS = "tokens";
export const TOKENS_INFORMATION = "FAQ";
export const TOKENS_GROWTH = "Referrals";

export const COMPANY = "company";
export const TALENT = "talent";
export const TALENT_MANAGE = "Manage talent";
export const TALENT_APPLICATION = "Applications";

export const CLIENT_ACCOUNT = "Account";
export const CLIENT_INVOICE = "Invoices";
export const CLIENT_MYTEAM = "Team";
export const CLIENT_MYPROFILE = "Profile";

const engineer_mainlinks = [
  {
    link: "/",
    text: DASHBOARD,
  },
  {
    link: "/profile",
    text: PROFILE,
  },
  {
    link: "/jobs",
    text: JOBS,
    children: [
      {
        link: "applied",
        text: JOBS_APPLIED,
      },
      {
        link: "saved",
        text: JOBS_SAVED,
      },
      // {
      //   link: 'interviews',
      //   text: JOBS_INTERVIEWS,
      // },
      {
        link: "offer",
        text: JOBS_OFFER,
      },
      {
        link: "manage",
        text: JOBS_MANAGE_JOBS,
      },
    ],
  },
  {
    link: "/assessments",
    text: ASSESSMENTS,
  },
];

const engineer_otherlinks = [
  {
    link: "/account",
    text: ACCOUNT,
    children: [
      {
        link: "invoice",
        text: INVOICE,
      },
    ],
  },
  {
    link: "/tokens",
    text: TOKENS,
    children: [
      {
        link: "FAQ",
        text: TOKENS_INFORMATION,
      },
      {
        link: "Referrals",
        text: TOKENS_GROWTH,
      },
    ],
  },
];

const client_mainlinks = [
  {
    link: "/",
    text: DASHBOARD,
  },
  {
    link: "/company",
    text: COMPANY,
    children: [
      {
        link: "manage",
        text: JOBS_MANAGE_JOBS,
      },
    ],
  },
  {
    link: "/talent",
    text: TALENT,
    children: [
      {
        link: "application",
        text: TALENT_APPLICATION,
      },
      // {
      //   link: 'offer',
      //   text: JOBS_OFFER,
      // },
      {
        link: "manage",
        text: TALENT_MANAGE,
      },
    ],
  },
];

const client_otherlinks = [
  {
    link: "/account",
    text: CLIENT_ACCOUNT,
    children: [
      {
        link: "invoice",
        text: CLIENT_INVOICE,
      },
      {
        link: "team",
        text: CLIENT_MYTEAM,
      },
      {
        link: "profile",
        text: CLIENT_MYPROFILE,
      },
    ],
  },
];

const freelancer = {
  mainlinks: engineer_mainlinks,
  otherlinks: engineer_otherlinks,
};

const client = {
  mainlinks: client_mainlinks,
  otherlinks: client_otherlinks,
};

export default {
  freelancer,
  client,
};
