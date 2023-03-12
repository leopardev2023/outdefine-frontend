import { useState } from 'react';

interface PropsType {
  data: Array<string>;
  selected?: string;
  onSelect: (val: string) => void;
}

const CircleSelect: React.FC<PropsType> = ({
  data,
  selected = '',
  onSelect,
}) => {
  return (
    <>
      <div className='flex w-full flex-row flex-wrap gap-y-5 justify-center gap-x-[47px] text-[1.25rem] font-semibold'>
        {data.map(
          (item, id) =>
            (item !== selected && (
              <div
                key={id}
                onClick={() => onSelect(item)}
                className='o-flex cursor-pointer w-32 h-32 lg:w-[177px] lg:h-[168px] rounded-full bg-white shadow-3xl'
              >
                {item}
              </div>
            )) ||
            (item === selected && (
              <div
                key={id}
                onClick={() => onSelect(item)}
                className='o-flex cursor-pointer w-32 h-32 lg:w-[177px] lg:h-[168px] rounded-full bg-primary shadow-3xl font-bold'
              >
                {item}
              </div>
            ))
        )}
      </div>
    </>
  );
};

export default CircleSelect;
