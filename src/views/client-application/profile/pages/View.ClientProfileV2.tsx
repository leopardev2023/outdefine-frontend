import { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

import Heading from 'components/Heading/HeadingV2';
import IconButtonV2 from 'components/V2/IconButton';
import IconBadgeV2 from 'components/V2/IconBadge';

import ClientProfileEditModalV2 from '../components/Modal.ClientProfileEditV2';
import { default_background_colors } from 'constants/v2/default_images';
import { AvatarWithDefaultV2 } from 'views/client-application/components/Images.WithDefaultV2';

const ClientProfileViewV2: React.FC = (): ReactElement => {
  const companyProfile = useSelector((root: RootState) => root.companyprofile);

  const [visibility, setVisibility] = useState<boolean>(false);

  const { avatar, background_number } = companyProfile.profile?.User || {};

  return (
    <>
      <div className='mt-[86px] w-full bg-white rounded-lg shadow-card p-[40px]'>
        <div className='flex justify-between'>
          <Heading
            variant={'h6'}
            className='font-semibold text-xl leading-[150%]'
          >
            My profile
          </Heading>
          <IconButtonV2
            onClick={() => setVisibility(true)}
            iconType='EDIT'
            iconClassName='w-4 h-4'
          ></IconButtonV2>
        </div>
        <div className='mt-8 flex gap-4 border-[1px] border-dark-gray rounded-lg p-3'>
          <div
            className={`flex min-w-[142px] h-[166px] rounded-lg overflow-hidden ${
              background_number?.toString()
                ? default_background_colors[background_number]
                : 'bg-white/0'
            }`}
          >
            {avatar?.toString() && (
              <AvatarWithDefaultV2
                src={avatar}
                className={'w-full object-cover max-w-[142px] mt-auto'}
              />
            )}
          </div>
          <div>
            <h4 className='font-poppins text-base font-semibold leading-[150%]'>
              {companyProfile?.name ?? ''}
            </h4>
            <p className='mt-[18px] text-xs leading-[150%] min-h-[54px] font-inter'>
              {companyProfile?.profile?.summary ?? ''}
            </p>
            <IconBadgeV2
              addClass='mt-3'
              iconClassName='w-4 h-4'
              badgeClassName='px-[6px] h-6'
              iconType={'COMPANY'}
            >
              {companyProfile?.company?.name}
            </IconBadgeV2>
            <IconBadgeV2
              addClass='mt-3'
              iconClassName='w-4 h-4'
              badgeClassName='px-[6px] h-6'
              iconType={'USER'}
            >
              {companyProfile.profile?.position ?? ''}
            </IconBadgeV2>
          </div>
        </div>
      </div>
      <ClientProfileEditModalV2
        pending={companyProfile.is_busy}
        profile={companyProfile.profile ?? {}}
        setVisibility={setVisibility}
        visibility={visibility}
      />
    </>
  );
};

export default ClientProfileViewV2;
