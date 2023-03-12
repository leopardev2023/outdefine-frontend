import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';

type TComboBox = {
  hasDots?: boolean;
  dotsData?: any;
  list: Array<string>;
  value: string;
  itemClass?: string;
  listClass?: string;
  valueAddClass?: string;
  addClass?: string;
  placeholder: string;
  onChange?: Function;
};

const ComboBoxHUI = ({
  hasDots,
  dotsData,
  list,
  value,
  itemClass,
  listClass,
  addClass,
  placeholder,
  valueAddClass,
  onChange,
}: TComboBox) => {
  const [selected, setSelected] = useState<string>(value);

  const clickHandler = (elem: string) => {
    onChange && onChange(elem);
  };

  const getMarkFromText = (text: string) => {
    if (!hasDots || !dotsData) {
      return;
    }
    return dotsData.filter(
      (item) => item.text.toLocaleLowerCase() == text.toLocaleLowerCase()
    )[0]?.elem;
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className='relative'>
        <Listbox.Button
          className={`${
            addClass ?? ''
          } relative w-full cursor-pointer rounded-[15px] bg-white h-10 pl-5 pr-10 text-left shadow-3xl flex items-center gap-4`}
        >
          {getMarkFromText(value)}
          <span className={`block truncate ${valueAddClass}`}>
            {selected.toLocaleLowerCase()}
          </span>
          <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4'>
            <span className='w-[17px] h-[17px] rounded-full bg-theme flex items-center justify-center'>
              <span className='w-[6px] h-[6px] border-l-2 border-t-2 border-white -rotate-[135deg]' />
            </span>
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options
            className={`${
              listClass ?? ''
            } absolute mt-[10px] max-h-64 w-full overflow-auto rounded-[15px] bg-white text-sm font-semibold shadow-3xl z-10`}
          >
            {list.map((elem, personIdx) => (
              <Listbox.Option
                key={personIdx}
                onClick={() => clickHandler(elem)}
                className={({ active }) =>
                  `${
                    itemClass ?? ''
                  } relative cursor-pointer select-none rounded-[15px] pl-5 flex items-center gap-4 transition-all duration-200 ${
                    active ? 'bg-theme !text-white' : 'bg-white'
                  }`
                }
                value={elem}
              >
                {({ selected }) => (
                  <>
                    {getMarkFromText(elem)}
                    <span
                      id={elem}
                      className={`${
                        valueAddClass ?? ''
                      } block truncate w-full ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {elem.toLocaleLowerCase()}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ComboBoxHUI;
