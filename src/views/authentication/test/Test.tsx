import { CircleSelect } from 'components/onboarding/CircleSelect';
import Button from 'components/Button';
import Progress from 'components/onboarding/Progress';
import { SelectBox } from 'components/forms';
import { useState } from 'react';

const Test: React.FC = () => {
  const roles = ['Engineer', 'Designer', 'Product'];
  const select = [
    'Engineer',
    'Designer',
    'Product',
    'DevOps',
    'Market',
    'Stress',
  ];
  const years = ['1-3', '3-5', '5-8', '8+'];
  const [selected, setSelected] = useState('');
  const [selectedYears, setSelectedYears] = useState('');

  return (
    <div className='bg-slate-200 min-h-screen'>
      <CircleSelect
        data={roles}
        onSelect={(val) => setSelected(val)}
        selected={selected}
      />
      <CircleSelect
        data={years}
        onSelect={(val) => setSelectedYears(val)}
        selected={selectedYears}
      />
      <div className='flex w-[250px] mt-5'>
        <SelectBox list={select} placeholder={'Select your role type'} />
      </div>
      <div className='mt-5'>
        <Button text={'Back'} className='w-[139px]' />
        <Button text={'Next'} className='w-[139px]' />
      </div>
      <Progress />
    </div>
  );
};

export default Test;
