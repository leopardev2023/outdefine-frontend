import React from 'react';
import AccordionItem from './AccordionItem';

interface PropsType {
  list: Array<{ title: string; content: string | React.ReactNode }>;
}

const Accordion = ({ list }: PropsType) => {
  return (
    <>
      {list?.map((item, key) => (
        <AccordionItem key={key} title={item.title} content={item.content} />
      ))}
    </>
  );
};

export default Accordion;
