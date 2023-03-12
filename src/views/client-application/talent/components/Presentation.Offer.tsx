import { RootState } from "app/store";
import { useSelector } from "react-redux";
import { PreviewItem } from "../pages/application/offer/PreviewOffer";

import BadgeV2 from "components/V2/Badges/BadgeV2";
import IconV2 from "components/V2/Icons";

import formatDate from "helpers/date";
// import object from "helpers/object";
// import prototype from "helpers/prototype";

export default function OfferPresentation({ offer }: { offer: IOfferResponse }) {
  // const skills = useSelector((root: RootState) => root.prototype.skills);
  return (
    <div className="flex flex-col w-full mt-10 mb-[70px] overflow-y-scroll pr-7 gap-y-5">
      <div className="flex w-full gap-x-7 justify-between ">
        <div className="flex flex-col gap-y-4 w-full">
          <span className="font-poppins text-xs">Company name</span>
          <span className="font-poppins text-sm font-semibold">{offer.Company?.name}</span>
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          <span className="font-poppins text-xs">Position</span>
          <span className="font-poppins text-sm font-semibold">{offer?.["position"]}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-7 gap-y-6">
        <PreviewItem
          icon={<IconV2 iconType="CLOCK" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
          text={offer.term}
          title="Term"
        />
        <PreviewItem
          icon={<IconV2 iconType="EDUCATION" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
          text={offer?.experience_level}
          title="Experience level"
        />
        <PreviewItem
          icon={<IconV2 iconType="CLOCK" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
          text={offer.timezone}
          title="Timezone"
        />
        <PreviewItem
          icon={<IconV2 iconType="CLOCK" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
          text={`${offer.term_of_hours} hours ${offer.term_of_hours_duration.toLowerCase()}`}
          title="Hours"
        />
        <PreviewItem
          icon={
            <IconV2
              iconType="DOLLAR-BLUE-CIRCLE"
              iconClassName="w-[17px] h-[17px] block mt-[2px]"
            />
          }
          text={`${offer.hourly_rate} /hr`}
          title="Hourly rate"
        />
        <PreviewItem
          icon={<IconV2 iconType="CLOCK" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
          text={offer.pay_frequency}
          title="Pay frequency"
        />
        <PreviewItem
          icon={<IconV2 iconType="LOCATION" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
          text={offer.location.toLowerCase()}
          title="Location"
        />
        <PreviewItem
          icon={<IconV2 iconType="LOCATION" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
          text={`${formatDate.yyyy_mm_dd(offer.contract_start)} - ${
            offer?.is_ongoing ? "Ongoing" : formatDate.yyyy_mm_dd(offer?.contract_end)
          }`}
          title="Contract length"
        />
      </div>
      <div className="flex flex-col w-full justify-between">
        <span className="font-poppins text-xs">Welcome note</span>
        <pre className="w-full font-inter text-sm py-4 overflow-y-scroll">
          {offer?.welcome_note}
        </pre>
      </div>
      {/* <div className="flex flex-col w-full gap-y-4 justify-between">
        <span className="font-poppins text-xs">Skills</span>
        <div className="flex gap-x-3">
          {prototype
            .getSkillNamesFromIDs(skills, object.safeJsonArray(offer?.primary_skills))
            .map((skillName) => (
              <BadgeV2
                key={"primary" + skillName}
                starInBadge
                color="pink"
                addClass="py-1 px-2 h-6"
              >
                {skillName}
              </BadgeV2>
            ))}
          {prototype
            .getSkillNamesFromIDs(skills, object.safeJsonArray(offer?.secondary_skills))
            .map((skillName) => (
              <BadgeV2 key={"secondary" + skillName} addClass="py-1 px-2 h-6">
                {skillName}
              </BadgeV2>
            ))}
        </div>
      </div> */}
      <div className="flex flex-col w-full gap-y-4 justify-between">
        <span className="font-poppins text-xs">Response due</span>
        <div className="flex gap-x-3">
          <IconV2 iconType="DATE" iconClassName="w-4 h-4" />
          <span className="font-poppins text-sm font-semibold">
            {formatDate.yyyy_mm_dd(offer?.response_due.toLocaleString())}
          </span>
        </div>
      </div>
    </div>
  );
}
