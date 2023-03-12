import { ReactElement, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

// IMPORT SVG IMAGES
import { ReactComponent as UserOutlineSvg } from 'assets/V2/svg/user-outline.svg';
import { ReactComponent as ComapanySvg } from 'assets/V2/svg/company.svg';
import { ReactComponent as UserSolidSvg } from 'assets/V2/svg/user.svg';

import AboutCompanyV2 from '../components/Card.AboutCompanyV2';
import SocialBoxV2 from '../components/Card.SocialBoxV2';
import NewExpCardV2 from '../components/Card.NewExpV2';
import Button from 'components/Button/ButtonV2';
import ModalV2 from 'components/Modal/ModalV2';
import EditCompanyInfoFormV2 from '../components/Form.EditComapnyInfoV2';

const CompanyProfilePanelV2: React.FC<IProfilePanelV2> = (
  props
): ReactElement => {
  const companyProfile: ICompanyProfile = useSelector(
    (root: RootState) => root.companyprofile
  );

  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  const setupProfileHandler = () => {
    setModalVisibility(true);
    localStorage.setItem(`client_${companyProfile.id}_profile_setup`, 'true');
  };

  const createJobHandler = () => {
    localStorage.setItem(`client_${companyProfile.id}_job_posted`, 'true');
    props.onTabChange('job', 'create');
  };

  const inviteTeamHandler = () => {
    localStorage.setItem(`client_${companyProfile.id}_team_invited`, 'true');
    props.onTabChange('team', 'invite');
  };

  return (
    <>
      <section className='mt-11 mb-20'>
        <div className='flex justify-center gap-10'>
          {localStorage.getItem(`client_${companyProfile.id}_profile_setup`) !==
            'true' && (
            <NewExpCardV2
              icon={<UserOutlineSvg />}
              icon_description='Profile'
              title='Set up profile'
            >
              <Button
                onClick={setupProfileHandler}
                className='mt-4 px-4 h-[30px] flex items-center justify-center font-poppins text-xs font-semibold'
              >
                Continue
              </Button>
            </NewExpCardV2>
          )}

          {localStorage.getItem(`client_${companyProfile.id}_job_posted`) !==
            'true' && (
            <NewExpCardV2
              icon={<ComapanySvg className='w-8 h-8' />}
              icon_description='Jobs'
              title='Create a job post'
            >
              <Button
                onClick={createJobHandler}
                className='mt-4 px-4 h-[30px] flex items-center justify-center font-poppins text-xs font-semibold'
              >
                Create job
              </Button>
            </NewExpCardV2>
          )}

          {localStorage.getItem(`client_${companyProfile.id}_team_invited`) !==
            'true' && (
            <NewExpCardV2
              icon={<UserSolidSvg className='w-8 h-8' />}
              icon_description='Jobs'
              title='Invite your team'
            >
              <Button
                onClick={inviteTeamHandler}
                className='mt-4 px-4 h-[30px] flex items-center justify-center font-poppins text-xs font-semibold'
              >
                Invite
              </Button>
            </NewExpCardV2>
          )}
        </div>

        <AboutCompanyV2
          setModalVisibility={(val: boolean) => setModalVisibility(val)}
        />

        <SocialBoxV2 />
      </section>

      <ModalV2
        onClose={() => setModalVisibility(false)}
        isOpen={modalVisibility}
      >
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          className='overflow-x-hidden w-[720px] pb-20 absolute left-1/2 top-[150px] -translate-x-1/2 z-10'
        >
          <EditCompanyInfoFormV2 onClose={() => setModalVisibility(false)} />
        </div>
      </ModalV2>
    </>
  );
};

export default CompanyProfilePanelV2;
