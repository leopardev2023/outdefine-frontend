import { NavLink } from "react-router-dom";

import Button from "components/Button/ButtonV2";
import BadgeV2 from "components/V2/Badges/BadgeV2";
import IconV2 from "components/V2/Icons/IconV2";

import dateHelper from "helpers/date";
import { LogoWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";
import formatDate from "helpers/date";

interface IOfferCardV2 extends IOfferResponse {}

export default function OfferCard(props: IOfferCardV2) {
  return (
    <div className="w-full h-[170px] rounded-lg shadow-card bg-white p-[24px_24px_14px_16px] flex justify-between">
      <div>
        <div className="flex items-center gap-[14px] h-fit">
          <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
            <LogoWithDefaultV2 src={props.Company.logo ?? ""} />
          </div>

          <div>
            <h3 className="font-bold text-base">{props.position}</h3>
            <div className="flex items-center gap-2 font-inter font-semibold text-sm text-dark-gray">
              <IconV2 iconType="COMPANY" iconClassName="w-5 h-5" />
              {props.Company.name}
            </div>
          </div>
        </div>
        <div className="mt-4 pl-[60px] w-[520px] h-fit flex gap-x-4 gap-y-2 flex-wrap">
          <BadgeV2 addClass="capitalize h-6">{props.term.toLocaleLowerCase()}</BadgeV2>
          <BadgeV2>{props.experience_level}</BadgeV2>
          <BadgeV2>
            {props.term_of_hours} /hrs&nbsp;
            <span className="lowercase">{props.term_of_hours_duration}</span>
          </BadgeV2>
          <BadgeV2>
            ${props.hourly_rate} /hr &nbsp;
            <span className="capitalize">{props.pay_frequency.toLowerCase()}</span>
          </BadgeV2>
          <BadgeV2>
            <span className="capitalize">{props.location.toLowerCase()}</span>
          </BadgeV2>
          <BadgeV2>{props.timezone}</BadgeV2>
          <BadgeV2>
            {formatDate.yyyy_mm_dd(props.contract_start)} -{" "}
            {props.is_ongoing ? "Ongoing" : formatDate.yyyy_mm_dd(props.contract_end)}
          </BadgeV2>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <h6 className="font-bold text-base">${props.hourly_rate} /hr</h6>
        <div className="mt-1 flex items-center gap-2">
          <span className="font-inter font-semibold text-xs text-dark-gray">Response due:</span>
          <BadgeV2>{dateHelper.yyyy_mm_dd(props.response_due)}</BadgeV2>
        </div>

        {/* View offer */}
        <NavLink to={props.id.toString()} className="block mt-auto">
          <Button>View offer</Button>
        </NavLink>
      </div>
    </div>
  );
}
