import { useState } from 'react';

import DropdownV2 from 'components/V2/Dropdown/DropdownV2';
import Heading from 'components/Heading/HeadingV2';
import CodePanel from './codepanel';
import { code_dropdown } from './codedata';

const data = [
  { value: 'James Jin', id: 1 },
  { value: 'Alex Tanaka', id: 2 },
  { value: 'Aaron Porcha', id: 3 },
  { value: 'Mike Mu', id: 4 },
  { value: 'Karla', id: 5 },
  { value: 'Romil Verma', id: 6 },
];

const DropdownComponents = () => {
  const [selectedID, setSelectedID] = useState<number | undefined>(0);
  const [option2, setOption2] = useState<number | undefined>();

  return (
    <main className='flex gap-32'>
      <div>
        <Heading variant='h3'>Dropdown</Heading>
        <Heading className='mt-10' variant='h5'>
          Examples
        </Heading>
        <div className='mt-10 mb-[250px] flex gap-5'>
          <DropdownV2
            placeholder='Select an option'
            data={data}
            selectedIndex={option2}
            onChange={(idx: number) => setOption2(idx)}
          />
          <DropdownV2
            icon={<span className='w-4 h-4 bg-theme block rounded-full' />}
            placeholder='Select an option'
            data={data}
            selectedIndex={selectedID}
            onChange={(idx: number) => setSelectedID(idx)}
          />
        </div>
        <CodePanel className='py-5'>{code_dropdown.interface}</CodePanel>
      </div>
      <div>
        <Heading variant='h5'>Usage</Heading>
        <p className='mt-5 mb-10'>
          <CodePanel className='py-5'>{code_dropdown.example}</CodePanel>
        </p>
      </div>
    </main>
  );
};

export default DropdownComponents;
