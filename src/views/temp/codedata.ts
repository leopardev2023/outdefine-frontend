export const code_radio = {
  interface: `interface IRadioV2 {
  value: string | number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: Function;
  children?: ReactChildren;
}`,
  example: `const [radio, setRadio] = useState<string | number>('RADIO2');

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
</div>`,
};

export const code_checkbox = {
  interface: `interface ICheckBoxV2 {
  value: string | number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: Function;
  children?: ReactChildren;
}`,
  example: `const [options, setOptions] = useState<Array<string | number>>([]);

const onCheckHandler = (value: string | number) => {
  const existence = options.includes(value);
  if (existence) {
    setOptions(options.filter((elem) => elem !== value));
  } else {
    setOptions([...options, value]);
  }
};
  
<div className='flex gap-4'>
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
</div>`,
};

export const code_switch = {
  interface: `interface ISwitchV2 {
  status?: boolean;
  disabled?: boolean;
  onClick?: Function;
  children?: ReactChild;
}`,
  example: `const [switch1, setSwitch1] = useState<boolean>(false);
const [switch2, setSwitch2] = useState<boolean>(true);

<div className='mt-10 flex gap-4'>
  <SwitchV2 onClick={() => setSwitch1(!switch1)} status={switch1}>
    Switch1
  </SwitchV2>
  <SwitchV2 onClick={() => setSwitch2(!switch2)} status={switch2}>
    Switch2
  </SwitchV2>
  <SwitchV2 disabled>Switch3</SwitchV2>
</div>`,
};

export const code_input = {
  interface: `interface IInputV2 {
  placeholder?: string;
  value?: string | number;
  onChange?: Function | undefined;
  disabled?: boolean;
  name?: string;
  description?: string;
  validators?: Array<Function>;
}`,
  example: `const [data, setData] = useState<string>('input box');
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

<div className='mt-10 flex flex-col gap-4 w-[300px]'>
  <InputV2
    onChange={(e: ChangeEvent<HTMLInputElement>) =>
      setThirdData(e.target.value)
    }
    placeholder='label'
    value={thirdData}
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
</div>`,
};

export const code_badge = {
  interface: `interface IBadgeV2 {
  color?: 'blue' | 'pink' | 'orange' | 'purple';
  children?: any;
}`,
  example: `<div className='mt-10 flex gap-6'>
  <BadgeV2>Tags</BadgeV2>
  <BadgeV2 color='pink'>Tags</BadgeV2>
  <BadgeV2 color='orange'>Tags</BadgeV2>
  <BadgeV2 color='purple'>Tags</BadgeV2>
</div>`,
};

export const code_dropdown = {
  interface: `interface IDropdownV2 {
  data: Array<any>;
  selectedIndex?: number;
  onChange: Function;
  placeholder: string;
}`,
  example: `const data = [
  { value: 'James Jin', id: 1 },
  { value: 'Alex Tanaka', id: 2 },
  { value: 'Aaron Porcha', id: 3 },
  { value: 'Mike Mu', id: 4 },
  { value: 'Karla', id: 5 },
  { value: 'Romil Verma', id: 6 },
];

const [selectedID, setSelectedID] = useState<number | undefined>(0);
const [option2, setOption2] = useState<number | undefined>();

<div className='mt-10 flex gap-5'>
  <DropdownV2
    placeholder='Select an option'
    data={data}
    selectedIndex={selectedID}
    onChange={(idx: number) => setSelectedID(idx)}
  />
  <DropdownV2
    placeholder='Select an option'
    data={data}
    selectedIndex={option2}
    onChange={(idx: number) => setOption2(idx)}
  />
</div>`,
};

