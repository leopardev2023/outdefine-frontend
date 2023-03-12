import BadgeV2 from 'components/V2/Badges/BadgeV2';
import { ReactElement } from 'react';

export default function LabelWrapperV2(props: ILabelWrapperV2): ReactElement {
  return (
    <div className={props.className ?? 'w-full'}>
      <label className='font-poppins text-xs leading-4 block mb-4'>
        {props.label}
      </label>
      {props.children}
      {props.badgeTexts && props.badgeTexts?.length >= 1 && (
        <div className='mt-2 w-full flex flex-wrap gap-2'>
          {props.badgeTexts.map((badge: string, index: number) => (
            <button
              key={badge + index}
              onClick={() => props.onBadgeClick && props.onBadgeClick(badge)}
            >
              <BadgeV2
                starInBadge={props.starInBadge}
                minusInBadge={props.minusInBadge}
                addClass={`w-fit px-2 capitalize ${
                  props.smallBadge ? 'h-6' : 'h-8'
                }`}
                color={props.badgeColor}
              >
                {badge}
              </BadgeV2>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
