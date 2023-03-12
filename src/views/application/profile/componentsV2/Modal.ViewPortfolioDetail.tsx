import { ReactElement } from "react";

import Heading from "components/Heading/HeadingV2";
import IconBadgeV2 from "components/V2/IconBadge";
import IconButtonV2 from "components/V2/IconButton";
import IconV2 from "components/V2/Icons";

export default function TalentPortfolioDetailViewModal({
  data,
  ...props
}: IPortfolioDetailView): ReactElement {
  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      className="overflow-hidden w-[790px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
    >
      <div className="w-full bg-white rounded-lg shadow-card p-[68px_92px_60px_92px] relative">
        <IconButtonV2
          className="absolute right-12 top-7"
          onClick={props.onClose}
          iconType="CLOSE"
          iconClassName="w-5 h-5"
        />
        <Heading variant={"h6"} className="text-xl leading-[30px] font-semibold text-center">
          {data.project_name}
        </Heading>
        <div
          className={`mt-9 w-full h-[312px] ${
            data.cover_images ? "" : "bg-[#D9D9D9] rounded-lg flex justify-center items-center"
          }`}
        >
          {data.cover_images && (
            <img
              src={data.cover_images}
              alt="cover iamge"
              className="rounded-lg w-full h-full object-cover"
            />
          )}
          {!data.cover_images && (
            <IconV2 iconType="OUTDEFINE-TRANS-LOGO" iconClassName="text-[rgb(169,172,177)]" />
          )}
        </div>
        <p className="mt-9 font-inter text-xs leading-[18px]">{data.project_description}</p>
        <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-7">
          <IconBadgeV2 iconType={"USER"} iconClassName="w-6 h-6">
            {data.role}
          </IconBadgeV2>
          <IconBadgeV2 iconType={"DATE"} iconClassName="w-6 h-6">
            {new Date(data.completed_date).getMonth() +
              "/" +
              new Date(data.completed_date).getFullYear()}
          </IconBadgeV2>
          <a href={data.project_links} rel="noreferrer noopener" target="_blank">
            <IconBadgeV2 iconType={"PORTFOLIO"} iconClassName="w-6 h-6" addClass="cursor-pointer">
              {data.project_links}
            </IconBadgeV2>
          </a>
        </div>
      </div>
    </div>
  );
}
