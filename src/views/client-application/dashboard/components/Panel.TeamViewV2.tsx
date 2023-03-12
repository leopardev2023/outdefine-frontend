import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import TypographyV2 from 'components/Typography/TypographyV2';
import BadgeV2 from 'components/V2/Badges/BadgeV2';

const color_info = {
  admin: 'blue',
  recruiter: 'purple',
  'hiring manager': 'pink',
  billing: 'orange',
};

const TeamViewV2 = () => {
  const profile = useSelector((root: RootState) => root.companyprofile);

  return (
    <div className='pt-9 pb-7 pl-4 pr-2'>
      <div className='relative max-h-[600px] min-h-[600px] overflow-auto pr-2 auto-hide-scrollbar-parent'>
        {profile.is_busy && profile.memebers.length === 0 && (
          <div className='lds-ripple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <div className='border-coral-red border-[4px]'></div>
            <div className='border-coral-red border-[4px]'></div>
          </div>
        )}

        {profile.memebers.length <= 1 && (
          <div className='mt-32 px-9'>
            <img
              src={'common/spaceboy/refer_friend_astros.png'}
              alt='refer friend astros'
            />
            <TypographyV2
              variant='p1'
              className='mt-8 text-center font-poppins font-bold !text-base leading-6'
            >
              Start referring friends to Outdefine
            </TypographyV2>
            <p className='font-semibold text-xs leading-[18px] mt-[30px] text-center'>
              Invite your team and assign them to particular roles.
            </p>
          </div>
        )}

        {profile.memebers.length > 1 &&
          profile.memebers
            .filter(
              (member) =>
                member.User?.email_id !== profile.profile?.User?.email_id
            )
            .map((member, index) => (
              <div
                key={member?.User ? member?.User?.email_id + index : index}
                className='flex px-2 py-3 justify-between border-b-[1px] border-b-[#8A8A8A] border-solid last:border-none'
              >
                <div className='flex gap-2 items-center'>
                  <span className='block w-[50px] h-[50px] bg-theme rounded-full' />
                  <p>
                    <span className='font-poppins font-bold text-sm leading-[21px]'>
                      {member.User?.first_name ??
                        '' + member.User?.last_name ??
                        ''}
                    </span>
                    <span className='block mt-[6px] text-xs leading-[18px] pb-1'>
                      {member.User?.email_id}
                    </span>
                  </p>
                </div>

                <div className='font-semibold text-xs flex flex-col items-end justify-between'>
                  Position
                  <BadgeV2
                    color={
                      color_info[
                        member.position
                          ? member?.position?.toLocaleLowerCase()
                          : 0
                      ]
                    }
                    addClass='w-fit h-6 px-2 capitalize'
                  >
                    {member?.position?.toLocaleLowerCase()}
                  </BadgeV2>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TeamViewV2;
