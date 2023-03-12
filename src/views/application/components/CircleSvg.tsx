import left_dark from 'assets/svg/profile/circle/circle-left-dark.svg';
import right_dark from 'assets/svg/profile/circle/circle-right-dark.svg';
import left_light from 'assets/svg/profile/circle/circle-left-light.svg';
import right_light from 'assets/svg/profile/circle/circle-right-light.svg';
import close_dark from 'assets/svg/profile/circle/circle-close-dark.svg';
import close_light from 'assets/svg/profile/circle/circle-close-dark.svg';
import plus_light from 'assets/svg/profile/circle/circle-plus-light.svg';
import plus_dark from 'assets/svg/profile/circle/circle-plus-dark.svg';
import minus_dark from 'assets/svg/profile/circle/circle-minus-dark.svg';
import minus_light from 'assets/svg/profile/circle/circle-minus-dark.svg';

const data = {
  left: {
    dark: left_dark,
    light: left_light,
  },
  right: {
    dark: right_dark,
    light: right_light,
  },
  close: {
    dark: close_dark,
    light: close_light,
  },
  plus: {
    dark: plus_dark,
    light: plus_light,
  },
  minus: {
    dark: minus_dark,
    light: minus_dark,
  },
};

interface CircleType {
  onClick?: any;
  type: string;
  mode: string;
  className: string;
}

const SVGCircle = ({ onClick, type, mode, className }: CircleType) => {
  return (
    <img
      onClick={() => {
        if (!onClick) return;
        onClick();
      }}
      alt={[type, mode, className].join(' ')}
      src={data[type][mode]}
      className={className}
    />
  );
};

export default SVGCircle;
