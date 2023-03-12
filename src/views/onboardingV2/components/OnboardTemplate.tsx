import Heading from "components/Heading/HeadingV2";
import Progress from "components/onboarding/Progress";
import TypographyV2 from "components/Typography/TypographyV2";
import Icons from "components/V2/Icons";
import * as React from "react";
import { getCookie } from "utils/storageUtils";
import ReferralAlert from "views/authentication/component/ReferralAlert";

interface Props {
  step: number;
  CurrentStepComp: React.FC<any>;
  title: string;
  spaceBoy: string;
  spaceBoyClassName?: string;
}

const OnboardTemplate = ({
  step,
  CurrentStepComp,
  title,
  spaceBoy,
  spaceBoyClassName = "",
}: Props) => {
  return (
    <div className="relative flex flex-col md:flex-row w-full min-h-screen h-auto overflow-x-hidden bg-lighter-gray">
      <div
        style={{ backgroundImage: 'url("/onboard/spaceboy/bg.png")' }}
        className="relative w-screen md:w-[24vw] h-32 md:h-auto bg-repeat-y transition-all mb-[60px] md:mb-0"
      >
        <div className="absolute w-screen md:top-[214px]">
          <img
            src={`/onboard/spaceboy/${spaceBoy}.png`}
            alt="spaceboy"
            className={`absolute w-[70px] z-10 top-[15px] ml-[calc(70%-35px)] ${spaceBoyClassName} `}
          />
          <img
            src={`/onboard/spaceboy/earth-globe.png`}
            alt="globe"
            className="absolute w-[200px] md:w-[45vw] ml-[calc(50%-100px)] md:ml-[-10vw] top-[30px] z-1 "
          />
        </div>
      </div>
      <div
        className={`flex-1 overflow-y-hidden px-5 md:px-[10vw] ${
          getCookie("referral_code") ? "pt-24" : "pt-7"
        }`}
      >
        <Progress step={step + 1} count={4} className="mx-auto" />
        <div className="flex mt-[30px] md:mt-24 justify-start md:justify-center w-full mx-0 md:mx-auto flex-nowrap">
          <div className="flex">
            <Icons iconType="OUTDEF-LOGO" iconClassName="w-[32px] h-[32px] shrink-0" />
            <Heading
              variant="h4"
              className="font-poppins font-bold !text-xl md:!text-[36px] ml-4 md:ml-6 whitespace-nowrap"
            >
              {`Step ${step + 1}`}
            </Heading>
          </div>
          <TypographyV2
            variant="subtitle1"
            className="font-poppins font-semibold text-xl md:text-[24px] ml-5 md:ml-10 w-[60vw] md:w-auto leading-relaxed"
          >
            {title}
          </TypographyV2>
        </div>
        <div className="pb-6">
          <ReferralAlert />
          <CurrentStepComp />
        </div>
      </div>
    </div>
  );
};

export default OnboardTemplate;
