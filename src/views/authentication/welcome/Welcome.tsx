import * as Sentry from '@sentry/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logOut } from 'redux/slices/authentication';
import { useAppDispatch } from 'redux/hooks/redux-hooks';
import pathUtils from 'utils/pathUtils';

import Heading from 'components/Heading/HeadingV2';
import Button from 'components/Button/ButtonV2';
import TypographyV2 from 'components/Typography/TypographyV2';
import { AccountType } from './types';

import CompanyImage from 'assets/welcome/company.png';
import TalentImage from 'assets/welcome/talent.png';
import PreSelectionImage from 'assets/welcome/signup-onboarding.png';

interface WelcomeProps {}

const Welcome: React.FC<WelcomeProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [type, setType] = useState<AccountType>();

  const handleContinue = () => {
    if (type === 'company') navigate(pathUtils.ClIENT_ONBOARDING);
    else navigate(pathUtils.TALENT_ONBOARDING);
  };

  const handleSignOut = async () => {
    try {
      dispatch(logOut());
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  return (
    <>
      <div className='relative flex flex-col w-screen min-h-screen overflow-hidden md:gap-0 md:flex-row font-inter'>
        <div className='w-fit absolute top-9 right-12 text-[16px] font-medium text-theme md:text-white z-50'>
          {`Already have an account? `}
          <span className='cursor-pointer' onClick={handleSignOut}>
            <span className='ml-2 border-b border-theme md:border-white'>Log In</span>
          </span>
        </div>
        <div className='w-[500px] h-screen'>
          <img src={PreSelectionImage} alt='Outdefine' className='-ml-[10px] w-full h-full object-cover' />
        </div>
        <div className='w-full flex mt-[250px] h-full justify-center items-center'>
          <div className='relative md:flex flex-col text-black'>
            <Heading className='font-extrabold text-[24px] pt-0 pb-4 text-center md:pt-6' variant='h5'>
              Lets get started!
            </Heading>

            <div className='flex flex-col'>
              <p className='mt-4 mb-8 font-bold text-center sm:mb-16 text-p1'>Select one and press continue</p>

              <div className='flex flex-col space-y-4 space-x-0 background-white sm:flex-row sm:space-x-[40px] sm:space-y-0 px-4 sm:px-0'>
                <div
                  className={`flex flex-col items-center px-8 py-4 border rounded-lg w-[250px] h-[270px] text-sm border-odf ${
                    type === 'company' ? 'bg-odf-light' : ''
                  }`}
                  role='button'
                  onClick={() => setType('company')}
                >
                  <TypographyV2 variant='subtitle1' className='font-bold text-base'>
                    Company
                  </TypographyV2>
                  <TypographyV2 variant='p2' className='mt-3 mb-4'>
                    I am looking to hire
                  </TypographyV2>
                  <img src={CompanyImage} className='sm:w-[170px] w-[100px]' alt='Company' />
                </div>
                <div
                  className={`flex flex-col items-center px-6 py-4 border rounded-lg w-[250px] h-[270px] text-sm border-odf cursor-pointer ${
                    type === 'talent' ? 'bg-odf-light' : ''
                  }`}
                  onClick={() => setType('talent')}
                >
                  <TypographyV2 variant='subtitle1' className='font-bold text-base'>
                    Talent
                  </TypographyV2>
                  <TypographyV2 variant='p2' className='mt-3 mb-4'>
                    I am looking for opportunities
                  </TypographyV2>
                  <img src={TalentImage} className='sm:w-[170px] w-[100px]' alt='Talent' />
                </div>
              </div>

              <div className='flex justify-center w-full p-4 sm:justify-end sm:mt-14 mt-7 sm:p-0'>
                <Button
                  className='w-full sm:ml-auto sm:w-auto'
                  variant='primary'
                  disabled={!type}
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
