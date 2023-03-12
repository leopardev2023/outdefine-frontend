import { Transition } from '@headlessui/react';
import { ChangeEvent, useState } from 'react';
import makeFormat from './formatMaker';

const InputDropdownV2: React.FC<IInputDropdownV2> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);

  const index: number = props.index
    ? props.index
    : props.optionValue
    ? props.options.findIndex((elem) => elem.value === props.optionValue)
    : 0;

  return (
    <div className={makeFormat(focus, open, props.value)}>
      <div className='flex items-center h-full w-full justify-between pl-4 pr-6 text-xs'>
        {props.icon}
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            props.onChange(e.target.value, index)
          }
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={props.value}
          className={`text-center text-xs bg-white/0 w-10 p-0 rounded-none border-b-[1px] ${
            props.value ? 'border-odf' : 'border-dark-gray'
          }  focus:border-odf !shadow-none h-7`}
        />
        {props.text}
      </div>
      <div
        onClick={() => setOpen(!open)}
        className={`cursor-pointer pl-5 pr-4 flex items-center h-full justify-between w-full text-xs ${
          open ? 'text-black' : 'text-[#8A8A8A]'
        }`}
      >
        {props.options[index]?.value}
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`${open ? 'rotate-180' : ''} transition-all duration-200`}
        >
          <path
            d='M13.1263 6.45962C13.3802 6.20578 13.3802 5.79422 13.1263 5.54038C12.8725 5.28654 12.4609 5.28654 12.2071 5.54038L13.1263 6.45962ZM8.00004 10.6667L7.54042 11.1263C7.66232 11.2482 7.82765 11.3167 8.00004 11.3167C8.17243 11.3167 8.33776 11.2482 8.45966 11.1263L8.00004 10.6667ZM3.79299 5.54038C3.53915 5.28654 3.1276 5.28654 2.87375 5.54038C2.61991 5.79422 2.61991 6.20578 2.87375 6.45962L3.79299 5.54038ZM12.2071 5.54038L7.54042 10.207L8.45966 11.1263L13.1263 6.45962L12.2071 5.54038ZM8.45966 10.207L3.79299 5.54038L2.87375 6.45962L7.54042 11.1263L8.45966 10.207Z'
            fill={open ? '#161719' : '#A9ACB1'}
          />
        </svg>
      </div>
      <Transition
        show={open}
        leave='transition ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <span
          onClick={() => setOpen(false)}
          className='w-screen h-screen fixed top-0 left-0'
        />
        <div className='absolute right-0 top-12 w-[160px]'>
          <ul className='w-full shadow-lg rounded-lg py-2 px-2 cursor-pointer'>
            {props.options.map((option, idx) => (
              <li
                onClick={() => {
                  setOpen(false);
                  props.onChange(props.value, idx);
                }}
                key={option.index}
                className={`${
                  idx === index ? 'bg-odf-light font-semibold' : ''
                } px-4 h-12 flex items-center rounded-lg hover:bg-odf-light transition-all duration-150 text-xs`}
              >
                {option.value}
              </li>
            ))}
          </ul>
        </div>
      </Transition>
    </div>
  );
};

export default InputDropdownV2;
