import { useState } from 'react';
import FormButton from 'components/forms/FormButton';
import DropdownLogo from 'assets/svg/dropdown.svg';
import starbucksSVG from 'assets/svg/application/starbucks.svg';

interface PropsType {
  name?: string;
  list: Array<string>;
  placeholder: string;
  className?: string;
  onSelect?: (val: string) => void;
  selected?: string;
}

const SelectBoxWithImg = ({
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
          icon={
            <img
              className='w-[13px] absolute right-1'
              src={DropdownLogo}
              alt=''
            />
          }
          className={'shadow-none font-inter text-sm px-1 bg-[#fafafa]'}
        />
        {visible && (
          <div className='absolute z-50 top-[55px] w-full overflow-y-auto flex flex-col rounded-[15px] text-left bg-white shadow-3xl max-h-64'>

            {list.map((item, id) => (
              <div
                key={id}
                className='w-full px-3 text-sm py-4 cursor-pointer rounded-[15px] hover:bg-theme hover:text-white flex items-center gap-x-[20px]'
                onClick={handleSelect}
              >
                <img
                  alt='starbucks'
                  src={starbucksSVG}
                  className="w-[32px] h-[32px] rounded-full shadow-3xl border bg-white border-white"
                />
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SelectBoxWithImg;
