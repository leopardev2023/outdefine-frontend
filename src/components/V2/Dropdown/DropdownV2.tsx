import { ReactElement } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import makeFormats from './formatMaker';

const DropdownV2 = (props: IDropdownV2): ReactElement => {
  var selectedIndex;
  if (props.disabled === true) selectedIndex = undefined;
  else if (
    props.selectedIndex === undefined &&
    props.selectedValue === undefined
  )
    selectedIndex = undefined;
  else if (props.selectedIndex !== undefined && props.selectedIndex !== null)
    selectedIndex = props.selectedIndex;
  else if (props.selectedValue !== undefined && props.selectedValue !== null) {
    selectedIndex = props.data.findIndex(
      (elem) => elem.value === props.selectedValue
    );
  }

  const activeData = props.data[selectedIndex];

  return (
    <Listbox value={undefined} onChange={() => {}}>
      {({ open }) => (
        <div
          className={`relative ${
            props.normalCase ? 'normal-case' : ''
          } w-full text-xs font-inter ${open ? 'z-10' : ''}`}
        >
          <Listbox.Button
            disabled={props.disabled ?? false}
            className={makeFormats({ ...props, open, selectedIndex }).button}
          >
            <div className='absolute top-1/2 -translate-y-1/2'>
              {props?.icon}
            </div>
            <span
              className={`block text-xs font-inter font-normal truncate ${
                props.normalCase ? 'normal-case' : 'capitalize'
              } text-ellipsis ${
                selectedIndex === undefined ||
                selectedIndex === -1 ||
                props.suffixValue
                  ? ''
                  : 'capitalize'
              } ${props?.icon ? 'translate-x-6' : ''}`}
            >
              {selectedIndex === undefined || selectedIndex === -1
                ? props.placeholder
                : `${activeData?.value}${props.suffixValue ?? ''}`}
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
            <Listbox.Options
              className={`${
                props.directionUp ? 'bottom-[50px]' : ''
              } absolute z-10 mt-1 w-full rounded-md bg-white py-4 pl-2 pr-1 text-xs font-inter shadow-lg`}
            >
              <div className='overflow-auto max-h-[190px] pr-2'>
                {props.data.map((elem, elemIdx) => (
                  <Listbox.Option
                    onClick={() => props.onChange && props.onChange(elemIdx)}
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
                        className={`block truncate py-4 pl-4 pr-4 rounded-lg first-letter:capitalize ${
                          props.suffixValue ? 'normal-case' : ''
                        } ${
                          selected ||
                          props.selectedValue
                            ?.toLocaleString()
                            .toLowerCase() === elem.value.toLocaleLowerCase()
                            ? 'font-semibold bg-odf-light'
                            : 'font-normal'
                        }`}
                      >
                        {elem.value}
                        {props.suffixValue ?? ''}
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

export default DropdownV2;
