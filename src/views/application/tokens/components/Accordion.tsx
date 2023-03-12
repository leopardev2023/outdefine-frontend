import React from 'react';
import AccordionItem from './AccordionItem';

interface PropsType {
  list: { title: string; content: string | React.ReactNode }[];
}

const Accordion = ({ list }: PropsType) => {
  return (
    <div className='flex flex-col gap-[20px] w-full'>
      {list.map((item, key) => (
        <AccordionItem key={key} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default Accordion;
