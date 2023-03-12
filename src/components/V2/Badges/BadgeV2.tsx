import { ReactElement } from 'react';
import IconV2 from '../Icons';

const classNames = {
  blue: 'bg-odf-light text-odf',
  pink: 'bg-coral-red-hue text-coral-red',
  orange: 'bg-[#FFC6A3] text-orange',
  purple: 'bg-blue2-hue text-blue2',
};

const minusClassNames = {
  blue: 'bg-odf',
  pink: 'bg-coral-red',
  orange: 'bg-orange',
  purple: 'bg-blue2',
};

const BadgeV2 = ({
  color = 'blue',
  addClass,
  children,
  starInBadge,
  minusInBadge,
}: IBadgeV2): ReactElement => {
  return (
    <span
      className={`${
        classNames[color]
      } rounded-lg flex items-center justify-center font-inter text-xs w-fit gap-[1px] p-2 ${
        addClass ?? 'w-fit h-6'
      }`}
    >
      {starInBadge && <IconV2 iconClassName='w-4 h-4' iconType={'REDSTAR'} />}
      {children}
      {minusInBadge && (
        <span
          className={`ml-1 w-[9px] h-[2px] block ${minusClassNames[color]}`}
        />
      )}
    </span>
  );
};

export default BadgeV2;
