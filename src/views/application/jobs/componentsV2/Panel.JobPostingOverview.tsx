import { ReactElement, useEffect } from "react";
import { useParams } from "react-router-dom";

import BadgeV2 from "components/V2/Badges/BadgeV2";
import IconV2 from "components/V2/Icons";
import ApplyButtonGroup from "./ApplyButtonGroup";
import OverViewCard from "./Card.Overview";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import objectHelper from "helpers/object";
import protoHelper from "helpers/prototype";
import { mixpanel_track } from "helpers/mixpanel";

interface PropsType {
  data?: IJobPostingV2 | undefined;
}

export default function JobPosingOverviewPanel(props: PropsType): ReactElement {
  const { jobId } = useParams();
  const skills = useSelector((root: RootState) => root.prototype.skills);

  const vetted = useSelector(
    (root: RootState) => root.profile.is_trusted_talent === "TRUSTED",
  );

  if (!props) return <></>;

  const iconClassName = "w-8 h-8";
  const quickViews = [
    {
      icon: <IconV2 iconType='CLOCK' iconClassName={iconClassName} />,
      title: "Term",
      value: props?.data?.term?.toLowerCase(),
    },
    {
      icon: <IconV2 iconType='CLOCK-SAND' iconClassName={iconClassName} />,
      title: "Timezone",
      value: props?.data?.timezone,
    },
    {
      icon: <IconV2 iconType='LOCATION' iconClassName={iconClassName} />,
      title: "Location",
      value: props?.data?.location?.toLowerCase(),
    },
    {
      icon: <IconV2 iconType='EDUCATION' iconClassName={iconClassName} />,
      title: "Experience level",
      value: props?.data?.experience_level?.toLowerCase(),
    },
    {
      icon: <IconV2 iconType='MONEY-WALLET' iconClassName={iconClassName} />,
      title: "Compensation",
      value: (
        <>
          <IconV2 iconType={"DOLLAR-BLUE-CIRCLE"} iconClassName='w-4 h-4' />
          {props?.data?.hourly_min_rate}-{props?.data?.hourly_max_rate} /hr
        </>
      ),
    },
    {
      icon: <IconV2 iconType='DOCUMENT' iconClassName={iconClassName} />,
      title: "Visa Sponsor",
      value: props?.data?.visa_sponsor ? "Yes" : "None",
    },
  ];

  useEffect(() => {
    mixpanel_track("Job is viewed by trusted talent", { jobId });
  }, []);

  return (
    <>
      <div className='w-full flex justify-center gap-2 md:gap-5 flex-wrap'>
        {quickViews.map((view, index) => (
          <OverViewCard key={view.title + index} {...view} />
        ))}
      </div>
      <div className='mt-11 bg-white rounded-lg shadow-card px-7 py-8'>
        <h4 className='font-poppins font-semibold text-base'>Overview</h4>
        <pre className='mt-[9px] font-inter text-xs leading-[18px] pre-tag-wrap'>
          {props?.data?.description}
        </pre>
        <h4 className='font-poppins font-semibold text-base mt-5'>Skills</h4>
        <div className='mt-4 flex flex-wrap gap-x-4 gap-y-2'>
          {protoHelper
            .getSkillNamesFromIDs(
              skills,
              objectHelper
                .safeJsonArray(props?.data?.primary_skills)
                .map((skill) => Number(skill)),
            )
            .map((skill) => (
              <BadgeV2 key={skill} color='pink' starInBadge>
                {skill}
              </BadgeV2>
            ))}
          {protoHelper
            .getSkillNamesFromIDs(
              skills,
              objectHelper
                .safeJsonArray(props?.data?.secondary_skills)
                .map((skill) => Number(skill)),
            )
            .map((skill) => (
              <BadgeV2 key={skill}>{skill}</BadgeV2>
            ))}
        </div>
        <h4 className='font-poppins font-semibold text-base mt-6'>
          Requirements
        </h4>
        <pre className='mt-5 font-inter text-xs leading-[18px] pre-tag-wrap'>
          {props?.data?.looking_for_description}
        </pre>
        <h4 className='font-poppins font-semibold text-base mt-6'>Duties</h4>
        <pre className='mt-5 font-inter text-xs leading-[18px] pre-tag-wrap'>
          {props?.data?.duties}
        </pre>
        <p className='mt-[18px] font-poppins text-xs'>Number of hires</p>
        <div className='mt-[14px] w-[70px] h-10 flex items-center justify-center gap-2 rounded-lg border-odf border-[1px] font-inter text-xs'>
          <IconV2 iconType='USER' iconClassName='w-4 h-4' />
          <span className='w-2'>{props?.data?.number_of_hires}</span>
        </div>
      </div>

      {vetted && (
        <div className='mt-10 relative w-fit mx-auto flex gap-8'>
          <ApplyButtonGroup />
        </div>
      )}
    </>
  );
}
