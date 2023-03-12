import { useState } from 'react';
import SwitchV2 from 'components/V2/Buttons/SwitchV2';
import Heading from 'components/Heading/HeadingV2';
import CodePanel from './codepanel';
import { code_switch } from './codedata';

const SwitchComponents = () => {
  const [switch1, setSwitch1] = useState<boolean>(false);
  const [switch2, setSwitch2] = useState<boolean>(true);

  return (
    <>
      <Heading variant='h3'>Switch</Heading>
      <Heading className='mt-10' variant='h5'>
        Examples
      </Heading>
      <div className='flex gap-4 mt-10'>
        <SwitchV2 onClick={() => setSwitch1(!switch1)} status={switch1}>
          Switch1
        </SwitchV2>
        <SwitchV2 onClick={() => setSwitch2(!switch2)} status={switch2}>
          Switch2
        </SwitchV2>
        <SwitchV2 disabled>Switch3</SwitchV2>
      </div>
      <div className='mt-10'>
        <Heading variant='h5'>Usage</Heading>
        <p className='mt-5 mb-10'>
          <CodePanel className='py-5'>{code_switch.interface}</CodePanel>
          <CodePanel className='py-5 mt-5'>{code_switch.example}</CodePanel>
        </p>
      </div>
    </>
  );
};

export default SwitchComponents;
