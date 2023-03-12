import { ChangeEvent, useState } from 'react';
import formatMaker from './formatMaker';

const inputClassName =
  'w-7 h-full rounded-none border-b-[1px] border-black !shadow-none text-black bg-white px-0 font-semibold text-xs text-center';

const RateRangeInputV2: React.FC<IRateRangeV2> = (props: IRateRangeV2) => {
  const [focus, setFocus] = useState<boolean>(false);

  const changeHandler = (name: 'min' | 'max', value: string) => {
    const valueAsNumber = Number.isNaN(Number(value)) ? 0 : Number(value);

    props.onChange(name, valueAsNumber);
  };

  return (
    <div
      className={`${formatMaker({ ...props, focus })} ${
        props.addClass ?? ''
      } font-inter`}
    >
      Min<span className='font-bold pl-2 pr-1'> $</span>
      <input
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          changeHandler('min', e.target.value)
        }
        value={props.min}
        className={inputClassName + ' bg-white/0'}
      />
      <span className='pl-[14px]'>
        /hr <span className='font-bold pl-3 pr-3'>To</span>
        Max <span className='font-bold pl-2 pr-2'>$</span>
      </span>
      <input
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          changeHandler('max', e.target.value)
        }
        value={props.max}
        className={inputClassName + ' bg-white/0'}
      />
      <span className='pl-[14px]'>/hr</span>
    </div>
  );
};

export default RateRangeInputV2;
