import IconBadgeV2 from "components/V2/IconBadge";
import IconV2 from "components/V2/Icons/IconV2";
import { ReactElement } from "react";

export default function ProjectCardV2(props: {
  portfolio?: ITalentPortfolio;
  children?: ReactElement;
  onCardClick?: () => void;
}): ReactElement {
  return (
    <div
      onClick={props.onCardClick}
      className={`${
        props.onCardClick ? "cursor-pointer" : ""
      } w-[300px] border-[1px] border-dark-gray rounded-lg p-4`}
    >
      <div
        className={`overflow-hidden w-full h-[196px] rounded-lg bg-[#D9D9D9] flex items-center justify-center`}
      >
        {props.portfolio?.cover_images && (
          <img
            src={props.portfolio.cover_images}
            alt="portfolio show"
            className={`object-cover w-full h-full rounded-lg`}
          />
        )}
        {!props.portfolio?.cover_images && (
          <IconV2 iconType="OUTDEFINE-TRANS-LOGO" iconClassName="text-[rgb(169,172,177)]" />
        )}
      </div>
      <div className="mt-4 relative">
        <div className="absolute right-0 top-0 h-full flex flex-col items-end justify-between">
          {props.children}
        </div>
        <h6 className="text-base leading-6 font-semibold font-poppins">
          {props.portfolio?.project_name}
        </h6>
        <IconBadgeV2 addClass="mt-3" iconClassName="w-5 h-5" iconType="USER">
          {props.portfolio?.role}
        </IconBadgeV2>
        <IconBadgeV2 addClass="mt-4" iconClassName="w-5 h-5" iconType="DATE">
          {props.portfolio?.completed_date &&
            new Date(props.portfolio?.completed_date).getMonth() +
              1 +
              "/" +
              new Date(props.portfolio?.completed_date).getFullYear()}
        </IconBadgeV2>
      </div>
    </div>
  );
}
