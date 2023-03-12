import Button from 'components/Button/ButtonV2';
import IconV2 from 'components/V2/Icons';
import { ReactElement } from 'react';

export default function ApplyButtonGroupV2(): ReactElement {
  return (
    <div className='min-w-fit flex flex-col justify-between items-end'>
      <div className='flex items-center gap-4'>
        <IconV2 iconType='TOKEN' />
        <IconV2 iconType='BOOKMARKFILLED' />
      </div>
      <Button className='min-w-fit h-10 pl-9 pr-6 flex items-center gap-4'>
        Apply now
        <svg
          width='15'
          height='8'
          viewBox='0 0 15 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5L14 4.5V3.5L0 3.5L0 4.5Z'
            fill='white'
          />
        </svg>
      </Button>
    </div>
  );
}
