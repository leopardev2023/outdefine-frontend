import { useState } from 'react';
import Heading from 'components/Heading/HeadingV2';
import InputDropdownV2 from 'components/V2/InputDropdown';

// import svg
import { ReactComponent as ClockSvg } from 'assets/V2/svg/clock.svg';
import CodePanel from './codepanel';
import { code_inputdropdown } from './codedata';

const enums = ['Weekly', 'Monthly'];

const InputDropdownComponent = () => {
  const [value, setValue] = useState<string | number>('');
  const [optionValue, setOptionValue] = useState<string>('Monthly');

  return (
    <>
      <Heading variant='h3'>Input With Dropdown</Heading>
      <div className='flex gap-20'>
        <div className='w-[290px] mt-20'>
          <InputDropdownV2
            options={[
              { index: 1, value: 'Weekly' },
              { index: 2, value: 'Monthly' },
            ]}
            icon={<ClockSvg className='w-4 h-4' />}
            value={value}
            optionValue={optionValue}
            text='/hr'
            onChange={(value: string | number, selectedIndex: number) => {
              setValue(value);
              // setIndex(selectedIndex);
              setOptionValue(enums[selectedIndex]);
            }}
          />
        </div>
        <div>
          <CodePanel className='mt-5 py-5 max-h-[500px] overflow-auto'>
            {code_inputdropdown.example}
          </CodePanel>
        </div>
      </div>
    </>
  );
};

export default InputDropdownComponent;
