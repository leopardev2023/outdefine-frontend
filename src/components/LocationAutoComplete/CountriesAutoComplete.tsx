import React, { useState } from 'react';
import countries from 'countries-list';

// import './LocationAutocomplete.scss';

const countryList = Object.values(countries.countries).map((item) => item.name);

interface PropsType {
  value: string;
  labelClass?: string;
  inputClass?: string;
  listClass?: string;
  handleSelect: (value: string) => void;
}

export const CountriesAutocomplete: React.FC<PropsType> = ({
  value,
  handleSelect,
  labelClass,
  inputClass,
  listClass,
}) => {
  const [visible, setVisible] = useState(false);

  const handleChange = (event) => {
    setVisible(true);
    handleSelect(event.target.value);
  };
  const handleClick = (event) => {
    setVisible(false);
    handleSelect(event.target.innerText);
  };

  return (
    <div className='places-auto-complete relative font-inter'>
      <div className={labelClass ?? 'font-medium text-[18px] leading-[150%] font-poppins'}>Country</div>
      <input
        placeholder={'Search Countries...'}
        onChange={handleChange}
        value={value}
        className={inputClass ?? 'w-[312px] h-[46px] text-[14px] bg-lighter-gray shadow-3xl rounded-[15px] mt-6 px-4'}
      />
      <div
        className={
          listClass ??
          'absolute z-10 w-[312px] max-h-64 rounded-[15px] bg-lighter-gray top-[50px] overflow-y-auto shadow-3xl'
        }
      >
        {visible &&
          countryList
            .filter((item) => value !== '' && item.toLowerCase().indexOf(value.toLowerCase()) >= 0)
            .map((item, index) => (
              <div
                className='cursor-pointer flex items-center w-full px-4 h-[46px] bg-lighter-gray'
                onClick={handleClick}
                key={index}
              >
                {item}
              </div>
            ))}
      </div>
    </div>
  );
};
