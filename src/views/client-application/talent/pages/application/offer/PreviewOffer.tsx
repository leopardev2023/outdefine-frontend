import { useAppSelector } from "redux/hooks/redux-hooks";
import Button from "components/Button/ButtonV2";
// Import svg
import calendarSVG from "assets/svg/talent/calendar.svg";
// import BadgeV2 from "components/V2/Badges/BadgeV2";
// import objectHelper from "helpers/object";
// import prototypeHelper from "helpers/prototype";
import formatDate from "helpers/date";
import AvatarRoleNameGroup from "views/client-application/talent/components/Group.AvatarRoleName";
import IconV2 from "components/V2/Icons/IconV2";
import IconButtonV2 from "components/V2/IconButton/IconButtonV2";
import { ReactNode } from "react";

interface PropsType {
  setOfferPreviewModal: (enabled: boolean) => void;
  setOfferConfirmModal: (enabled: boolean) => void;
  setExtendOfferModal: (enabled: boolean) => void;
  talentApp: any;
}

const PreviewOffer = ({
  setOfferPreviewModal,
  setOfferConfirmModal,
  setExtendOfferModal,
  talentApp,
}: PropsType) => {
  const createdOffer = useAppSelector((state) => state.application.createdOffer);
  // const skills = useAppSelector((state) => state.prototype.skills);

  return (
    <div className="absolute top-[150px] left-1/2 -translate-x-1/2 z-10 pb-20">
      <div className="flex flex-col items-center bg-white w-[720px] rounded-lg px-16">
        <div className="flex flex-col justify-center items-center gap-y-5">
          <IconButtonV2
            onClick={() => setOfferPreviewModal(false)}
            iconType="CLOSE"
            className="p-0 absolute right-6 top-6"
            iconClassName="w-5 h-5"
          />

          <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">Offer</h2>
        </div>
        <div className="w-full mt-7 mb-10">
          <AvatarRoleNameGroup
            user={talentApp?.User}
            role={talentApp?.FreelancerProfile?.role}
            boosted={talentApp?.boosted}
            avatarSizeClass="w-[65px] h-[65px]"
          />
        </div>
        <div className="flex flex-col w-full overflow-y-scroll">
          <div className="flex w-full gap-x-7 justify-between mb-6">
            <div className="flex flex-col gap-y-[14px] w-full">
              <span className="font-poppins text-xs">Company name</span>
              <span className="font-poppins text-sm font-semibold">
                {talentApp?.PostedJobs?.company_name}
              </span>
            </div>
            <div className="flex flex-col gap-y-[14px] w-full">
              <span className="font-poppins text-xs">Position</span>
              <span className="font-poppins text-sm font-semibold">{createdOffer?.position}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-7 gap-y-6">
            <PreviewItem
              icon={<IconV2 iconType="CLOCK" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
              text={createdOffer.term}
              title="Term"
            />
            <PreviewItem
              icon={
                <IconV2 iconType="EDUCATION" iconClassName="w-[17px] h-[17px] block mt-[2px]" />
              }
              text={createdOffer?.experience_level}
              title="Experience level"
            />
            <PreviewItem
              icon={<IconV2 iconType="CLOCK" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
              text={createdOffer.timezone}
              title="Timezone"
            />
            <PreviewItem
              icon={<IconV2 iconType="CLOCK" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
              text={`${
                createdOffer.term_of_hours
              } hours ${createdOffer.term_of_hours_duration.toLowerCase()}`}
              title="Hours"
            />
            <PreviewItem
              icon={
                <IconV2
                  iconType="DOLLAR-BLUE-CIRCLE"
                  iconClassName="w-[17px] h-[17px] block mt-[2px]"
                />
              }
              text={`${createdOffer.hourly_rate} /hr`}
              title="Hourly rate"
            />
            <PreviewItem
              icon={<IconV2 iconType="CLOCK" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
              text={createdOffer.pay_frequency}
              title="Pay frequency"
            />
            <PreviewItem
              icon={<IconV2 iconType="LOCATION" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
              text={createdOffer.location.toLowerCase()}
              title="Location"
            />
            <PreviewItem
              icon={<IconV2 iconType="LOCATION" iconClassName="w-[17px] h-[17px] block mt-[2px]" />}
              text={`${formatDate.yyyy_mm_dd(createdOffer.contract_start)} - ${
                createdOffer?.is_ongoing
                  ? "Ongoing"
                  : formatDate.yyyy_mm_dd(createdOffer?.contract_end)
              }`}
              title="Contract length"
            />
          </div>
          <div className="mt-6 flex flex-col w-full gap-y-[14px] justify-between">
            <span className="font-poppins text-xs">Welcome note</span>
            <pre className="w-full font-poppins text-xs p-6 border-[1px] border-[#2F3454] bg-lighter-gray rounded-md h-[200px] overflow-y-scroll whitespace-pre-wrap">
              {createdOffer?.welcome_note}
            </pre>
          </div>
          {/* <div className="flex flex-col w-full gap-y-[14px] justify-between mb-6 mt-7">
            <span className="font-poppins text-xs">Skills</span>
            <div className="flex gap-x-3">
              {prototypeHelper
                .getSkillNamesFromIDs(
                  skills,
                  objectHelper.safeJsonArray(createdOffer?.primary_skills),
                )
                .map((skillName) => (
                  <BadgeV2 key={skillName} color="pink" starInBadge>
                    {skillName}
                  </BadgeV2>
                ))}
              {prototypeHelper
                .getSkillNamesFromIDs(
                  skills,
                  objectHelper.safeJsonArray(createdOffer?.secondary_skills),
                )
                .map((skillName) => (
                  <BadgeV2 key={skillName}>{skillName}</BadgeV2>
                ))}
            </div>
          </div> */}
          <div className="flex flex-col w-full gap-y-[14px] justify-between mb-6 mt-7">
            <span className="font-poppins text-xs">Response due</span>
            <div className="flex gap-x-3">
              <img alt="calendarSVG" src={calendarSVG} className="w-4 h-4" />
              <span className="font-poppins text-sm font-semibold">
                {formatDate.yyyy_mm_dd(createdOffer?.response_due)}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-8 flex justify-center gap-x-8">
          <Button
            type="button"
            className="w-[130px] px-0"
            variant="secondary"
            onClick={() => {
              setOfferPreviewModal(false);
              setExtendOfferModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="button"
            className="w-[130px] px-0"
            variant="primary"
            onClick={() => {
              setOfferPreviewModal(false);
              setOfferConfirmModal(true);
            }}
          >
            Send offer
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PreviewOffer;

interface IPreviewItemProps {
  icon: ReactNode;
  title: string;
  text: string;
}

export function PreviewItem(props: IPreviewItemProps) {
  return (
    <div className="flex flex-col gap-y-[14px] w-full">
      <span className="font-poppins text-xs">{props.title}</span>
      <div className="flex justify-start items-start gap-x-4">
        {props.icon}
        <span className="font-poppins text-sm font-semibold first-letter:capitalize">
          {props.text}
        </span>
      </div>
    </div>
  );
}
