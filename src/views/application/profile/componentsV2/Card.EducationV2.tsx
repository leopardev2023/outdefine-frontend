import { ReactElement, ReactNode } from 'react';

import IconV2 from 'components/V2/Icons';
import BadgeV2 from 'components/V2/Badges/BadgeV2';

export default function TalentEducationCardV2(props: {
  education?: ITalentEducation;
  children?: ReactNode;
}): ReactElement {
  if (props.education?.self_taught) {
    return (
      <div className='min-w-[360px] h-fit p-[28px_34px_28px_20px] border-dark-gray border-[1px] rounded-lg relative'>
        <div className='flex gap-4 items-center'>
          <span className='flex w-[52px] h-[52px] bg-odf rounded-lg'>
            <IconV2 iconType={'BANK'} iconClassName='m-auto' />
          </span>
          <div className='font-poppins text-base font-semibold'>
            Self-taught
          </div>
        </div>
        {props.children}
      </div>
    );
  }

  return (
    <div className='min-w-[360px] h-fit p-[28px_34px_28px_20px] border-dark-gray border-[1px] rounded-lg relative'>
      <div className='flex gap-4 items-center'>
        <span className='flex w-[52px] h-[52px] bg-odf rounded-lg'>
          <IconV2 iconType={'BANK'} iconClassName='m-auto' />
        </span>
        <div>
          <p className='font-poppins font-bold text-base leading-[150%]'>
            {props.education?.name}
          </p>
          <p className='font-semibold text-sm leading-[150%] font-inter'>
            {props.education?.major}
          </p>
        </div>
      </div>
      <div className='mt-4 flex gap-3'>
        <BadgeV2 addClass='h-6 px-4 font-semibold'>
          {props.education?.degree}
        </BadgeV2>
        <BadgeV2 addClass='h-6 px-4 font-semibold'>
          Class of{' '}
          {props.education?.end_date &&
            new Date(props.education.end_date).getFullYear()}
        </BadgeV2>
      </div>
      {props.children}
    </div>
  );
}
