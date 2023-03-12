import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import IconV2 from 'components/V2/Icons';

import CompanyReviewCardV2 from '../components/Card.ReviewV2';
import EmptyPanelV2 from './Panel.EmptyV2';

const CompanyReviewPanelV2: React.FC = (): ReactElement => {
  // return (
  //   <div className='w-full p-[30px_40px_32px_40px] rounded-lg bg-white shadow-card mt-[70px]'>
  //     <div className='flex justify-between w-full'>
  //       <div className='flex items-center'>
  //         <div className='font-poppins leading-xl leading-[150%]'>Reviews</div>
  //         <IconV2 iconClassName='block ml-4 w-6 h-6' iconType='RATINGSTAR' />
  //         <span className='font-semibold text-xs'>4.5</span>
  //       </div>
  //       {/* <div>Sort by: Most recent</div> */}
  //     </div>
  //     <div className='mt-8 grid grid-cols-2 gap-7'>
  //       <CompanyReviewCardV2 />
  //       <CompanyReviewCardV2 />
  //     </div>
  //   </div>
  // );

  return (
    <EmptyPanelV2
      className='mt-[68px] pt-[52px] pb-5 h-[446px] mb-20'
      image='common/spaceboy/astro-meaningless.png'
      title='No reviews'
      description='Get reviews from your talent to attract your next team memeber.'
    >
      <NavLink
        to='/talent'
        className='mt-5 w-[148px] h-10 flex justify-center items-center text-sm font-semibold text-white font-poppins bg-odf rounded-lg'
      >
        Find talent
      </NavLink>
    </EmptyPanelV2>
  );
};

export default CompanyReviewPanelV2;
