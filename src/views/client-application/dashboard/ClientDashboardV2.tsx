import { NavLink } from "react-router-dom";
import React, { ReactElement } from "react";

import TypographyV2 from "components/Typography/TypographyV2";
import Heading from "components/Heading/HeadingV2";
import TabV2 from "components/V2/Tab/TabV2";

import { ReactComponent as OutdefineLogo } from "assets/svg/dark-logo.svg";
import DashboardCardWrapperV2 from "views/application/dashboard/components/Wrapper.DashboardCard";
import AnimationGroupWrapper from "views/application/dashboard/components/Wrapper.AnimationGroup";

// right panel components
import TeamViewV2 from "./components/Panel.TeamViewV2";
import InviteToTeamV2 from "./components/Panel.InviteToTeamV2";

export const NavLinkInCard = ({
  addClass,
  to,
  children,
}: {
  addClass?: string;
  to: string;
  children: any;
}) => {
  return (
    <NavLink
      to={to}
      data-cy="navlink"
      className={`mt-6 px-6 h-10 rounded-lg flex items-center justify-center text-black font-poppins font-semibold text-sm bg-white hover:bg-white/90 ${
        addClass ?? ""
      }`}
    >
      {children}
    </NavLink>
  );
};

const ClientDashboardV2: React.FC = (): ReactElement => {
  const cards = [
    <DashboardCardWrapperV2
     bgClass='bg-odf'
     text1="Create your profile"
     text2="Finish setting up your profile so talent can find you."
     text3="Set up profile"
     to="/company"
     imageAlt="earth illustration 3d"
     imageLink="common/spaceboy/earth-3d.png"
     imageClassName='w-[150px] md:w-[10vw]'
      />,
    <DashboardCardWrapperV2
     bgClass='bg-coral-red'
     text1="Create jobs"
     text2="Post the jobs you are looking to hire for!"
     text3="Create jobs"
     to="/company?tab=job&action=create"
     imageAlt="astro computer illustration 3d"
     imageLink="common/spaceboy/astro-computer.png"
     imageClassName='w-[150px] md:w-[10vw]'
      />,
    <DashboardCardWrapperV2
      bgClass='bg-orange'
      text1="Find talent"
      text2="Search through our talent pool and find the right talent for your company!"
      text3="Find talent"
      to="/talent"
      imageAlt="astro ipad illustration 3d"
      imageLink="common/spaceboy/astro-ipad.png"
      imageClassName='w-[125px] md:w-[10vw]'
       />,

    <DashboardCardWrapperV2
      bgClass='bg-blue2'
      text1="View account"
      text2="Keep track of talent and never miss a payment!"
      // text3="Find talent"
      // to="/account"
      imageAlt="astro rocket illustration 3d"
      imageLink="common/spaceboy/rocketer.png"
      imageClassName='w-[150px] md:w-[10vw]'
       />,

  ];

  return (
    <main data-cy="client-dashboard"
    className='pt-[112px] pb-9 pl-9 pr-[60px] 2xl:pl-[186px]
    2xl:pr-[210px] w-full flex gap-10 2xl:gap-[130px] justify-between max-h-screen overflow-auto'>
      <div className='w-full'>
        <div className='flex gap-6 items-center'>
          <OutdefineLogo className='w-20 h-20' />
          <div>
            <Heading variant='h5' bold>
              Welcome to Outdefine!
            </Heading>
            <p className='pt-1 font-inter font-semibold text-sm'>
              Get started with the cards below.
            </p>
          </div>
        </div>

        <AnimationGroupWrapper data={cards} />
      </div>
      <div className='min-w-[360px] w-[360px] mt-8'>
        <h4 className='font-poppins font-bold text-xl leading-[30px] mb-5'>
          Team members
        </h4>
        <TabV2
          tabClass='w-[175px] h-11 font-poppins font-semibold text-xs'
          tabs={["Invite", "Team"]}
          contents={[<InviteToTeamV2 />, <TeamViewV2 />]}
          contentWrapperClass='mt-10 mb-10 bg-white rounded-lg min-h-[460px]'
        />
      </div>
    </main>
  );
};

export default ClientDashboardV2;
