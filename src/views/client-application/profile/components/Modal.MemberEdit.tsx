import { ReactElement, useState } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/store';

import Button from 'components/Button/ButtonV2';
import DropdownV2 from 'components/V2/Dropdown/DropdownV2';
import IconButtonV2 from 'components/V2/IconButton';
import IconV2 from 'components/V2/Icons';
import InputV2 from 'components/V2/Input/InputV2';

import { default_background_colors } from 'constants/v2/default_images';

import { AvatarWithDefaultV2 } from 'views/client-application/components/Images.WithDefaultV2';

import ENUMS from 'constants/v2/enums';
import protoHelper from 'helpers/prototype';
import { updateTeamMember } from 'redux/slices/companyProfile';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

export default function MemberEditModal(props: IMemberEditModal): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const { background_number, avatar } = props.User || {};
  const [position, setPosition] = useState<string>(props.position ?? 'ADMIN');

  const saveHandler = async () => {
    const { first_name, last_name, email_id } = props.User || {};
    if (!props.client_id) {
      return;
    }
    const result = await dispatch(
      updateTeamMember({
        first_name: first_name ?? '',
        last_name: last_name ?? '',
        email: email_id ?? '',
        position,
        client_id: props.client_id,
      })
    );
    if (result.payload.success) {
      toast.custom(<Toast type="success" message="Member position successfully updated!" />);
    } else {
      toast.custom(<Toast type="error" message="There was an error updating position." />);
    }
    props.onClose();
  };

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      className='overflow-x-hidden w-[720px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10'
    >
      <div className='w-full p-[44px_66px_40px_66px] bg-white rounded-lg flex flex-col relative'>
        <IconButtonV2
          className='absolute top-[22px] right-[22px]'
          onClick={props.onClose}
          iconType='CLOSE'
        />
        <h6 className='text-xl font-poppins font-semibold leading-[150%] text-center'>
          Edit team member
        </h6>
        <div
          className={`flex mx-auto mt-6 w-[160px] h-[135px] rounded-lg overflow-hidden ${
            background_number?.toString()
              ? default_background_colors[background_number]
              : 'bg-white/0'
          }`}
        >
          {avatar && (
            <AvatarWithDefaultV2
              src={avatar}
              className='w-[140px] h-[135px] mx-auto'
            />
          )}
        </div>
        <p className='mt-6 font-poppins text-base leading-4 text-center'>
          {(props.User?.first_name ?? '') + ' ' + (props.User?.last_name ?? '')}
        </p>
        <span className='font-poppins text-center text-sm leading-4 mt-2 block'>
          {props?.position ?? 'NONE'}
        </span>
        <div className='mt-[30px] grid grid-cols-2 gap-11'>
          <div>
            <label className='block mb-4 font-poppins text-xs leading-4'>
              Current position
            </label>
            <DropdownV2
              directionUp
              data={protoHelper.addIndexArrayElem(ENUMS.clientPositions, true)}
              selectedValue={position}
              onChange={(idx: number) =>
                setPosition(ENUMS.clientPositions[idx])
              }
              placeholder={position.toLocaleLowerCase()}
            />
          </div>
          <div>
            <label className='block mb-4 font-poppins text-xs leading-4'>
              Permissions
            </label>
            <InputV2
              disabled
              className='capitalize'
              value={position.toLocaleLowerCase()}
              icon={<IconV2 iconClassName='w-5 h-5' iconType='USER' />}
            />
          </div>
        </div>
        <Button
          loading={props.pending}
          onClick={saveHandler}
          className='mt-8 mx-auto min-w-[180px]'
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
