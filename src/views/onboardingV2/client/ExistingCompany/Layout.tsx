import TypographyV2 from "components/Typography/TypographyV2";
import * as React from "react";
import LogoIcon from "assets/icons/logo.svg";

interface Props {
  title: string;
  spaceBoy: string;
  spaceBoyClassName?: string;
  children: React.ReactNode;
}

const Layout = ({ title, spaceBoy, spaceBoyClassName = "", children }: Props) => {
  return (
    <div className="relative flex flex-col md:flex-row w-full min-h-screen h-auto overflow-x-hidden bg-lighter-gray">
      <div
        style={{ backgroundImage: 'url("/app/onboard/spaceboy/bg.png")' }}
        className="relative w-screen md:w-[24vw] h-32 md:h-auto bg-repeat-y transition-all mb-[60px] md:mb-0"
      >
        <div className="absolute w-screen md:top-[214px]">
          <img
            src={`/app/onboard/spaceboy/${spaceBoy}.png`}
            alt="spaceboy"
            className={`absolute w-[70px] z-10 top-[15px] ml-[calc(70%-35px)] ${spaceBoyClassName} `}
          />
          <img
            src={`/app/onboard/spaceboy/earth-globe.png`}
            alt="globe"
            className="absolute w-[200px] md:w-[45vw] ml-[calc(50%-100px)] md:ml-[-10vw] top-[30px] z-1 "
          />
        </div>
      </div>
      <div className={`flex-1  px-10 mx-[160px] h-[100vh]`}>
        <div className="flex mt-[90px] md:mt-24 justify-start w-full mx-0 md:mx-auto flex-nowrap items-center">
          <img src={LogoIcon} alt="Equi" width={32} className="absolute ml-[-60px]" />

          <TypographyV2
            variant="subtitle1"
            className="font-poppins font-semibold text-xl md:text-[36px] w-[60vw] md:w-auto leading-relaxed"
          >
            {title}
          </TypographyV2>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
