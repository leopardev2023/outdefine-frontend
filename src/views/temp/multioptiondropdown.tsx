import { useState } from 'react';

import MultiSelectDropdownV2 from 'components/V2/MultiSelectDropdown/MultiSelectDropdownV2';
import CodePanel from './codepanel';
import { code_multidropdown } from './codedata';

interface IData {
  index: number;
  value: string;
}

const MultiOptionDropdownComponent = () => {
  const [selectedData, setSelectedData] = useState<Array<IData>>([]);
  const data = [
    { index: 1, value: 'Durward Reynolds' },
    { index: 2, value: 'Kenton Towne' },
    { index: 3, value: 'Therese Wunsch' },
    { index: 4, value: 'Benedict Kessler' },
    { index: 5, value: 'Katelyn Rohan' },
  ];

  return (
    <main className='flex gap-20'>
      <div>
        <p className='flex gap-5 mb-20'>
          {selectedData.length === 0 && <span>No Items selected</span>}
          {selectedData.map((elem) => (
            <span className=''>{elem.index + ': ' + elem.value}</span>
          ))}
        </p>
        <MultiSelectDropdownV2
          buttonText='Industry'
          selectedData={selectedData}
          onChange={(new_options: Array<IData>) => setSelectedData(new_options)}
          listData={data}
          buttonClassName='w-[500px] h-11'
          listClassName='w-[500px]'
        />
      </div>
      <div>
        <CodePanel className='py-5'>{code_multidropdown.example}</CodePanel>
      </div>
    </main>
  );
};

export default MultiOptionDropdownComponent;
