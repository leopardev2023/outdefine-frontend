import React, { useEffect } from 'react';
import { mixpanel_identify, mixpanel_people_set_once } from 'helpers/mixpanel';
import { Token, GameBoy, CongratsBg } from '../Icons';
import { getItem } from 'utils/storageUtils';

const Congratulations = () => {
  useEffect(() => {
    mixpanel_identify(getItem('email'));
    mixpanel_people_set_once({ vetted: true });
  }, []);

  return (
    <div className='relative w-full pt-9 mt-14 h-[476px] text-center'>
      <img
        src={CongratsBg}
        alt='congratulations'
        className='w-full h-full object-cover absolute top-0 left-0 rounded-[8px] z-0'
      />
      <div className='relative px-2'>
        <h1 className='font-poppins font-semibold text-[20px] text-white'>
          Congrats you are now a trusted member of Outdefine!
        </h1>
        <div className='mx-auto max-w-[300px] lg:max-w-[500px] mt-5 font-inter text-xs text-white'>
          {'You can now start applying to jobs. Use your earned '}
          <Token className='inline-block -mt-[2px]' />
          {'500 tokens to boost your job applications!'}
        </div>
        <img
          src={GameBoy}
          alt='gaming spaceboy'
          width={259}
          height={238}
          className='mx-auto mt-9'
        />
      </div>
    </div>
  );
};

export default Congratulations;
