import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
interface PropsType {
  name: string;
  addClass?: string;
  listClass?: string;
  itemClass?: string;
  placeholder?: string | number | null;
  listData: Array<any>;
  prototype?: any;
  onChange?: Function;
}

export default function ListBoxHUI({
  name,
  addClass,
  listClass,
  itemClass,
  listData,
  prototype,
  placeholder,
  onChange,
}: PropsType) {
  const [selected, setSelected] = useState(placeholder);

  const selectHandler = (e: any) => {
    if (onChange === undefined) return;
    const val =
      isNaN(parseInt(e.target.id)) === true
        ? e.target.id
        : parseInt(e.target.id);
    onChange({ name, val: val });
  };

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className='relative'>
        <Listbox.Button
          className={`${
            addClass ?? ''
          } relative w-full cursor-pointer rounded-[15px] bg-white py-2 pl-5 pr-10 text-left shadow-3xl`}
        >
          <span className='block truncate'>
            {placeholder
              ? prototype
                ? prototype[listData.find((data) => data.id == selected).name]
                : listData.find((data) => data.id == selected)?.name || ''
              : ''}
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
            {listData.map((elem, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `${
                    itemClass ?? ''
                  } relative cursor-pointer select-none rounded-[15px] pl-5 flex items-center transition-all duration-200 ${
                    active ? 'bg-theme !text-white' : 'bg-white'
                  }`
                }
                value={elem.id}
              >
                {({ selected }) => (
                  <span
                    onClick={selectHandler}
                    id={elem.id}
                    className={`block truncate w-full ${
                      selected ? 'font-medium' : 'font-normal'
                    }`}
                  >
                    {prototype ? prototype[elem.name] : elem.name}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
