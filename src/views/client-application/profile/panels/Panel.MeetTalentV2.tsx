import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import EmptyPanelV2 from './Panel.EmptyV2';

const MeetTalentPanelV2: React.FC = (): ReactElement => {
  return (
    <EmptyPanelV2
      description='Looking to fill an open role? Search through our talent pool for your perfect fit!'
      image={'common/spaceboy/astro-angle.png'}
      imageAltText='astro is angling'
      title='No active talent'
      className='mb-8 pt-6 pb-10 h-[440px]'
    >
      <NavLink
        to='/talent'
        className='mt-6 w-[148px] h-10 flex justify-center items-center text-sm font-semibold text-white font-poppins bg-odf rounded-lg'
      >
        Find talent
      </NavLink>
    </EmptyPanelV2>
  );
};

export default MeetTalentPanelV2;
