import { ReactElement, useRef, useState } from 'react';
import { Listbox } from '@headlessui/react';

import { ReactComponent as DownMark } from './mark-down.svg';

const CompensationSelectV2 = (props): ReactElement => {
  const { buttonText, buttonClassName, onChange } = props;
  const [open, setOpen] = useState<boolean>(false);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const handler = (ref, direction: number) => {
    if (!ref.current) {
      return;
    }
    const element = ref.current as HTMLInputElement;

    const minValue = Number(element.min);
    const maxValue = Number(element.max);
    const updatedValue = Number(element.value) + direction;

    element.value =
      updatedValue > minValue ? String(updatedValue) : String(minValue);
  };

  const reset = () => {
    if (inputRef1.current && inputRef2.current) {
      (inputRef1.current as HTMLInputElement).value = '0';
      (inputRef2.current as HTMLInputElement).value = '200';
    }
  };

  return (
    <div
      className='relative'
      onBlur={(e) => {
        if (
          e.relatedTarget?.id !== 'compensation' &&
          e.relatedTarget?.id !== 'minCompensation' &&
          e.relatedTarget?.id !== 'maxCompensation'
        )
          setOpen(false);
      }}
    >
      <Listbox>
        <div className={`relative ${open ? 'z-10' : ''}`}>
          <Listbox.Button
            onClick={() => setOpen(!open)}
            className={`px-4 ${
              open ? 'border-odf bg-[#D2D6ED]' : 'border-dark-gray'
            } truncate border-[1px] rounded-lg ${
              buttonClassName ? buttonClassName : 'w-full text-xs text'
            } flex items-center justify-between`}
          >
            {buttonText}
            <DownMark
              className={`${
                open ? 'rotate-180' : ''
              } transition-all duration-200`}
            />
          </Listbox.Button>
        </div>
      </Listbox>
      {
        <div
          className={`absolute z-10 flex flex-col w-[303px] h-[143px] left-0 shadow-lg rounded-[8px] bg-white px-6 pt-6 ${
            open ? 'visible' : 'invisible'
          }`}
          tabIndex={0}
          id='compensation'
        >
          <p className='self-start font-poppins text-xs font-normal'>
            Set a range
          </p>
          <div className='flex flex-0 w-full justify-between mt-5 h-fit'>
            <div className='w-[120px] border-b'>
              <label className='text-xs font-semibold font-inter text-light-gray'>
                Minimum
              </label>
              <div className='relative'>
                <span className='absolute left+5 top-1 font-inter text-xs text-light-gray'>
                  $
                </span>
                <input
                  id='minCompensation'
                  type='number'
                  className='text-xs font-inter pl-3 pr-0 w-full h-5 border-none appearance-none focus:border-none focus:ring-offset-0 focus:ring-0'
                  placeholder='0'
                  min={0}
                  onChange={(e) =>
                    onChange([
                      Number(e.target.value),
                      Number((inputRef2.current as any)?.value),
                    ])
                  }
                  ref={inputRef1}
                />
                <span className='absolute right-5 top-1 font-inter text-xs leading-4'>
                  /hr
                </span>
                <DownMark
                  className='absolute right-0 top-1 rotate-180 cursor-pointer'
                  onClick={() => handler(inputRef1, 1)}
                />
                <DownMark
                  className='absolute right-0 bottom-1 cursor-pointer'
                  onClick={() => handler(inputRef1, -1)}
                />
              </div>
            </div>
            <div className='w-[120px] border-b'>
              <label className='text-xs font-semibold font-inter text-light-gray'>
                Maximum
              </label>
              <div className='relative'>
                <span className='absolute left+5 top-1 font-inter text-xs text-light-gray'>
                  $
                </span>
                <input
                  id='maxCompensation'
                  type='number'
                  className='text-xs font-inter pl-3 pr-0 w-full h-5 border-none appearance-none focus:border-none focus:ring-offset-0 focus:ring-0'
                  placeholder='200'
                  min={0}
                  onChange={(e) =>
                    onChange([
                      Number((inputRef1.current as any)?.value),
                      Number(e.target.value),
                    ])
                  }
                  ref={inputRef2}
                />
                <span className='absolute right-5 top-1 font-inter text-xs leading-4'>
                  /hr
                </span>
                <DownMark
                  className='absolute right-0 top-1 rotate-180 cursor-pointer'
                  onClick={() => handler(inputRef2, 1)}
                />
                <DownMark
                  className='absolute right-0 bottom-1 cursor-pointer'
                  onClick={() => handler(inputRef2, -1)}
                />
              </div>
            </div>
          </div>
          <span
            className='text-xs font-semibold font-inter self-end text-inactive-gray mt-3 cursor-pointer'
            onClick={reset}
          >
            Reset
          </span>
        </div>
      }
    </div>
  );
};

export default CompensationSelectV2;
