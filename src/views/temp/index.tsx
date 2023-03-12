import React, { useState } from 'react';
import Heading from 'components/Heading/HeadingV2';
import { NavLink } from 'react-router-dom';
import MonthPickerV2 from 'components/V2/MonthPicker';

const indexes = [
  {
    title: 'Typography',
    link: 'typography',
  },
  {
    title: 'Buttons',
    link: 'button',
  },
  {
    title: 'Radio',
    link: 'radio',
  },
  {
    title: 'Checkbox',
    link: 'checkbox',
  },
  {
    title: 'Switch',
    link: 'switch',
  },
  {
    title: 'Inputs',
    link: 'input',
  },
  {
    title: 'Badges',
    link: 'badge',
  },
  {
    title: 'Dropdown',
    link: 'dropdown',
  },
  {
    title: 'Textarea',
    link: 'textarea',
  },
  {
    title: 'Tab',
    link: 'tab',
  },
  {
    title: 'Multi Option Dropdown',
    link: 'multioptiondropdown',
  },
  {
    title: 'Input with options',
    link: 'inputdropdown',
  },
];

const IndexPage = () => {
  const [value, setValue] = useState({ year: 2020, month: 10 });

  return (
    <>
      <Heading variant={'h4'}>Components for redesign</Heading>
      <div className='w-[250px]'>
        <MonthPickerV2 value={value} onChange={(payload) => setValue(payload)} />
      </div>
      <ul className='mt-16 flex flex-col gap-5'>
        {indexes.map((data) => (
          <NavLink key={data.link} className='hover:text-error transition-all duration-150' to={data.link}>
            {data.title}
          </NavLink>
        ))}
      </ul>
    </>
  );
};

export default IndexPage;
