import {
  ChangeEvent,
  ReactElement,
  useState,
  KeyboardEvent,
  Fragment,
} from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

import IconV2 from '../../../components/V2/Icons';
import InputV2 from '../../../components/V2/Input/InputV2';
import { Transition } from '@headlessui/react';

interface IRoleInputV2 extends React.InputHTMLAttributes<HTMLInputElement> {
  onRoleChange: (name: string, value: string, indexValue: number) => void;
}

export default function RoleInputV2({
  onChange,
  onRoleChange,
  ...props
}: IRoleInputV2): ReactElement {
  const roles = useSelector((root: RootState) => root.prototype.roles);
  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>(
    typeof props.value === 'string' ? props.value : ''
  );

  const suggestions = roles.filter((role) =>
    role.name.toLowerCase().includes(value.toLowerCase())
  );

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue(value);
  };

  const selectRoleHandler = (elem) => {
    onRoleChange(props.name ?? '', elem.name, elem.id);
    setFocus(false);
  };

  const keydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    setFocus(false);
    onRoleChange(
      props.name ?? '',
      suggestions.length === 0 ? roles[0].name : suggestions[0].name,
      suggestions.length === 0 ? roles[0].id : suggestions[0].id
    );
  };

  return (
    <div className='relative'>
      <InputV2
        {...props}
        icon={
          <IconV2
            iconClassName='w-5 h-5 translate-y-[1px]'
            iconType={'SEARCH'}
          />
        }
        autoComplete='off'
        value={value}
        onChange={changeHandler}
        onFocus={() => setFocus(true)}
        onKeyDown={keydownHandler}
        disabled={roles.length <= 0 || props.disabled}
      />
      {suggestions.length > 0 && (
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 translate-y-1'
          show={focus}
        >
          <div className='absolute w-full top-14 text-xs shadow-xl rounded-lg overflow-hidden z-10 p-[12px_4px_12px_8px] bg-white'>
            <ul className='w-full max-h-[200px] overflow-auto pr-1'>
              {suggestions.map((elem) => (
                <li
                  onClick={() => selectRoleHandler(elem)}
                  key={elem.id}
                  className={`font-inter w-full pl-5 h-12 flex items-center cursor-pointer hover:bg-odf-light rounded-lg ${
                    suggestions.length === 1 ? 'bg-odf-light' : ''
                  }`}
                >
                  {elem.name}
                </li>
              ))}
            </ul>
          </div>
        </Transition>
      )}
    </div>
  );
}
