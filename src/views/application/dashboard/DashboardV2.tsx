import { ReactElement } from "react";

import Heading from "components/Heading/HeadingV2";
import TabV2 from "components/V2/Tab/TabV2";

import { ReactComponent as OutdefineLogo } from "assets/svg/dark-logo.svg";

// illustrations
import InviteFriendPanelV2 from "./components/Panel.InviteFriendV2";
import ReferralHistoryPanelV2 from "./components/Panel.ReferralHistoryV2";
import DashboardCardWrapperV2 from "./components/Wrapper.DashboardCard";
import AnimationGroupWrapper from "./components/Wrapper.AnimationGroup";

const TalentDashboardV2 = (): ReactElement => {
  const cards = [
    <DashboardCardWrapperV2
      bgClass="bg-orange"
      text1="Set up your profile"
      text2="Customize your profile to you and show companies who you are!"
      text3="Profile"
      to="/profile"
      imageAlt="astro rocket illustration 3d"
      imageLink="common/spaceboy/rocketer.png"
      imageClassName="w-[150px] md:w-[10vw]"
    />,
    <DashboardCardWrapperV2
      bgClass="bg-blue2"
      text1="Become a trusted member"
      text2="Complete your onboarding assessments and earn start 500 Outdefine tokens and a badge of completion!"
      text3="Assessments"
      to="/assessments"
      imageAlt="astro ipad illustration 3d"
      imageLink="common/spaceboy/astro-ipad.png"
      imageClassName="w-[150px] md:w-[10vw]"
    />,
    <DashboardCardWrapperV2
      bgClass="bg-[#47508A]"
      text1="Apply for jobs"
      text2="Get vetted and start applying for your dream position!"
      text3="Jobs"
      to="/jobs"
      imageAlt="astro computer illustration 3d"
      imageLink="common/spaceboy/astro-computer.png"
      imageClassName="w-[150px] md:w-[10vw]"
    />,
    <DashboardCardWrapperV2
      bgClass="bg-coral-red"
      text1="Learn about the token"
      text2="Learn more about your token and how you can use it!"
      text3="Tokens"
      to="/tokens"
      imageAlt="earth illustration 3d"
      imageLink="common/spaceboy/earth-3d.png"
      imageClassName="w-[150px] md:w-[10vw]"
    />,
  ];

  return (
    <main
      data-cy="dashboard"
      className="pt-[112px] pb-[70px] md:pb-0 pl-[16px] md:pl-9 pr-[16px] md:pr-[60px] w-full max-h-screen overflow-auto
       md:flex md:gap-10 md:2xl:gap-[130px] md:justify-between"
    >
      <div className="w-full">
        <div className="flex gap-6 items-center">
          <OutdefineLogo className="w-20 h-20" />
          <div>
            <Heading variant="h5" bold>
              Welcome to Outdefine!
            </Heading>
            <p className="pt-1 font-semibold text-sm font-inter">
              Start exploring by using the cards below
            </p>
          </div>
        </div>

        <AnimationGroupWrapper data={cards} />
      </div>
      <div className="w-full md:min-w-[360px] md:w-[360px] mt-12 md:mt-6">
        <Heading variant="h6" bold>
          Refer friends
        </Heading>

        <TabV2
          addClass="mt-6 w-full"
          tabClass="w-[50%] md:w-[175px] h-11 font-poppins font-semibold text-xs"
          tabs={["Invite", "Invited"]}
          contents={[<InviteFriendPanelV2 />, <ReferralHistoryPanelV2 />]}
          contentWrapperClass="mt-10 mb-10 bg-white rounded-lg pb-5"
        />
      </div>
    </main>
  );
};

export default TalentDashboardV2;
