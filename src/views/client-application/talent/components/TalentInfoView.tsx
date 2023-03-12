import BadgeV2 from "components/V2/Badges/BadgeV2";
import IconV2 from "components/V2/Icons";

import { AvatarWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";
import NameRoleLocation from "./Group.NameRoleLocation";

import object from "helpers/object";

import { useAppSelector } from "redux/hooks/redux-hooks";
import prototype from "helpers/prototype";

export default function TalentInfoView({ talent }: any) {
  const roles = useAppSelector((state) => state.prototype.roles);

  return (
    <div className="flex justify-start">
      <div className="flex gap-5">
        <div className="min-w-[48px] min-h-[48px] w-12 h-12 relative">
          <AvatarWithDefaultV2
            src={talent?.User?.avatar}
            background={talent?.User?.background_number}
            className="rounded-full"
          />
          {talent?.is_trusted_talent === "TRUSTED" && (
            <img
              src="/common/badge/trusted_badge.png"
              alt="trusted member"
              className="absolute top-1/2 -right-1/3"
              title="Trusted talent"
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <NameRoleLocation
            name={talent?.User?.first_name + " " + talent?.User?.last_name}
            role={roles.find((_role) => _role.id === talent.role)?.name ?? ""}
            boosted={talent.boosted}
          />
          <div className="flex gap-5 items-center">
            <div className="flex gap-x-8">
              <div className="h-[26px] flex gap-x-2 items-center">
                <IconV2 iconType="EDUCATION" iconClassName="w-5 h-5 min-w-[20px]" />
                <span className="w-full text-inactive-gray text-sm font-bold">
                  {talent["years_of_experience"]} years
                </span>
              </div>
              <div className="h-[26px] flex gap-x-2 items-center">
                <IconV2 iconType="DOLLAR-BLUE-CIRCLE" iconClassName="w-5 h-5 min-w-[20px]" />
                <span className="w-full text-inactive-gray text-sm font-bold">
                  {talent?.markup_hourly_rate || talent?.hourly_rate}/hr
                </span>
              </div>
              <div className="h-[26px] flex gap-x-2 items-center">
                <IconV2 iconType="LOCATION" iconClassName="w-5 h-5 min-w-[20px]" />
                <span className="w-full text-inactive-gray text-sm font-bold">{talent?.city}</span>
              </div>
              {/* {loading && (
            <div className='w-fit h-[26px] flex gap-x-2 items-center'>
              <LoadingLogo />
            </div>
          )} */}
            </div>
          </div>
          <div className="flex flex-wrap gap-y-2 gap-x-5 items-center">
            {/* {talent?.skills.slice(0, 5).map((skill, index) =>
              skill.freelancer_skill.is_primary ? (
                <BadgeV2 color="pink" starInBadge addClass="h-6" key={"primary-" + index}>
                  {skill.name}
                </BadgeV2>
              ) : (
                <BadgeV2 addClass="h-6" key={"secondary" + index}>
                  {skill.name}
                </BadgeV2>
              ),
            )} */}
            {/* {JSON.stringify(talent?.skills)} */}
            {prototype
              .sortSkillsByPrimarity(talent?.skills ?? [])
              .slice(0, 5)
              .map((skill, index) =>
                skill.freelancer_skill.is_primary ? (
                  <BadgeV2 color="pink" starInBadge addClass="h-6" key={"primary-" + index}>
                    {skill.name}
                  </BadgeV2>
                ) : (
                  <BadgeV2 addClass="h-6" key={"secondary" + index}>
                    {skill.name}
                  </BadgeV2>
                ),
              )}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-2 items-center">
            <span className="text-xs font-inter font-semibold text-dark-gray">Open to:</span>
            {object.safeJsonArray(talent.roles_open_to).map((item, index) => (
              <BadgeV2 color="orange" addClass="h-6 capitalize" key={index}>
                {item.value.toLowerCase()}
              </BadgeV2>
            ))}

            {object.safeJsonArray(talent.terms_open_to).map((item, index) => (
              <BadgeV2 color="orange" addClass="h-6 capitalize" key={index}>
                {item.value.toLowerCase()}
              </BadgeV2>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
