import React, { useState } from 'react';
import countries from 'countries-list';
import { isEmpty } from '@aws-amplify/core';
// import './LocationAutocomplete.scss';

const countryList = Object.values(countries.countries).map((item) => item.name);

interface PropsType {
  value: string;
  labelClass?: string;
  inputClass?: string;
  listClass?: string;
  handleSelect: (value: string) => void;
}

export const CountriesAutocompleteV: React.FC<PropsType> = ({
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
      <div className={labelClass ?? 'font-medium text-[18px] leading-[150%] font-poppins '}>Country</div>
      <input
        placeholder={'Type a country'}
        onChange={handleChange}
        value={value}
        className={
          `w-full h-12 text-sm rounded-[8px] px-4 shadow-none border border-[#F4F4F4] bg-[#F0F1F2] hover:border-darker-gray hover:border-[1px] transition-all duration-800 ${
            value?.length > 0 ? 'border-[1px] !border-black !bg-lighter-gray ' : ''
          }` + (inputClass ?? '')
        }
      />
      {countryList.filter((item) => value !== '' && item.toLowerCase().indexOf(value.toLowerCase()) >= 0).length > 0 &&
        visible && (
          <div
            className={
              listClass ??
              'absolute mt-3 z-10 w-full max-h-64 shadow-md rounded-[8px] bg-white overflow-y-auto px-2 py-3'
            }
          >
            {visible &&
              countryList
                .filter((item) => value !== '' && item.toLowerCase().indexOf(value.toLowerCase()) >= 0)
                .map((item, index) => (
                  <div
                    className='cursor-pointer flex items-center w-full px-2 h-12 font-inter bg-white hover:bg-odf-light hover:rounded-[8px] text-xs'
                    onClick={handleClick}
                    key={index}
                  >
                    {item}
                  </div>
                ))}
          </div>
        )}
    </div>
  );
};
