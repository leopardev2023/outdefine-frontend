import React from 'react';
import PrevSVG from 'assets/svg/back.svg';
import DownSVG from 'assets/svg/arrowdown.svg';

const svgs = {
  PREV: PrevSVG,
  DOWN: DownSVG,
};

type Props = {
  direction: 'UP' | 'DOWN' | 'PREV' | 'NEXT';
  className?: string;
  onClick: () => void;
};

function ArrowButton({ direction = 'NEXT', className = '', onClick }: Props) {
  return (
    <img
      src={svgs[direction]}
      className={'cursor-pointer ' + className}
      alt='arrow'
      onClick={onClick}
    />
  );
}

export default ArrowButton;
