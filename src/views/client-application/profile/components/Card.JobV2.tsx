import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { useAppSelector } from "redux/hooks/redux-hooks";

import BadgeV2 from "components/V2/Badges/BadgeV2";
import { LogoWithDefaultV2 } from "../../components/Images.WithDefaultV2";
import IconV2 from "components/V2/Icons";

import objectHelper from "helpers/object";
import protoTypeHelper from "helpers/prototype";
import TripleInfoWithBadges from "./Bar.TripleInfoWithBadges";

const JobCardV2: React.FC<IJobCardV2> = (props): ReactElement => {
  const companyPreference = useSelector((root: RootState) => root.companyprofile.company);
  const skills = useSelector((root: RootState) => root.prototype.skills);
  const { userRole } = useAppSelector((state) => state.authentication);

  const difference = props.createdAt
    ? Math.floor(
        (new Date().getTime() - new Date(props.createdAt).getTime()) / (1000 * 60 * 60 * 24),
      )
    : 0;

  const companyName = props.viewFromTalent
    ? props?.Company?.name ?? ""
    : companyPreference?.name ?? "";
  const location = props.viewFromTalent
    ? props.Company?.remote_first
      ? "Remote"
      : props.Company?.city ?? ""
    : companyPreference?.remote_first
    ? "Remote"
    : companyPreference?.city ?? "";

  const numberOfEmployees = props.viewFromTalent
    ? props.Company?.number_of_employees ?? ""
    : companyPreference?.number_of_employees ?? "";

  return (
    <section
      data-cy="job-container"
      className="w-full rounded-lg bg-white p-[40px_12px_12px_12px] lg:p-[22px_20px_14px_84px] mb-10 border-[1px] border-[#A9ACB1] relative"
    >
      {props.companyLogo ? (
        <LogoWithDefaultV2
          src={props?.companyLogo ?? ""}
          className="w-12 h-12 rounded-full absolute top-5 lg:top-6 left-1/2 lg:left-5 max-lg:-translate-x-1/2"
        />
      ) : (
        <span className="absolute top-5 lg:top-6 left-1/2 lg:left-5 w-12 h-12 p-[5px] max-lg:-translate-x-1/2">
          <IconV2 iconType="OUTDEF-LOGO" iconClassName="w-full h-full min-w-[40px] m-auto" />
        </span>
      )}
      <div className="w-full flex flex-col lg:flex-row justify-between">
        <div>
          <TripleInfoWithBadges
            texts={[props.Company?.industry ?? "", location, `${numberOfEmployees} employees`]}
            icons={[
              <IconV2 iconType="COMPANY" iconClassName="w-5 h-5" />,
              <IconV2 iconType="LOCATION" iconClassName="w-5 h-5" />,
              <IconV2 iconType="USER" iconClassName="w-5 h-5" />,
            ]}
            wrapperClass="gap-2 lg:gap-[26px] capitalize"
            textWrapperClass="max-w-[130px] truncate"
          />

          <div className="mt-3">
            <span className="font-inter font-semibold text-inactive-gray text-[14px]">
              Highlights
            </span>
            <div className="mt-3 flex flex-wrap gap-4">
              {[
                props?.term?.toLocaleLowerCase() ?? "Term",
                props?.timezone ?? "Timezone",
                props?.experience_level ?? "Level",
                `$${props?.hourly_min_rate ?? 0} - ${props?.hourly_max_rate ?? 0} /hr`,
                props.location?.toLowerCase() ?? "Location",
              ].map((badge, index) => (
                <BadgeV2 key={badge ?? "" + index} addClass="h-6 w-fit px-2 first:capitalize">
                  {badge}
                </BadgeV2>
              ))}
            </div>
          </div>
          <div className="mt-[10px]">
            <span className="font-inter font-semibold text-inactive-gray text-[14px]">Skills</span>
            <div className="mt-3 flex flex-wrap gap-4">
              {(() => {
                const primarySkills = objectHelper.safeJsonArray(props.primary_skills);
                const secondarySkills = objectHelper.safeJsonArray(props.secondary_skills);
                return (
                  <>
                    {protoTypeHelper
                      .getSkillNamesFromIDs(skills, primarySkills.slice(0, 5))
                      .map((skill, index) => (
                        <BadgeV2
                          color="pink"
                          starInBadge
                          key={skill + index}
                          addClass="h-6 w-fit px-2 first:capitalize"
                        >
                          {skill}
                        </BadgeV2>
                      ))}
                    {protoTypeHelper
                      .getSkillNamesFromIDs(
                        skills,
                        primarySkills.length >= 5
                          ? []
                          : secondarySkills.slice(0, 5 - primarySkills.length),
                      )
                      .map((skill, index) => (
                        <BadgeV2 key={skill + index} addClass="h-6 w-fit px-2 first:capitalize">
                          {skill}
                        </BadgeV2>
                      ))}
                  </>
                );
              })()}
            </div>
          </div>
          {props.actively_hiring || (props.number_of_hires && props.number_of_hires) ? (
            <div className="mt-4 flex items-center gap-6 font-semibold text-xs leading-[18px] text-[#8A8A8A] min-h-[24px]">
              {props.actively_hiring && (
                <BadgeV2 color="pink" addClass="w-fit font-normal px-2 h-6">
                  Actively hiring
                </BadgeV2>
              )}
              {props.number_of_hires && props.number_of_hires !== "1" && (
                <BadgeV2 color="orange" addClass="h-6 w-fit font-normal px-2 last:capitalize">
                  <IconV2 iconType={"USER-ORANGE"} />
                  Hiring multiple talent
                </BadgeV2>
              )}
              {/* {difference === 0 ? 'Today' : difference + 'd'} */}
            </div>
          ) : (
            false
          )}
        </div>
        {props.children}
      </div>

      {/* <div data-cy="job-button-container" className="ml-auto w-fit">
        <NavLink to={"post/" + props.id}>
          <Button className="w-fit mt-3 lg:mt-0 pl-8 pr-4 flex items-center gap-1">
            {isApplied ? "View job" : "Apply now"}
            <IconV2 iconClassName="w-6 h-4" iconType="ARROW-RIGHT" />
          </Button>
        </NavLink>
      </div> */}
    </section>
  );
};

export default JobCardV2;
