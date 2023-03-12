import TypographyV2 from 'components/Typography/TypographyV2';
import IconV2 from 'components/V2/Icons/IconV2';
import { useState } from 'react';

interface PropsType {
  title: string;
  content: string | React.ReactNode;
}

const AccordionItem = ({ title, content }: PropsType) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  return (
    <div className='w-full p-4 pl-0 border border-purple rounded'>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className='flex justify-between items-center text-base cursor-pointer ml-[37px]'
      >
        <h2>{title}</h2>
        {!isOpen && <IconV2 iconType='ARROW-DOWN' />}
        {isOpen && <IconV2 iconType='ARROW-UP' />}
      </div>
      {isOpen && (
        <div className='mt-[25px] ml-[37px] mr-[81px]'>
          <TypographyV2
            variant='label'
            className='!text-sm font-inter font-normal leading-[150%]'
          >
            {content}
          </TypographyV2>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
