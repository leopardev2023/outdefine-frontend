import { ChangeEvent, useState } from 'react';

import InputV2 from 'components/V2/Input/InputV2';
import Heading from 'components/Heading/HeadingV2';
import CodePanel from './codepanel';
import { code_input } from './codedata';
import Button from 'components/Button/ButtonV2';

const InputComponents = () => {
  const [data, setData] = useState<string>('input box');
  const [secondData, setSecondData] = useState<string>('');
  const [thirdData, setThirdData] = useState<string>('');

  const errorValidator = (arg: any) => {
    if (arg === '' || arg === undefined) return true;
    return false;
  };

  const successValidator = (arg: any) => {
    if (arg === '' || arg === undefined) return undefined;
    return true;
  };

  return (
    <>
      <Heading variant='h3'>Inputs</Heading>

      <div className='flex gap-20'>
        <div>
          <Heading className='mt-10' variant='h5'>
            Examples
          </Heading>
          <form className='mt-10 flex flex-col gap-4 w-[300px]'>
            <InputV2
              icon={<span className='w-4 h-4 rounded-full bg-theme block' />}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setThirdData(e.target.value)
              }
              placeholder='label'
              value={thirdData}
              required
            />
            <InputV2
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setData(e.target.value)
              }
              placeholder='label'
              value={data}
              validators={[errorValidator]}
            />
            <InputV2
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSecondData(e.target.value)
              }
              placeholder='label'
              value={secondData}
              validators={[successValidator]}
            />
            <InputV2
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setThirdData(e.target.value)
              }
              value={thirdData}
            />
            <InputV2
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setData(e.target.value)
              }
              value={data}
              validators={[errorValidator]}
            />
            <InputV2
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSecondData(e.target.value)
              }
              value={secondData}
              validators={[successValidator]}
            />
            <InputV2
              description='description'
              value={'Disabled Input Field'}
              disabled
            />
            <Button className='mt-10'>Submit</Button>
          </form>
        </div>

        <div>
          <Heading variant='h5'>Usage</Heading>

          <p className='mt-5 mb-10'>
            <CodePanel className='py-5'>{code_input.interface}</CodePanel>
            <CodePanel className='mt-5 py-5 max-h-[500px] overflow-auto'>
              {code_input.example}
            </CodePanel>
          </p>
        </div>
      </div>
    </>
  );
};

export default InputComponents;
