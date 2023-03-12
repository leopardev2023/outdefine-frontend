import { ReactElement } from 'react';

import IconBadgeV2 from 'components/V2/IconBadge';
import IconV2 from 'components/V2/Icons';

const ReviewCardV2: React.FC<IReviewCardV2> = (props): ReactElement => {
  return (
    <div className='w-[470px] p-3 flex gap-4 border-[1px] border-dark-gray rounded-lg'>
      <div className='w-[140px] min-w-[140px] h-full rounded-lg bg-[#FF5757]'></div>
      <div>
        <p className='flex justify-between font-poppins font-semibold text-sm leading-[150%] items-center'>
          {props.name}
          <span className='flex gap-[2px]'>
            <IconV2 iconType='RATINGSTAR' iconClassName='w-6 h-6' />
            <IconV2 iconType='RATINGSTAR' iconClassName='w-6 h-6' />
            <IconV2 iconType='RATINGSTAR' iconClassName='w-6 h-6' />
            <IconV2 iconType='RATINGSTAR' iconClassName='w-6 h-6' />
            <IconV2 iconType='RATINGSTAR' iconClassName='w-6 h-6' />
          </span>
        </p>
        <p className='mt-2 text-xs leading-[150%]'>{props?.description}</p>
        <IconBadgeV2 addClass='mt-3' iconType='COMPANY'>
          {props.companyName}
        </IconBadgeV2>
        <IconBadgeV2 addClass='mt-1' iconType='USER'>
          {props.position}
        </IconBadgeV2>
      </div>
    </div>
  );
};

export default ReviewCardV2;
