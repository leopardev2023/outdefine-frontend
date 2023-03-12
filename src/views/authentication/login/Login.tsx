import React from "react";
import { Helmet } from "react-helmet";
import loginImage from "assets/welcome/signin.png";
import MobileLogo from "assets/welcome/outdefine-mobile-logo.png";
import MobileGraphic from "assets/welcome/signin-mobile-graphic.png";
import LoginPanel from "./LoginPanel";
import Heading from "components/Heading/HeadingV2";
import Typography from "components/Typography/TypographyV2";
import "./styles.scss";

import ReferralAlert from "../component/ReferralAlert";

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Sign into your Outdefine account and connect with top employers in the decentralized world. Showcase your skills and achieve career success now."
          key="desc"
        />
        <meta
          property="og:description"
          content="Sign into your Outdefine account and connect with top employers in the decentralized world. Showcase your skills and achieve career success now."
        />
      </Helmet>
      <ReferralAlert />
      <div className="flex-col hidden min-h-screen px-0 md:flex-row md:flex">
        <div
          className="px-2 mx-auto my-auto mt-10 mb-10 md:mb-auto md:mt-auto"
          data-cy="login-container"
        >
          <LoginPanel />
        </div>
        <div className="relative md:flex flex-col gap-y-4 w-full md:w-[550px] lg:w-[725px] mr-0 md:mb-0 justify-between">
          <img src={loginImage} alt="login"></img>
        </div>
      </div>
      <div className="flex flex-col min-h-screen px-0 md:hidden">
        <div className="relative flex flex-col items-center justify-center text-center text-white mobile-signin-header-background h-[50%]">
          <img src={MobileLogo} alt="Outdefine" className="mt-8" width="40%" />
          <Heading variant="h5" className="mt-6 mb-2 text-[4vw] mb:text-[auto]">
            Define your future in the world of web3
          </Heading>
          <Typography variant="p3" className="mb-4 text-[3vw] mb:text-[auto]">
            Own your career
          </Typography>
          <img src={MobileGraphic} alt="LFG" width="55%" className="z-10" />
          <div className="w-full h-[6vh] bg-white block absolute bottom-[-1px] rounded-t-lg"></div>
        </div>
        <div className="mx-[15vw] block mt-[3vh]">
          <LoginPanel />
        </div>
      </div>
    </>
  );
};

export default Login;
