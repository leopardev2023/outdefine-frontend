import { ReactElement, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';

import Button from 'components/Button/ButtonV2';
import BadgeV2 from 'components/V2/Badges/BadgeV2';
import BannerV2 from 'views/client-application/profile/components/BannerV2';
import IconButtonV2 from 'components/V2/IconButton';
import IconV2 from 'components/V2/Icons';
import ApplyButtonGroup from './ApplyButtonGroup';
import OverViewCard from './Card.Overview';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

import objectHelper from 'helpers/object';
import protoHelper from 'helpers/prototype';
import { mixpanel_track } from 'helpers/mixpanel';

export default function ClientJobPosingOverviewPanel(props): ReactElement {
  const { id } = useParams();
  const skills = useSelector((root: RootState) => root.prototype.skills);
  const companyJobStore = useSelector((root: RootState) => root.companyjob);
  
  const jobPosting = companyJobStore.active.find((item)=> item.id === Number(id))
  
  const companyProfile = {
    is_busy: false,
    company: jobPosting?.Company ?? {},
    memebers: [],
  };

  if (!jobPosting) return <></>;

  const iconClassName = 'w-8 h-8';
  const quickViews = [
    {
      icon: <IconV2 iconType='CLOCK' iconClassName={iconClassName} />,
      title: 'Term',
      value: jobPosting?.term?.toLowerCase(),
    },
    {
      icon: <IconV2 iconType='CLOCK-SAND' iconClassName={iconClassName} />,
      title: 'Timezone',
      value: jobPosting?.timezone,
    },
    {
      icon: <IconV2 iconType='LOCATION' iconClassName={iconClassName} />,
      title: 'Location',
      value: jobPosting?.location?.toLowerCase(),
    },
    {
      icon: <IconV2 iconType='EDUCATION' iconClassName={iconClassName} />,
      title: 'Experience level',
      value: jobPosting?.experience_level?.toLowerCase(),
    },
    {
      icon: <IconV2 iconType='MONEY-WALLET' iconClassName={iconClassName} />,
      title: 'Compensation',
      value: (
        <>
          <IconV2 iconType={'DOLLAR-BLUE-CIRCLE'} iconClassName='w-4 h-4' />
          {jobPosting?.hourly_min_rate}-{jobPosting?.hourly_max_rate} /hr
        </>
      ),
    },
    {
      icon: <IconV2 iconType='DOCUMENT' iconClassName={iconClassName} />,
      title: 'Visa Sponsor',
      value: jobPosting?.visa_sponsor ? 'Yes' : 'None',
    },
  ];


  return (
    <main className='w-full h-full overflow-x-hidden overflow-y-scroll flex'>
    <div className='flex flex-col max-w-[1040px] w-full mx-auto'>
       <BannerV2/>
       <div className='relative'>
       <NavLink to='/company?tab=job'>
          <IconButtonV2
            iconType='BTN-BACK-RECTANGLE'
            className='absolute top-19'
          />
        </NavLink>
    <div className="mt-12 w-full px-20">
      <div className='w-full flex justify-center gap-5 flex-wrap'>
        {quickViews.map((view, index) => (
          <OverViewCard key={view.title + index} {...view} />
        ))}
      </div>
      <div className='mt-11 bg-white rounded-lg shadow-card px-7 py-8'>
        <h4 className='font-poppins font-semibold text-base'>Overview</h4>
        <pre className='mt-[9px] font-inter text-xs leading-[18px] pre-tag-wrap'>
          {jobPosting?.description}
        </pre>
        <h4 className='font-poppins font-semibold text-base mt-5'>Skills</h4>
        <div className='mt-4 flex flex-wrap gap-x-4 gap-y-2'>
          {protoHelper
            .getSkillNamesFromIDs(
              skills,
              objectHelper
                .safeJsonArray(jobPosting?.primary_skills)
                .map((skill) => Number(skill))
            )
            .map((skill, index) => (
              <BadgeV2 color='pink' starInBadge>
                {skill}
              </BadgeV2>
            ))}
          {protoHelper
            .getSkillNamesFromIDs(
              skills,
              objectHelper
                .safeJsonArray(jobPosting?.secondary_skills)
                .map((skill) => Number(skill))
            )
            .map((skill, index) => (
              <BadgeV2>{skill}</BadgeV2>
            ))}
        </div>
        <h4 className='font-poppins font-semibold text-base mt-6'>
          Requirements
        </h4>
        <pre className='mt-5 font-inter text-xs leading-[18px] pre-tag-wrap'>
          {jobPosting?.looking_for_description}
        </pre>
        <h4 className='font-poppins font-semibold text-base mt-6'>Duties</h4>
        <pre className='mt-5 font-inter text-xs leading-[18px] pre-tag-wrap'>
          {jobPosting?.duties}
        </pre>
        <p className='mt-[18px] font-poppins text-xs'>Number of hires</p>
        <div className='mt-[14px] w-[70px] h-10 flex items-center justify-center gap-2 rounded-lg border-odf border-[1px] font-inter text-xs'>
          <IconV2 iconType='USER' iconClassName='w-4 h-4' />
          <span className='w-2'>{jobPosting?.number_of_hires}</span>
        </div>
      </div>
    </div>
    </div>
    </div>
    </main>
  );
}
