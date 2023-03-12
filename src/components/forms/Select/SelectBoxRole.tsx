import { useState, useEffect } from 'react';
import FormButton from '../FormButton';
import DropdownLogo from 'assets/svg/dropdown.svg';
interface PropsType {
  name?: string;
  list: Array<{ id: number; name: string }>;
  placeholder: string;
  className?: string;
  onSelect?: (val: any) => void;
  selected?: any;
  value?: string;
  displayValue?: boolean;
}

const SelectBoxRole = ({
  name = '',
  list,
  placeholder = '',
  className = '',
  selected = -1,
  onSelect,
  value = '',
  displayValue = false,
}: PropsType) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleSelect = (item: any) => {
    onSelect && onSelect(item);
    setVisible(false);
  };

  return (
    <>
      <div className={`relative w-full ${className}`}>
        <FormButton
          name={name}
          type='button'
          text={displayValue ? (value ? value : placeholder) : placeholder}
          onClick={handleClick}
          icon={<img src={DropdownLogo} alt='' />}
          className={`text-sm font-normal ${!value ? 'text-[#A3A3A3]' : 'text-black'}`}
        />
        {visible && (
          <div className='absolute z-50 top-[55px] w-full overflow-y-auto flex flex-col rounded-[15px] text-left bg-white shadow-3xl max-h-64'>
            {list &&
              list?.map((item, id) => (
                <div
                  key={id}
                  className='w-full px-5 py-4 cursor-pointer rounded-[15px] hover:bg-theme hover:text-white'
                  onClick={() => {
                    handleSelect(item);
                  }}
                >
                  {item.name}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SelectBoxRole;
