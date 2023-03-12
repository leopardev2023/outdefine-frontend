import { useState } from "react";
import { useAppSelector } from "redux/hooks/redux-hooks";
import Button from "components/Button/ButtonV2";
import BadgeV2 from "components/V2/Badges/BadgeV2";
import threeDotsSVG from "assets/svg/application/threeDots.svg";
import uploadSVG from "assets/svg/application/upload.svg";

import { LogoWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";

import useTalentProfile from "../hooks/useTalentProfile";
import AvatarRoleNameGroup from "./Group.AvatarRoleName";
import formatDate from "helpers/date";

interface PropsType {
  setWithdrawModal: (enabled: boolean) => void;
  setWithDrawConfirmModal: (enabled: boolean) => void;
  setViewOfferModal: (enabled: boolean) => void;
  setOfferItem: (enabled: any) => void;
  offer: any;
}
const TalentOffer = ({
  setWithdrawModal,
  setWithDrawConfirmModal,
  setViewOfferModal,
  setOfferItem,
  offer,
}: PropsType) => {
  const [menu, setMenu] = useState<any>(false);
  const company = useAppSelector((state) => state.companyprofile.company);

  const { goToTalentProfile, loading } = useTalentProfile();

  const handleMenuClick = () => {
    setMenu(!menu);
  };

  const wdOfferClick = () => {
    setOfferItem(offer);
    setWithdrawModal(true);
    setMenu(false);
  };
  const convertDateDue = (dt: string) => {
    const date = new Date(dt);
    const fDate =
      (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
      "/" +
      (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
      "/" +
      date.getFullYear();
    return fDate;
  };

  const convertDateContract = (dt: string) => {
    const date = new Date(dt);
    const fDate =
      (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
      "/" +
      date.getFullYear();
    return fDate;
  };

  return (
    <div className="w-full rounded-[15px] bg-white pt-[22px] pl-[18px] pr-7 pb-5 flex justify-between items-end relative shadow-card">
      <div className="flex justify-start gap-x-5 w-full">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <LogoWithDefaultV2 src={company?.logo ?? ""} className="w-14 h-14" />
        </div>
        <div className="flex flex-col gap-y-3 w-full">
          <span className="text-base font-poppins font-bold">{offer?.["position"]}</span>
          <div className="flex gap-5 justify-between">
            <AvatarRoleNameGroup
              role={offer?.FreelancerProfile?.role}
              user={offer?.User}
              avatarSizeClass="w-11 h-11 rounded-full"
            />
            <div className="flex flex-col justify-end items-end gap-y-1">
              <span className="font-bold font-poppins text-base">
                ${offer?.["hourly_rate"]} /hr
              </span>
              <div className="flex gap-x-2 justify-end items-center">
                <span className="text-xs">Response due</span>
                <BadgeV2 color="purple" addClass="p-2 h-6">
                  {formatDate.yyyy_mm_dd(offer?.response_due)}
                </BadgeV2>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-x-5 items-center">
                {/* {JSON.parse(offer?.FreelancerProfile?.roles_open_to)?.length >
                  0 &&
                  JSON.parse(offer?.FreelancerProfile?.roles_open_to)?.map(
                    (item, index) => (
                      <BadgeV2 key={index} addClass=' h-6'>
                        {item}
                      </BadgeV2>
                    )
                  )} */}
                <BadgeV2 addClass="p-2 h-6">
                  {offer?.FreelancerProfile?.level_of_experience}
                </BadgeV2>
                <BadgeV2 addClass="p-2 h-6">
                  {offer?.term_of_hours} hours {offer?.term_of_hours_duration?.toLocaleLowerCase()}
                </BadgeV2>
                <BadgeV2 addClass="p-2 h-6">
                  ${offer?.hourly_rate} /hr {offer?.pay_frequency}
                </BadgeV2>
                <BadgeV2 addClass="capitalize h-6">{offer?.location?.toLowerCase()}</BadgeV2>
              </div>
              <div className="flex gap-x-3 items-center">
                <BadgeV2>{offer?.["timezone"]}</BadgeV2>
                <BadgeV2 addClass="p-2 h-6">
                  {formatDate.yyyy_mm_dd(offer?.contract_start)} -{" "}
                  {offer.is_ongoing ? "Ongoing" : formatDate.yyyy_mm_dd(offer?.contract_end)}
                </BadgeV2>
              </div>
            </div>
            <div className="flex gap-x-9 shadow-none h-10">
              <Button
                onClick={() => {
                  goToTalentProfile(offer?.FreelancerProfile.freelancer_id);
                }}
                type="button"
                variant="secondary"
              >
                Profile
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  setOfferItem(offer);
                  setViewOfferModal(true);
                }}
              >
                View offer
              </Button>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="button w-[38px] h-[18px] top-4 right-7 absolute"
        onClick={handleMenuClick}
      >
        <img alt="threeDotsSVG" src={threeDotsSVG} />
      </button>
      {menu && (
        <div className="dropdown list-none p-0 m-0 absolute right-[-173px] top-12 rounded-md w-[198px] pt-5 px-4 shadow-xl bg-white z-30">
          <ul className="pb-5">
            <li
              className="px-3 py-5 hover:bg-odf-light hover:cursor-pointer rounded-md flex gap-x-3 items-center text-xs"
              onClick={wdOfferClick}
            >
              <img alt="uploadSVG" src={uploadSVG} className="w-5 h-5" />
              Withdraw offer
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TalentOffer;
