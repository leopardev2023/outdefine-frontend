import { useState } from "react";
import { useAppSelector } from "redux/hooks/redux-hooks";

import NameRoleLocation from "./Group.NameRoleLocation";
import { AvatarWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";

import expSVG from "assets/svg/talent/exp.svg";
import dollarSVG from "assets/svg/talent/dollar.svg";
import locationSVG from "assets/svg/talent/location.svg";
import usdCoinSVG from "assets/svg/application/usdCoin.svg";
import Button from "components/Button/ButtonV2";
import BadgeV2 from "components/V2/Badges/BadgeV2";
import threeDotsSVG from "assets/svg/application/threeDots.svg";
import scoresSVG from "assets/svg/application/scores.svg";
import messageSVG from "assets/svg/application/message.svg";
import declineSVG from "assets/svg/application/decline.svg";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import objectHelper from "helpers/object";

import useTalentProfile from "../hooks/useTalentProfile";
interface PropsType {
  applyCheck?: boolean;
  setMsgModal: (enabled: boolean) => void;
  setDeclineModal: (enabled: boolean) => void;
  setInterviewModal: (enabled: boolean) => void;
  setTalentApp: (enabled: any) => any;
  app: any;
  selectedId: any;
}
const TalentCardApp = ({
  applyCheck,
  setMsgModal,
  setDeclineModal,
  setInterviewModal,
  setTalentApp,
  app,
  selectedId,
}: PropsType) => {
  const { goToTalentProfile, loading } = useTalentProfile();

  const [menu, setMenu] = useState<any>(false);
  const roles = useAppSelector((state) => state.prototype.roles);

  const handleMenuClick = () => {
    setMenu(!menu);
  };

  const messageClick = () => {
    setMsgModal(true);
    setMenu(false);
    setTalentApp(app);
  };

  const scoresClick = () => {
    toast.custom(<Toast type="warning" message="View scores would just be an attached pdf of the report we receive from their assessment" />);
    setMenu(false);
  };

  const declineClick = () => {
    setDeclineModal(true);
    setMenu(false);
    setTalentApp(app);
  };

  return (
    <div className="w-full rounded-[15px] bg-white pt-5 pl-4 pr-7 pb-5 flex justify-between items-end relative shadow-card">
      <div className="flex gap-5">
        <AvatarWithDefaultV2
          src={app?.User?.avatar}
          background={app?.User?.background_number}
          className="w-14 h-14 rounded-full"
        />
        <div className="flex flex-col gap-4">
          <div className="flex gap-x-3 items-start">
            <NameRoleLocation
              name={app?.User?.first_name + " " + app?.User?.last_name}
              role={roles.find((_role) => _role.id === app?.FreelancerProfile?.role)?.name ?? ""}
            />
            {applyCheck && <img alt="experience" src={usdCoinSVG} className="w-4 h-4 mt-[5px]" />}
          </div>
          <div className="flex gap-5 items-center">
            <div className="flex gap-x-8">
              <div className="w-[100px] h-[26px] flex gap-x-2 items-center">
                <img alt="experience" src={expSVG} className="w-[20px] h-[20px]" />
                <span className="w-full text-inactive-gray text-sm font-bold">
                  {app?.FreelancerProfile?.years_of_experience} years
                </span>
              </div>
              <div className="w-[100px] h-[26px] flex gap-x-2 items-center">
                <img alt="dollar" src={dollarSVG} className="w-[20px] h-[20px]" />
                <span className="w-full text-inactive-gray text-sm font-bold">
                  {app?.FreelancerProfile?.markup_hourly_rate || app?.FreelancerProfile?.hourly_rate}/hr
                </span>
              </div>
              <div className="w-auto h-[26px] flex gap-x-2 items-center">
                <img alt="location" src={locationSVG} className="w-[20px] h-[20px]" />
                <span className="w-full text-inactive-gray text-sm font-bold">
                  {app?.FreelancerProfile?.city}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 items-center">
            {(() => {
              return (
                <>
                  {app?.FreelancerProfile.skills.slice(0, 5).map((skill, index) =>
                    skill.freelancer_skill.is_primary ? (
                      <BadgeV2
                        color="pink"
                        starInBadge
                        key={skill.name + index}
                        addClass="h-6 w-fit px-2 first:capitalize"
                      >
                        {skill.name}
                      </BadgeV2>
                    ) : (
                      <BadgeV2 key={skill.name + index} addClass="h-6 w-fit px-2 first:capitalize">
                        {skill.name}
                      </BadgeV2>
                    ),
                  )}
                </>
              );
            })()}
            {/* 
              {objectHelper
                .safeJsonArray(app?.PostedJobs.secondary_skills)
                .map((item, index) => (
                  <BadgeV2 addClass='h-6' key={index}>
                    {skills[item].name}
                  </BadgeV2>
                ))} */}
          </div>
          <div className="flex gap-x-3 items-center">
            <span>Open to:</span>

            {objectHelper
              .safeJsonArray(app?.FreelancerProfile?.roles_open_to)
              ?.map((item, index) => (
                <BadgeV2 color="orange" addClass="capitalize py-1 h-6" key={index}>
                  {item.value.toLowerCase()}
                </BadgeV2>
              ))}
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
        <div className="dropdown list-none p-0 m-0 absolute right-[-173px] top-12 rounded-md w-[198px] pt-4 px-4 shadow-xl bg-white z-30">
          <ul className="pb-4">
            <li
              className="text-xs px-3 py-5 hover:bg-odf-light hover:cursor-pointer rounded-md flex gap-x-3 items-center"
              onClick={messageClick}
            >
              <img alt="messageSVG" src={messageSVG} className="w-5 h-5" />
              View message
            </li>
            <li
              className="text-xs px-3 py-5 hover:bg-odf-light hover:cursor-pointer rounded-md flex gap-x-3 items-center"
              onClick={scoresClick}
            >
              <img alt="scoresSVG" src={scoresSVG} className="w-5 h-5" />
              View scores
            </li>
            <li
              className="text-xs px-3 py-5 hover:bg-odf-light hover:cursor-pointer rounded-md flex gap-x-3 items-center"
              onClick={declineClick}
            >
              <img alt="declineSVG" src={declineSVG} className="w-5 h-5" />
              Decline talent
            </li>
          </ul>
        </div>
      )}
      <div className="flex gap-x-9 shadow-none">
        <Button
          onClick={() => goToTalentProfile(app.freelancer_id)}
          loading={loading}
          type="button"
          variant="secondary"
          className="h-10 w-[160px] px-0"
        >
          Profile
        </Button>
        <Button
          type="button"
          variant="primary"
          className="h-10 w-[160px] px-0"
          onClick={() => {
            setInterviewModal(true);
            setTalentApp(app);
          }}
        >
          Interview
        </Button>
      </div>
    </div>
  );
};

export default TalentCardApp;
