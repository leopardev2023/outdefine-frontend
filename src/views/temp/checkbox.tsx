import Heading from 'components/Heading/HeadingV2';
import CheckBoxV2 from 'components/V2/Buttons/CheckBoxV2';
import { useState } from 'react';
import { code_checkbox } from './codedata';
import CodePanel from './codepanel';

const CheckBoxComponents = () => {
  const [options, setOptions] = useState<Array<string | number>>([]);

  const onCheckHandler = (value: string | number) => {
    const existence = options.includes(value);
    if (existence) {
      setOptions(options.filter((elem) => elem !== value));
    } else {
      setOptions([...options, value]);
    }
  };

  return (
    <main className='flex gap-32'>
      <div>
        <Heading variant='h3'>Checkbox</Heading>
        <Heading className='mt-10' variant='h5'>
          Examples
        </Heading>
        <div className='mt-10 flex gap-4'>
          <CheckBoxV2
            value={'OPTION1'}
            selected={options.includes('OPTION1')}
            onClick={onCheckHandler}
          >
            Option1
          </CheckBoxV2>
          <CheckBoxV2
            value={'OPTION2'}
            selected={options.includes('OPTION2')}
            onClick={onCheckHandler}
          >
            Option2
          </CheckBoxV2>
          <CheckBoxV2
            value={'OPTION3'}
            selected={options.includes('OPTION3')}
            onClick={onCheckHandler}
            disabled
          >
            Option3
          </CheckBoxV2>
        </div>
        <CodePanel className='mt-[50px] py-5'>
          {code_checkbox.interface}
        </CodePanel>
      </div>
      <div className='mt-10'>
        <Heading variant='h5'>Usage</Heading>
        <p className='mt-5 mb-10'>
          <CodePanel className='mt-5 py-5 max-h-[700px]'>
            {code_checkbox.example}
          </CodePanel>
        </p>
      </div>
    </main>
  );
};

export default CheckBoxComponents;
