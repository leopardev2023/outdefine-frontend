import { KeyboardEvent, ChangeEvent, ReactElement, useState } from 'react';
import countries from 'countries-list';
import { Transition } from '@headlessui/react';
import InputV2 from '../Input/InputV2';
import { Controller } from 'react-hook-form';
import BadgeV2 from '../Badges/BadgeV2';

const countryList = Object.values(countries.countries).map((item) => item.name);

const filterList = (value: string) => {
  return countryList.filter(
    (item) =>
      value !== undefined &&
      item.toLowerCase().indexOf(value.toLowerCase()) >= 0
  );
};

interface IFormCountryInputV2 extends ICountryInputV2 {
  name: string;
  control: any;
  rules?: Record<string, any>;
  directionUp?: boolean;
  withBadge?: boolean;
  badgeClass?: string;
  shouldUnregister?: boolean;
}

export const FormCountryInputV2 = ({
  name,
  control,
  withBadge = false,
  badgeClass = '',
  rules = {},
  disabled = false,
  shouldUnregister = false,
  ...props
}: IFormCountryInputV2) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value } }) => (
        <div>
          <CountryInputV2
            {...props}
            value={value}
            onCountryChange={onChange}
            disabled={disabled}
          />
          {withBadge && !disabled && value ? (
            <BadgeV2 addClass={badgeClass}>{value}</BadgeV2>
          ) : null}
        </div>
      )}
    />
  );
};

const CountryInputV2: React.FC<ICountryInputV2> = ({
  onCountryChange = (val: string) => {},
  directionUp = false,
  ...props
}): ReactElement => {
  const [focus, setFocus] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props.value ?? '');

  const lists: string[] = filterList(value);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const keydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Enter' &&
      lists.length === 1 &&
      lists[0].toLocaleLowerCase() === value.toLocaleLowerCase()
    ) {
      setValue(lists[0]);
      onCountryChange(lists[0]);
      setFocus(false);
    }
    if (e.key === 'Tab') {
      blurHandler();
    }
  };

  const blurHandler = () => {
    setFocus(false);
    onCountryChange(lists[0]);
    setValue(lists[0]);
  };

  return (
    <div className='relative w-full'>
      <InputV2
        {...props}
        icon={props.icon}
        placeholder={props.placeholder}
        onKeyDown={keydownHandler}
        onFocus={() => setFocus(true)}
        value={value}
        onChange={changeHandler}
      />
      <Transition
        show={focus}
        leave='transition ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
        className={`absolute ${
          directionUp ? 'bottom-16' : 'top-12'
        } z-10 w-full bg-white`}
      >
        <div className='pt-4 pb-2 pl-2 pr-2 shadow-lg rounded-lg'>
          <ul className='font-inter overflow-auto max-h-[200px] pr-2 text-xs leading-[48px] cursor-pointer'>
            {lists.map((countryName, index) => {
              const case_match = value === countryName;

              return (
                <li
                  onClick={() => {
                    setValue(countryName);
                    setFocus(false);
                    onCountryChange(countryName);
                  }}
                  key={countryName + index}
                  className={`h-12 px-4 hover:bg-odf-light rounded-lg ${
                    case_match
                      ? 'bg-odf-light'
                      : value.toLocaleLowerCase() ===
                        countryName.toLocaleLowerCase()
                      ? 'bg-odf-light/40'
                      : ''
                  }`}
                >
                  {countryName}
                </li>
              );
            })}
          </ul>
        </div>
      </Transition>
    </div>
  );
};

export default CountryInputV2;
