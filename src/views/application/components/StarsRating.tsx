import { memo, useState } from 'react';

interface StarRatingType {
  init: number;
  onChange?: any;
  control?: boolean;
}

const StarsRating = ({ init, onChange }: StarRatingType) => {
  const [hoverIndex, setHoverIndex] = useState<number>(0);

  const clickHandler = (index: number) => {
    onChange(index + 1);
  };

  return (
    <div className='flex gap-[2px]'>
      {new Array(5).fill(true).map((_rate, index) => (
        <Star
          key={'rate' + index}
          onHover={() => setHoverIndex(index + 1)}
          onOut={() => setHoverIndex(0)}
          onClick={() => clickHandler(index)}
          active={index < init || index < hoverIndex}
        />
      ))}
    </div>
  );
};

interface StarPropsType {
  active?: boolean;
  onHover?: any;
  onOut?: any;
  onClick?: any;
}

export const Star = ({ active, onHover, onOut, onClick }: StarPropsType) => {
  return (
    <svg
      className='cursor-pointer'
      onMouseOver={onHover}
      onMouseOut={onOut}
      onClick={onClick}
      width='33'
      height='33'
      viewBox='0 0 33 33'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17.1863 6.85882L18.8428 10.27C19.0698 10.7382 19.6735 11.1973 20.1842 11.2753L23.2225 11.7797C25.1681 12.0983 25.6054 13.5313 24.2027 14.9635L21.8135 17.3893C21.4146 17.7958 21.1797 18.5909 21.3056 19.1473L21.9599 22.1314C22.474 24.4874 21.2385 25.4103 19.203 24.1871L16.3596 22.4781C15.8417 22.1657 14.995 22.1771 14.4798 22.4872L11.6128 24.2162C9.56062 25.452 8.33558 24.5431 8.88549 22.1841L9.58797 19.1989C9.71915 18.6409 9.5063 17.8475 9.11163 17.4465L6.74364 15.0404C5.36218 13.6255 5.82046 12.189 7.76747 11.849L10.8075 11.3203C11.3207 11.2267 11.9319 10.7745 12.1616 10.2998L13.8699 6.86637C14.8024 5.01696 16.2921 5.01272 17.1863 6.85882Z'
        fill={active ? '#E8D97E' : '#CFC8A8'}
      />
    </svg>
  );
};

export const StarsRatingView = ({ rate, addClass }: IRateView) => {
  return (
    <div className={`flex gap-[2px] ${addClass ?? ''}`}>
      {new Array(rate).fill(true).map((_rate, index) => (
        <Star key={'star' + index} active />
      ))}
    </div>
  );
};

interface IRateView {
  rate: number;
  addClass?: string;
}

export default memo(StarsRating);
