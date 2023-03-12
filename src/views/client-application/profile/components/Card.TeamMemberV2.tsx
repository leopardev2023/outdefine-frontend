import { ReactElement } from 'react';

import IconBadge from 'components/V2/IconBadge';
import { AvatarWithDefaultV2 } from 'views/client-application/components/Images.WithDefaultV2';
import {
  default_avatars,
  default_background_colors,
} from 'constants/v2/default_images';

const TeamMemberCardV2: React.FC<ITeamMember> = (props): ReactElement => {
  const { avatar, background_number } = props.User || {};

  return (
    <div className='w-[300px] border-[1px] border-dark-gray p-[20px_24px_16px_24px] rounded-lg'>
      <div
        className={`rounded w-full h-[185px] overflow-hidden flex ${
          background_number?.toString()
            ? default_background_colors[background_number]
            : 'bg-white/0'
        }`}
      >
        {avatar && (
          <AvatarWithDefaultV2
            src={avatar}
            className={`mx-auto mt-auto ${
              default_avatars[avatar] ? 'w-[178px] h-[178px]' : 'w-full h-full'
            } `}
          />
        )}
      </div>
      <div className='mt-5 flex justify-between'>
        <div>
          <h6 className='font-poppins text-sm font-semibold leading-[150%]'>
            {(props.User?.first_name ?? '') +
              ' ' +
              (props.User?.last_name ?? '')}
          </h6>
          <IconBadge
            addClass='mt-3 capitalize'
            iconClassName='w-6 h-6'
            iconType='USER'
          >
            {props?.position?.toLowerCase()}
          </IconBadge>
          <IconBadge addClass='mt-4' iconClassName='w-6 h-6' iconType='COMPANY'>
            {props.company_name}
          </IconBadge>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default TeamMemberCardV2;
