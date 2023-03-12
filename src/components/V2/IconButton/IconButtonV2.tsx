import { ReactElement } from 'react';

import objectHelper from 'helpers/object';
import IconV2 from '../Icons/IconV2';

const IconButtonV2: React.FC<IIconButtonV2> = (props): ReactElement => {
  return (
    <button
      {...objectHelper.removeKey(props, ['iconType', 'iconClassName'])}
      className={
        props?.className ??
        'w-8 h-8 rounded bg-[#F4F4F4] flex justify-center items-center'
      }
    >
      <IconV2
        iconType={props.iconType}
        iconClassName={props?.iconClassName ?? ''}
      />
    </button>
  );
};

export default IconButtonV2;
