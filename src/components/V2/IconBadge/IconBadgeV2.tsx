import { ReactElement } from 'react';
import BadgeV2 from '../Badges/BadgeV2';
import IconV2 from '../Icons';

const IconBadgeV2: React.FC<IIconBadgeV2> = (props): ReactElement => {
  return (
    <div className={`flex gap-2 items-center ${props.addClass ?? ''}`}>
      <IconV2 iconClassName={props.iconClassName} iconType={props.iconType} />
      <BadgeV2 addClass={props.badgeClassName} color={props.color}>
        {props.children}
      </BadgeV2>
    </div>
  );
};

export default IconBadgeV2;
