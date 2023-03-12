import { useState } from 'react';
import Dropdown from 'assets/svg/dropdown.svg';

interface PropsType {
  title: string;
  content: string | React.ReactNode;
}

const AccordionItem = ({ title, content }: PropsType) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <div
        onClick={() => {
          setOpen((prev) => !prev);
        }}
        className='pt-6 pb-[9px] pr-1 flex justify-between border-b-2 border-primary text-base cursor-pointer'
      >
        <h2>{title}</h2>
        <img alt='dropdown' src={Dropdown} />
      </div>

      <h3
        className={`text-sm font-poppins pt-[30px] pb-[10px] ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {content}
      </h3>
    </>
  );
};

export default AccordionItem;
