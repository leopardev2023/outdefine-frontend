import Heading from 'components/Heading/HeadingV2';
import RadioV2 from 'components/V2/Buttons/RadioV2';
import { useState } from 'react';
import { code_radio } from './codedata';
import CodePanel from './codepanel';

const RadioComponents = () => {
  const [radio, setRadio] = useState<string | number>('RADIO2');

  return (
    <>
      <Heading variant='h3'>Radio</Heading>
      <Heading className='mt-10' variant='h5'>
        Examples
      </Heading>
      <div className='mt-10 flex gap-5'>
        <RadioV2
          onClick={(val: string | number) => setRadio(val)}
          value='RADIO1'
          selected={radio === 'RADIO1'}
        >
          Radio1
        </RadioV2>
        <RadioV2
          onClick={(val: string | number) => setRadio(val)}
          value='RADIO2'
          selected={radio === 'RADIO2'}
        >
          Radio2
        </RadioV2>
        <RadioV2
          onClick={(val: string | number) => setRadio(val)}
          value='RADIO3'
          selected={radio === 'RADIO3'}
          disabled
        >
          Radio3
        </RadioV2>
      </div>
      <div className='mt-10'>
        <Heading variant='h5'>Usage</Heading>
        <p className='mt-5 mb-10'>
          <CodePanel className='py-5'>{code_radio.interface}</CodePanel>
          <CodePanel className='mt-5 py-5'>{code_radio.example}</CodePanel>
        </p>
      </div>
    </>
  );
};

export default RadioComponents;
