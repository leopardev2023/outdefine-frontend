import { ReactElement } from "react";

import IconV2 from "components/V2/Icons";
import BadgeV2 from "components/V2/Badges/BadgeV2";

import useWindowDimensions from "hooks/utils/useWindowDimensions";

import objectHelper from "helpers/object";

export default function TalentExperienceCardV2(props: ITalentExpCard): ReactElement {
  const { isMobile } = useWindowDimensions();
  return (
    <div className={`
      h-[350px] p-[28px_36px_36px_20px] border-[1px] rounded-lg border-dark-gray relative
      ${isMobile ? "w-full min-w-full" : "min-w-[360px] w-[360px]"}
    `}>
      <div className="flex gap-4 items-center">
        <span className="w-[52px] h-[52px] bg-odf rounded-lg flex justify-center items-center">
          <IconV2 iconType="BRIEFCASEWHITE" />
        </span>
        <div>
          <h4 className="font-bold text-base leading-6">{props.position}</h4>
          <p className="font-semibold text-sm leading-[150%]">{props.company_name}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <BadgeV2 addClass="py-1 capitalize">{props.term.toLocaleLowerCase()}</BadgeV2>
        <BadgeV2 addClass="py-1">
          {new Date(props.start_date).getMonth() +
            1 +
            "/" +
            new Date(props.start_date).getFullYear()}
          {" - "}
          {new Date(props.end_date).getMonth() + 1 + "/" + new Date(props.end_date).getFullYear()}
        </BadgeV2>
      </div>
      <ol className="mt-11 text-xs leading-[18px] h-[160px] overflow-y-auto list-disc pl-5">
        {objectHelper.safeJsonArray(props?.summary)?.map((duty, index) => (
          <li key={duty.slice(0, 5) + index}>{duty}</li>
        ))}
      </ol>
      {props.children}
    </div>
  );
}
