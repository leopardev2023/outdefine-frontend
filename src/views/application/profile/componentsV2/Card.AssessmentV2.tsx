import BadgeV2 from 'components/V2/Badges/BadgeV2';
import IconV2 from 'components/V2/Icons';
import { ReactElement } from 'react';

export default function AssessmentCardV2(): ReactElement {
  return (
    <div className='w-[360px] h-[216px] border-[1px] border-dark-gray rounded-lg p-[28px_16px_18px_20px]'>
      <div className='flex items-center gap-4'>
        <span className='w-[52px] h-[52px] bg-odf rounded-lg flex'>
          <IconV2 iconType='CODEWHITE' iconClassName='m-auto' />
        </span>
        <div>
          <p className='font-poppins font-bold text-base leading-6'>
            Blockchain Engineer
          </p>
          <BadgeV2 addClass='w-fit h-6 px-4 font-semibold'>Engineering</BadgeV2>
        </div>
      </div>
      <div className='mt-[30px] text-xs leading-[150%]'>
        Lorem ipsum dolor sit amet. Est sunt obcaecati aut consectetur
        distinctio eum cumque nesciunt qui iste nesciunt eos sint similique ea
        vero necessitatibus. Vel sunt veniam eum animi ipsum aut nihil autem sit
        eius facere.
      </div>
    </div>
  );
}
