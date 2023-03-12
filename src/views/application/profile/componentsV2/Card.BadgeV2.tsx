import { ReactElement } from 'react';

import IconBadgeV2 from 'components/V2/IconBadge';
import formatDate from 'helpers/date';

export default function TalentBadgeCardV2({
  badgeType,
  imageClassName,
  date,
}: ITalentBadgeCardV2): ReactElement {
  const data: Record<any, any> = {
    'TRUSTED-TALENT': {
      title: 'Assessment Badge',
      subtitle: 'Completed assessment',
      image: '/profile/trusted-talent-badge.png',
      backgroundColor: 'bg-odf',
    },
  };

  return (
    <div className='p-4 w-[300px] border-[1px] border-dark-gray rounded-lg'>
      <div
        className={`w-full h-[196px] rounded-lg relative ${data[badgeType].backgroundColor}`}
      >
        <img
          src={data[badgeType]?.image ?? ''}
          className={`${imageClassName} relative`}
          alt='badge-show'
        />
      </div>
      <div className='mt-4'>
        <h5 className='text-base font-poppins leading-6 font-semibold'>
          {data[badgeType].title}
        </h5>
        <IconBadgeV2 addClass='mt-3' iconClassName='w-6 h-6' iconType={'BADGE'}>
          {data[badgeType].subtitle}
        </IconBadgeV2>
        <IconBadgeV2 addClass='mt-4' iconClassName='w-6 h-6' iconType={'DATE'}>
          {formatDate.mmyyyy(new Date(date).toLocaleDateString())}
        </IconBadgeV2>
      </div>
    </div>
  );
}
