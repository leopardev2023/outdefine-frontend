// CLIENT MAIN LINKS
const CLIENT_TALENT = "Talent";
const CLIENT_TALENT_APPLICATION = "Applications";
const CLIENT_TALENT_MANAGE_TALENT = "Manage talent";
const CLIENT_ACCOUNT = "Account";

// TALENT MAIN LINKS
const TALENT_JOB = "Jobs";
const TALENT_JOB_MY_JOB = "My jobs";
const TALENT_JOB_OFFER = "Offer";
const TALENT_JOB_MANAGE = "Manage jobs";
const TALENT_ASSESSMENT = "Assessments";
const TALENT_ACCOUNT = "Account";
const TALENT_TOKEN = "Tokens";

// COMMON OTHER LINKS
const MENU_DASHBOARD = "Dashboard";

const MENU_MESSAGE = "Messages";
const MENU_NOTIFICATION = "Notifications";
const MENU_SETTING = "Settings";

const TalentMainLinks = [
  { link: "/dashboard", text: MENU_DASHBOARD },
  {
    link: "/jobs",
    text: TALENT_JOB,
    children: [
      {
        link: 'yours',
        text: TALENT_JOB_MY_JOB,
      },
      {
        link: 'offer',
        text: TALENT_JOB_OFFER,
      },
      {
        link: 'manage',
        text: TALENT_JOB_MANAGE,
      },
    ],
  },
  {
    link: "/assessments",
    text: TALENT_ASSESSMENT,
  },
  // {
  //   link: '/account',
  //   text: TALENT_ACCOUNT,
  // },
  {
    link: "/tokens",
    text: TALENT_TOKEN,
  },
];

const ClientMainLinks = [
  {
    link: "/dashboard",
    text: MENU_DASHBOARD,
  },
  {
    link: "/talent",
    text: CLIENT_TALENT,
    children: [
      {
        link: 'applications',
        text: CLIENT_TALENT_APPLICATION,
      },
      {
        link: 'manage',
        text: CLIENT_TALENT_MANAGE_TALENT,
      },
    ],
  },
  // {
  //   link: '/account',
  //   text: CLIENT_ACCOUNT,
  // },
];

const OtherLinks = [
  // {
  //   link: '/message',
  //   text: MENU_MESSAGE,
  // },
  // {
  //   link: '/notification',
  //   text: MENU_NOTIFICATION,
  // },
  {
    link: "/settings",
    text: MENU_SETTING,
  },
];

export const menu_data = {
  client: {
    mainlinks: ClientMainLinks,
    otherlinks: OtherLinks,
  },
  freelancer: {
    mainlinks: TalentMainLinks,
    otherlinks: OtherLinks,
  },
};
