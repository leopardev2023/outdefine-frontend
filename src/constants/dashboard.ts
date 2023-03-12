const init_welcome_msg = `Keep 100% of your earnings. Earn tokens when you refer a friend or complete tasks!
We are currently in our beta stage, this means feedback you provide will help us shape this platform to meet YOUR needs. Leave feeback by joining our discord below!`;

const community_content = `Join a community of like minded individuals. Network, create new
connections and make friends.`;

const engineer_why_outdefine = {
  heading: "Why OUTDEFINE?",
  sub_heading: `Outdefine is the first platform to reimagine the way web3 interacts
  with our job market place.`,
  contents: [
    `You work hard, so here at outdefine you keep 100% of your earnings.`,
    `Everyday you have a chance to earn, whether that is in tokens or
    cash. Check out tokens for more info!`,
    `Lastly, work on projects you’re passionate about and help shape the
    future of web3.`,
  ],
};

const engineer_token = {
  heading: "DEFN Tokens",
  sub_heading: "Ways to earn tokens!",
  contents: [
    "Complete your assessments and apply to jobs",
    "Bill invoices for work through the platform",
    "Invite friends to join outdefine",
  ],
};

const engineer_journey = {
  heading: "Start your journey",
  sub_heading: "Complete these tasks and start applying to jobs!",
  contents: [
    {
      text: "Complete your assessments",
      to: "/assessments",
    },
    {
      text: "Participate in the live interview",
      to: "",
    },
    {
      text: "Finalize your profile and customize it to you",
      to: "/profile",
    },
    {
      text: "Apply to jobs!",
      to: "/jobs",
    },
  ],
};

const engineer = {
  init_welcome: init_welcome_msg,
  community_content,
  why_outdefine: engineer_why_outdefine,
  token: engineer_token,
  journey: engineer_journey,
};

const client_init_welcome = `Find talent globally, don’t limit your search. Whether it’s web3 or other industries we offer top vetted talent to help you build your future.`;

const client_whyoutdefine = {
  heading: "Why OUTDEFINE?",
  sub_heading: `Outdefine is the first platform to reimagine the way web3 interacts with our job market place.`,
  contents: [
    `Find talent globally, don’t limit your search anymore. Talent is everywhere so find the one that fits your needs.`,
    `All candidates are vetted, so you know their skills match your needs.`,
    `Lastly, create and dispurse contracts all in one platform. No need for back and forth.`,
  ],
};

const find_talent = {
  heading: "Start finding talent",
  sub_heading: "Find talent",
  contents: [
    {
      text: "Create a job positing",
      to: "/assessments",
    },
    {
      text: "Search through our talent",
      to: "",
    },
    {
      text: "Interview candidates and find the right one",
      to: "",
    },
    {
      text: "Hire talent!",
      to: "/jobs",
    },
  ],
};

const how_it_works = {
  heading: "How it works",
  sub_heading: "How it works",
  contents: [
    `Hire talent for direct roles, part time roles or contracts`,
    `If you hire talent for a contract or part time role you are able to use Outdefine’s account platform to manage invoices, contract creations and onboarding materials.`,
    `With just a small transaction fee of 15% with each transaction, Outdefine is a one stop shop.`,
  ],
};

const client = {
  init_welcome: client_init_welcome,
  why_outdefine: client_whyoutdefine,
  find_talent,
  how_it_works,
};

export default {
  engineer,
  client,
};
