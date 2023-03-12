import BadgeV2 from 'components/V2/Badges/BadgeV2';
import { ReactElement } from 'react';

const InputWrapperV2 = (props: IInputWrapperV2): ReactElement => {
  return (
    <div className={props.wrapperClass ?? ''}>
      <label
        className={`${
          props.labelClass ??
          'font-poppins text-xs leading-4 tracking-[0.25px] block mb-[14px]'
        } pl-[2px]`}
      >
        {props.label}
      </label>
      {props.children}

      {props.noBadge ? (
        <></>
      ) : (
        <div
          className={`flex flex-wrap gap-2 mt-[10px] ${
            props.badgeWrapperAddClass ?? ''
          }`}
        >
          {props.badgeTexts &&
            props.badgeTexts.map((badge, index) => {
              return badge ? (
                <div
                  key={Math.random() * index}
                  onClick={() => {
                    props.onBadgeClick && props.onBadgeClick(badge);
                  }}
                >
                  <BadgeV2
                    minusInBadge={props.minusInBadge}
                    starInBadge={props.badgeStar}
                    color={props.badgeColor}
                    addClass={props.badgeClass}
                  >
                    {badge}
                  </BadgeV2>
                </div>
              ) : (
                <></>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default InputWrapperV2;
