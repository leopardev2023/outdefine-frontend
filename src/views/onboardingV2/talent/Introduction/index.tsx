import React from "react";

import Heading from "components/Heading/HeadingV2";
import { OnboardComponentProps } from "../Onboard.types";
import FlexDiv from "./FlexDiv";
import Button from "components/Button/ButtonV2";
import UserCard from "views/application/components/UserCard";
import IconV2 from "components/V2/Icons/IconV2";
import { default_women_avatars } from "constants/v2/default_images";
import { useAppSelector } from "redux/hooks/redux-hooks";
import { RootState } from "app/store";
import Dollar from "assets/V2/svg/dollar.svg";
import { getItem } from "utils/storageUtils";
import ReferralAlert from "views/authentication/component/ReferralAlert";

const iconClassName = "w-7 h-7 mr-4";
const IconText = ({ children }) => (
  <p className="text-inactive-gray font-inter text-[14px]">{children}</p>
);

const Logo = () => <IconV2 iconType="OUTDEF-LOGO" iconClassName="w-[10vw] shrink-0" />;

const MessageDivs = () => (
  <div className="flex-col space-y-[4vh] mt-[40px] md:mt-[100px]">
    <FlexDiv className="border-orange">
      <IconV2 iconType="USER-2" iconClassName={iconClassName} />
      <IconText>Answer a few questions and complete your profile</IconText>
    </FlexDiv>
    <FlexDiv className="border-coral-red">
      <img src={Dollar} className={iconClassName} />
      <IconText>
        Earn <span className="text-black">500 Outdefine tokens</span> for completing your skill
        assessments
      </IconText>
    </FlexDiv>
    <FlexDiv className="border-blue2">
      <IconV2 iconType="BIG-CASE" iconClassName={iconClassName} />
      <IconText>
        Gain access to global jobs and a community of 5000+ like-minded individuals
      </IconText>
    </FlexDiv>
  </div>
);

const FilledCard = () => (
  <UserCard
    avatar={default_women_avatars[3]}
    role="Blockchain Engineer"
    location="Los Angles, CA"
    education={8}
    salary="$115/hr"
    name="Ashely Liu"
  />
);

const Introduction = (props: OnboardComponentProps) => {
  const user = useAppSelector((root: RootState) => root.authentication);
  const email = getItem("email");

  const Header = () => (
    <Heading
      variant="h4"
      className="shrink-0 !leading-10 font-poppins font-bold !text-xl md:!text-[28px] lg:!text-[36px] w-full "
    >
      {`Hey ${user.firstName || email || "new user"} ready to own your career?`}
    </Heading>
  );

  const GetStarted = () => (
    <Button type="button" className="mt-10" onClick={props.goNext}>
      Get started!
    </Button>
  );

  return (
    <>
      <ReferralAlert />
      {/* Desktop */}
      <div className="w-screen h-screen px-[5vw] py-[15vh] bg-lighter-gray hidden md:flex">
        <Logo />
        <div className="w-[45vw] ml-6">
          <Header />
          <MessageDivs />
          <GetStarted />
        </div>
        <div className="h-[380px] w-[24vw] mt-[100px] ml-12">
          <FilledCard />
        </div>
      </div>
      {/* Mobile */}
      <div className="block md:hidden bg-lighter-gray px-[4vw] py-[10vw]">
        <div className="flex space-x-[7vw] items-center w-full">
          <Logo />
          <div className="w-[90%]">
            <Header />
          </div>
        </div>
        <div className="h-[380px] w-full">
          <FilledCard />
        </div>
        <MessageDivs />
        <GetStarted />
      </div>
    </>
  );
};

export default Introduction;
