import { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import Heading from "components/Heading/HeadingV2";
import BadgeV2 from "components/V2/Badges/BadgeV2";
import ModalV2 from "components/Modal/ModalV2";
import IconButtonV2 from "components/V2/IconButton";
import useWindowDimensions from "hooks/utils/useWindowDimensions";

import TalentAboutMeFormV2 from "./Form.TalentAboutMeV2";

interface TalentAboutMeV2 {
  userRole?: string;
}

export default function TalentAboutMeV2(props: TalentAboutMeV2): ReactElement {
  const { isMedium, isXs, isMobile } = useWindowDimensions();
  const profile = useSelector((root: RootState) => root.profile);
  const [visibility, setVisibility] = useState<boolean>(false);

  return (
    <>
      <div className={`
        mt-[62px] w-full bg-white rounded-lg shadow-card relative
        ${isXs ? "p-[18px]" : "p-[18px_56px_16px_36px]"}`}>
        {props.userRole === "Freelancer" && (
          <IconButtonV2
            onClick={() => setVisibility(true)}
            className="absolute top-4 right-5 w-8 h-8 bg-[#F4F4F4] rounded-lg flex items-center justify-center"
            iconType="EDIT"
            iconClassName="w-4 h-4"
          />
        )}

        <Heading variant="h6" className="font-semibold text-xl leading-[30px]">
          About me
        </Heading>
        <pre className="mt-[10px] text-sm leading-[18px] font-inter whitespace-pre-wrap">
          {profile.summary}
        </pre>
        <BadgeV2 addClass="mt-[18px] w-fit h-6 px-4">{profile.Role?.name}</BadgeV2>
        <div className={`mt-3 flex flex-wrap ${isMedium ? "justify-between gap-2" : "gap-[106px]"}`}>
          <div>
            <h5 className="font-poppins font-semibold text-sm leading-[21px]">Experience level</h5>
            <div className="mt-[6px] flex gap-2">
              <BadgeV2 addClass="w-fit h-6 px-4">{profile.level_of_experience}</BadgeV2>
              <BadgeV2 addClass="w-fit h-6 px-4">{profile.years_of_experience} yrs</BadgeV2>
            </div>
          </div>
          <div>
            <h5 className="font-poppins font-semibold text-sm leading-[21px]">Hourly rate</h5>
            <BadgeV2 addClass="mt-[6px] w-fit h-6 px-3">${props.userRole === "Client" ? profile.markup_hourly_rate || profile.hourly_rate : profile.hourly_rate} /hr</BadgeV2>
          </div>
          <div>
            <h5 className="font-poppins font-semibold text-sm leading-[21px]">Open to</h5>
            <div className="mt-[6px] flex gap-2">
              {profile.roles_open_to &&
                JSON.parse(profile.roles_open_to).length > 0 &&
                JSON.parse(profile.roles_open_to).map((role: IData, index) => (
                  <BadgeV2 key={role.index} addClass="w-fit h-6 px-3 capitalize" color="orange">
                    {role.value.toLocaleString().toLowerCase()}
                  </BadgeV2>
                ))}
              {profile.terms_open_to &&
                JSON.parse(profile.terms_open_to).length > 0 &&
                JSON.parse(profile.terms_open_to).map((term: IData, index) => (
                  <BadgeV2 key={term.index} addClass="w-fit h-6 px-3 capitalize" color="orange">
                    {term.value.toLocaleString().toLowerCase()}
                  </BadgeV2>
                ))}
            </div>
          </div>
        </div>
        <h5 className="mt-3 font-poppins font-semibold text-sm leading-[21px]">Skills</h5>
        <div className="flex flex-wrap mt-[6px] gap-2">
          {profile.skills
            .filter((elem) => elem.freelancer_skill.is_primary)
            .map((skill: ISkillInProfile, index) => (
              <BadgeV2 starInBadge color="pink" key={skill.name + index} addClass="w-fit h-6 px-2">
                {skill.name}
              </BadgeV2>
            ))}
          {profile.skills
            .filter((elem) => !elem.freelancer_skill.is_primary)
            .map((skill: ISkillInProfile, index) => (
              <BadgeV2 color="blue" key={skill.name + index} addClass="w-fit h-6 px-2">
                {skill.name}
              </BadgeV2>
            ))}
        </div>
      </div>
      {props.userRole === "Freelancer" && (
        <ModalV2 isOpen={visibility} onClose={() => setVisibility(false)}>
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className={`
              overflow-x-hidden w-[720px] pb-20 absolute left-1/2 top-[150px] -translate-x-1/2 z-10
              ${isMedium ? "w-[90%]" : "w-[720px]"}
            `}>
            <TalentAboutMeFormV2 profile={profile} onClose={() => setVisibility(false)} />
          </div>
        </ModalV2>
      )}
    </>
  );
}
