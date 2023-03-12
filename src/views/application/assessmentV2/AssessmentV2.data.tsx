import { Token } from "./Icons";

export const UIData = {
  introduction: {
    background: "/assessments/introduction_bk.png",
    image: "/common/spaceboy/astronaut-using-vr-tech.png",
    stage: "Introduce Yourself",
    todo: "Introduce yourself in a quick 5 min video. Press start button below to be directed to Myinterview.com",
  },
  hackerearth: {
    background: "/assessments/hackerearth_bk.png",
    image: "/common/spaceboy/astro-computer.png",
    stage: "Blockchain Engineer",
    todo: "Based on your role choice you have selected the testing above. Press start to be redirected to Hackerearth for your multiple choice testing.",
  },
  hackerearth_coding: {
    background: "/assessments/hackerearth_bk.png",
    image: "/common/spaceboy/astro-computer.png",
    stage: "General Programming",
    todo: "Showcase your skills by taking this coding challenge. Press start to be redirected to Hackerearth for your coding challenge.",
  },
  interview: {
    background: "/assessments/discussion_bk.png",
    image: "/common/spaceboy/refer_friend_astros.png",
    stage: "Join us for a discussion",
    todo: (
      <>
        If you are at this step that means you are one step away from earning{" "}
        <b>500 Outdefine tokens</b>. Schedule your in person interview by pressing schedule below.
      </>
    ),
  },
};

export const BannerData = {
  initialization: {
    image: "/assessments/banner_init.png",
    title: "Complete your assessment, earn tokens and apply for jobs!",
    content: (
      <>
        Choose an industry and verfiy your skills. Once you are a trusted member you earn{" "}
        <Token className="inline" /> 500 tokens that can be used towards boosting job applications
        and can start applying to jobs!
      </>
    ),
  },
  tryagain: {
    image: "/assessments/banner_tryagain.png",
    title: "Unfortunately you did not pass on your first try.",
    content:
      "No worries, not everyone passes on their first try, the great news is you have one more try! Press “try again” to use your second attempt. Good luck!",
  },
  failed: {
    image: "/assessments/banner_failed.png",
    title: "Unfortunately you did not clear your assessments. But...",
    content:
      "Don’t worry, you can try again in two months! In the meantime you’ll be able to refer friends to Outdefine and earn tokens to use when you are a trusted member. Visit your tokens page to learn more!",
  },
  congratulations: {
    image: "/assessments/banner_cong.png",
    title: "Congrats on passing your assessment!",
    content: (
      <>
        One more step towards your token rewards. Once the interview is completed you will receive{" "}
        <Token className="inline" />
        500 tokens. Schedule your behavioral interview by going to the behavioral interview card and
        pressing “schedule”.
      </>
    ),
  },
};
