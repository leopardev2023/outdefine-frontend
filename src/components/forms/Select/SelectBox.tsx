import { useState, useEffect } from 'react';
import FormButton from '../FormButton';
import DropdownLogo from 'assets/svg/dropdown.svg';
interface PropsType {
  name?: string;
  list: Array<string>;
  placeholder: string;
  className?: string;
  onSelect?: (val: string) => void;
  selected?: string;
}

const SelectBox = ({
  name = '',
  list = [],
  placeholder = '',
  className = '',
  selected = '',
  onSelect,
}: PropsType) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleSelect = (e: any) => {
    onSelect && onSelect(e.target.innerHTML);
    setVisible(false);
  };

  return (
    <>
      <div className={`relative w-full ${className}`}>
        <FormButton
          type='button'
          text={selected === '' ? placeholder : selected}
          onClick={handleClick}
          icon={<img src={DropdownLogo} alt='' />}
        />
        {visible && (
          <div className='absolute z-50 top-[55px] w-full overflow-y-auto flex flex-col rounded-[15px] text-left bg-white shadow-3xl max-h-64'>
            {list.map((item, id) => (
              <div
                key={id}
                className='w-full px-5 py-4 cursor-pointer rounded-[15px] hover:bg-theme hover:text-white'
                onClick={handleSelect}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SelectBox;
