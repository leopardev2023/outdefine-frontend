import TypographyV2 from "components/Typography/TypographyV2";
import { ReactElement } from "react";
import { NavLinkInCard } from "views/client-application/dashboard/ClientDashboardV2";

interface IDashboardCardWrapperV2 {
  bgClass: string,
  text1: string,
  text2: string,
  text3?: string,
  imageLink: string,
  imageClassName?: string,
  imageAlt: string,
  to?: string,
}

const DashboardCardWrapperV2 = ({ bgClass, text1, text2, text3, imageLink, imageAlt, to, imageClassName = "" }
: IDashboardCardWrapperV2): ReactElement => {
  return (
    <div
      data-cy="profile-container"
      className={`h-[280px] xl:h-[350px] rounded-lg pt-6 px-6 pb-4 text-white flex flex-col  ${
        bgClass ?? ""
      }`}
    >
      <div className="flex flex-row justify-between">
        <TypographyV2 variant='subtitle2' className='font-bold text-[20px] md:text-[16px] w-[50%] lg:w-full'>
          {text1}
        </TypographyV2>

        <img
          className={imageClassName}
          src={imageLink}
          alt={imageAlt}
        />
      </div>
      <div className="flex flex-col justify-end h-full">
        <p className='text-xs mt-[10px] w-full font-inter'>
          {text2}
        </p>
        {to &&
        <NavLinkInCard to={to} addClass='mt-2 self-end w-fit'>
          {text3}
        </NavLinkInCard>}
      </div>

    </div>
  );
};

export default DashboardCardWrapperV2;