export const code_textarea = {
  interface: `interface ITextareaV2 {
  placeholder?: string;
  value?: string | number;
  onChange?: Function | undefined;
  disabled?: boolean;
  name?: string;
  description?: string;
  validators?: Array<Function>;
}`,
  example: `const [data1, setData1] = useState<string>('');
const [data2, setData2] = useState<string>('');
const [data3, setData3] = useState<string>('');
const [data4, setData4] = useState<string>('');
const [data5, setData5] = useState<string>('');
const [data6, setData6] = useState<string>('');

const errorValidator = (arg: any) => {
  if (arg === '' || arg === undefined) return true;
  return false;
};

const successValidator = (arg: any) => {
  if (arg === '' || arg === undefined) return undefined;
  return true;
};

<div className='mt-10 flex gap-3 flex-wrap'>
  <TextareaV2
    value={data1}
    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
      setData1(e.target.value)
    }
  />
  <TextareaV2
    value={data2}
    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
      setData2(e.target.value)
    }
    placeholder='By James'
  />
  <TextareaV2
    value={data3}
    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
      setData3(e.target.value)
    }
    validators={[errorValidator, successValidator]}
  />
  <TextareaV2
    value={data4}
    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
      setData4(e.target.value)
    }
    placeholder='Error validation'
    description='Error description'
    validators={[errorValidator, successValidator]}
  />

  <TextareaV2
    value={data6}
    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
      setData6(e.target.value)
    }
    validators={[successValidator]}
  />

  <TextareaV2
    value={data5}
    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
      setData5(e.target.value)
    }
    placeholder='Validation Success'
    validators={[successValidator]}
  />

  <TextareaV2 disabled />
</div>`,
};

export const code_tab = {
  interface: `interface ITabV2 {
  addClass?: string;
  tabs: Array<string>;
  tabClass?: string;
  contents: Array<ReactElement>;
  activeTabTextColor?: string;
  inactiveTabTextColor?: string;
  contentWrapperClass?: string;
}`,
  example: `<div className='min-w-[360px] w-[360px] mt-8'>
  <TabV2
    tabClass='w-[175px] h-11 font-poppins font-semibold text-xs'
    tabs={['Invite', 'Team']}
    contents={[<InviteToTeamV2 />, <TeamViewV2 />]}
    contentWrapperClass='mt-10 mb-10 bg-white shadow-3xl rounded-lg min-h-[480px]'
  />
  </div>`,
};

export const code_multidropdown = {
  interface: `interface IMultiDropdownV2 {
  buttonClassName?: string;
  listClassName?: string;
  listData: Array<IData>;
  selectedData: Array<IData>;
  buttonText?: string;
  onChange: Function;
}

interface IData {
  id: number;
  value: string | number;
}`,
  example: `const MultiOptionDropdownComponent = () => {
const [selectedData, setSelectedData] = useState<Array<IData>>([]);
const data = [
  { id: 1, value: 'Durward Reynolds' },
  { id: 2, value: 'Kenton Towne' },
  { id: 3, value: 'Therese Wunsch' },
  { id: 4, value: 'Benedict Kessler' },
  { id: 5, value: 'Katelyn Rohan' },
];

return (
  <main className='flex gap-20'>
    <div>
      <p className='flex gap-5 mb-20'>
        {selectedData.length === 0 && <span>No Items selected</span>}
        {selectedData.map((elem) => (
          <span className=''>{elem.id + ': ' + elem.value}</span>
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
      <CodePanel className='py-5'>{code_input.interface}</CodePanel>
    </div>
  </main>
);
};

export default MultiOptionDropdownComponent;`,
};

export const code_inputdropdown = {
  interface: `interface IInputDropdownV2 {
  options: IData[];
  text?: string;
  icon?: ReactSVGElement;
  optionValue?: string;
  value: string | number;
  index?: number;
  onChange: (value: string | number, selectedIndex: number) => void;
}`,
  example: `const enums = ['Weekly', 'Monthly'];
const [value, setValue] = useState<string | number>('');
const [optionValue, setOptionValue] = useState<string>('Monthly');
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
</div>`,
};
