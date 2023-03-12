import { ReactElement } from 'react';

import IconV2 from 'components/V2/Icons';
import Heading from 'components/Heading/HeadingV2';
import Button from 'components/Button/ButtonV2';

export default function RemovalCardV2(props: IRemovalCardV2): ReactElement {
  return (
    <div
      className={`w-full flex flex-col items-center bg-white rounded-lg relative ${
        props.paddingClass ?? ''
      }`}
    >
      <button className='absolute top-6 right-8' onClick={props.onClose}>
        <IconV2 iconType={'CLOSE'} />
      </button>
      <Heading variant='h6' className='font-semibold '>
        {props.heading}
      </Heading>
      <p className='mt-4 mb-6 text-sm leading-4 font-poppins'>
        {props.description}
      </p>
      {props.children}
      <Button
        loading={props.is_busy}
        onClick={props.onRemove}
        className='w-[140px] px-0 mt-6'
      >
        Remove
      </Button>
    </div>
  );
}
