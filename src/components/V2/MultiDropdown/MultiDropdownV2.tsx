import { ReactElement } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import makeFormats from './formatMaker';

const MultiDropdownV2 = (props: IMultiOptionDropdownV2): ReactElement => {
  const selectHandler = (val: string) => {
    const does_exist = props.selectedValues.includes(val);
    props.onChange(
      does_exist
        ? props.selectedValues.filter((elem) => elem !== val)
        : [...props.selectedValues, val]
    );
  };

  return (
    <Listbox value={undefined} onChange={() => {}}>
      {({ open }) => (
        <div className={`relative w-full capitalize ${open ? 'z-10' : ''}`}>
          <Listbox.Button className={makeFormats({ ...props, open }).button}>
            <div className='absolute top-1/2 -translate-y-1/2'>
              {props?.icon}
            </div>
            <span
              className={`block truncate absolute top-1/2 -translate-y-1/2 ${
                props.selectedValues.length === 0 ? '' : 'capitalize'
              } ${props?.icon ? 'translate-x-6' : ''}`}
            >
              {props.selectedValues.length === 0
                ? props.placeholder
                : props.selectedValues?.join(', ')}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-4 flex items-center'>
              {makeFormats({ ...props, open }).marker}
            </span>
          </Listbox.Button>
          <Transition
            leave='transition ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed w-screen h-screen top-0 left-0' />
            <Listbox.Options
              className={`${
                props.directionUp ? 'bottom-[50px]' : ''
              } absolute z-10 mt-1 w-full rounded-md bg-white py-4 pl-2 pr-1 text-xs shadow-lg`}
            >
              <div className='overflow-auto max-h-[190px] pr-2'>
                {props.data.map((elem, elemIdx) => (
                  <Listbox.Option
                    onClick={() => selectHandler(elem.value)}
                    key={elemIdx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none rounded-lg ${
                        active ? '  bg-odf-light' : ''
                      }`
                    }
                    value={elem}
                  >
                    {({ selected }) => (
                      <span
                        className={`block truncate py-4 pl-4 pr-4 rounded-lg ${
                          selected ||
                          props.selectedValues.findIndex(
                            (val: string | number) => val === elem.value
                          ) >= 0
                            ? 'font-semibold bg-odf-light'
                            : 'font-normal'
                        }`}
                      >
                        {elem.value}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </div>
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default MultiDropdownV2;
