import { useState } from 'react';

interface PropsType {
  data: Array<{id: number, name: string}>;
  selected?: any;
  onSelect: (val: any) => void;
}

const CircleSelectRole: React.FC<PropsType> = ({
  data,
  selected = -1,
  onSelect,
}) => {
  return (
    <>
      <div className='flex w-full flex-row flex-wrap gap-y-5 justify-center gap-x-[47px] text-[1.25rem] font-semibold'>
        {data && data.map(
          (item, id) =>
            (item.id !== selected.id && (
              <div
                id={`job`}
                key={id}
                onClick={() => onSelect(item)}
                className='o-flex cursor-pointer w-32 h-32 lg:w-[177px] lg:h-[168px] rounded-full bg-white shadow-3xl'
              >
                {item.name}
              </div>
            )) ||
            (item.id === selected.id && (
              <div
                id={`job${id}`}
                key={id}
                onClick={() => {onSelect(item)}}
                className='o-flex cursor-pointer w-32 h-32 lg:w-[177px] lg:h-[168px] rounded-full bg-primary shadow-3xl font-bold'
              >
                {item.name}
              </div>
            ))
        )}
      </div>
    </>
  );
};

export default CircleSelectRole;
