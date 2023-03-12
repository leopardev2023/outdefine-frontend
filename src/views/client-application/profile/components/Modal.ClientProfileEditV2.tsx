import { ChangeEvent, ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/store';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import TextareaV2 from 'components/V2/Textarea/TextareaV2';
import InputV2 from 'components/V2/Input/InputV2';
import ModalV2 from 'components/Modal/ModalV2';
import IconV2 from 'components/V2/Icons';
import Button from 'components/Button/ButtonV2';

import useClientProfileForm from '../hooks/useClientProfileForm';

import useWindowDimensions from 'hooks/utils/useWindowDimensions';

import {
  updateCompanyClientProfile,
  uploadClientAvatar,
} from 'redux/slices/companyProfile';
import {
  default_background_colors,
  default_men_avatars,
  default_women_avatars,
} from 'constants/v2/default_images';

export default function ClientProfileEditModalV2({
  pending,
  profile,
  visibility,
  setVisibility,
}: IClientProfileEditModalV2): ReactElement {
  const { isXs } = useWindowDimensions();
  const dispatch = useDispatch<AppDispatch>();
  const {
    formData,
    handleInputChange,
    handleChangeInObject,
    handleManualChangeInObject,
  } = useClientProfileForm(profile);

  const [avatarFile, setAvatarFile] = useState<File>();

  const avatarChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const image = e.target.files[0];
    handleManualChangeInObject('avatar', URL.createObjectURL(image), 'User');
    setAvatarFile(image);
  };

  const submitHandler = async () => {
    var result;
    if (Number(formData.User?.avatar)) {
      result = await dispatch(
        updateCompanyClientProfile({
          ...formData,
          first_name: formData.User?.first_name ?? '',
          last_name: formData.User?.last_name ?? '',
          avatar: formData.User?.avatar ?? '',
          email: formData.User?.email_id,
          background_number: formData.User?.background_number ?? '1',
        })
      );
    } else if (avatarFile) {
      const response = await dispatch(uploadClientAvatar({ data: avatarFile }));
      if (response.payload.success) {
        const url: string = response.payload.data.avatar;
        result = await dispatch(
          updateCompanyClientProfile({
            ...formData,
            first_name: formData.User?.first_name ?? '',
            last_name: formData.User?.last_name ?? '',
            avatar: url,
            email: formData.User?.email_id,
            background_number: formData.User?.background_number ?? '1',
          })
        );
      } else {
        toast.custom(<Toast type="error" message="There was an error uploading avatar." />);
        return;
      }
    } else {
      result = await dispatch(
        updateCompanyClientProfile({
          ...formData,
          first_name: formData.User?.first_name ?? '',
          last_name: formData.User?.last_name ?? '',
          avatar: formData.User?.avatar ?? '',
          email: formData.User?.email_id,
          background_number: formData.User?.background_number ?? '1',
        })
      );
    }

    if (result?.payload?.success) {
      toast.custom(<Toast type="success" message="Client profile successfully updated!" />);
    }
    setVisibility(false);
  };

  return (
    <ModalV2 onClose={() => setVisibility(false)} isOpen={visibility}>
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className='overflow-x-hidden w-[720px] pb-20 absolute left-1/2 top-[150px] -translate-x-1/2 z-10'
      >
        <form
          noValidate
          autoComplete='off'
          onSubmit={submitHandler}
          className='w-full bg-white rounded-lg p-[64px_56px_40px_56px] relative flex flex-col items-center font-poppins text-sm leading-4'
        >
          <button
            onClick={() => setVisibility(false)}
            className='absolute right-7 top-6'
          >
            <IconV2 iconType='CLOSE' iconClassName='w-6 h-6' />
          </button>
          <h3 className='text-center font-semibold text-xl leading-[150%]'>
            Edit profile
          </h3>
          <div
            className={`mt-6 flex justify-center w-[160px] h-[135px] rounded-lg overflow-hidden ${
              default_background_colors[formData.User?.background_number ?? 0]
            }`}
          >
            <img
              src={
                [...default_men_avatars, ...default_women_avatars][
                  formData.User?.avatar ?? 0
                ] ?? formData.User?.avatar
              }
              alt='default-avatar-preshow'
              className={
                isNaN(Number(formData.User?.avatar))
                  ? 'w-full h-full object-cover'
                  : 'w-[135px] h-full object-cover'
              }
            />
          </div>
          <p className='mt-4 font-poppins font-semibold text-sm leading-4'>
            Change your profile image
          </p>
          <label className='cursor-pointer mt-4 font-poppins font-semibold text-sm leading-4 px-4 flex items-center gap-[6px] h-10 border-[1px] border-odf rounded-lg'>
            <IconV2 iconType={'UPLOAD'} />
            Upload image
            <input type='file' hidden onChange={avatarChangeHandler} />
          </label>
          <p className='mt-6'>Add a profile image or choose one of ours</p>
          <div className={`mt-6 flex flex-wrap gap-x-3 gap-y-6
            ${ isXs ? "justify-center" : "w-[480px]" }`}>
            {[...default_men_avatars, ...default_women_avatars].map(
              (default_avatar, index) => (
                <img
                  key={`default-${
                    index < default_men_avatars.length ? 'man' : 'woman'
                  }-avatar-${index}`}
                  src={default_avatar}
                  alt={`default-${
                    index <= 5 ? 'man' : 'woman'
                  }-avatar-${index}`}
                  width={70}
                  height={70}
                  className={`w-[70px] h-[70px] cursor-pointer hover:scale-125 hover:rounded-3xl transition-all duration-300 ${
                    formData.User?.avatar === index.toString()
                      ? 'scale-125 rounded-3xl'
                      : ''
                  }`}
                  onClick={() =>
                    handleManualChangeInObject(
                      'avatar',
                      index.toString(),
                      'User'
                    )
                  }
                />
              )
            )}
          </div>
          <p className='mt-6'>Choose a background color</p>
          <div className={`
            mt-6 flex gap-3
            ${isXs ? "justify-center flex-wrap" : ""}`
          }>
            {default_background_colors.map((bg_color, index) => (
              <span
                onClick={() =>
                  handleManualChangeInObject(
                    'background_number',
                    index.toString(),
                    'User'
                  )
                }
                key={'default-bg-' + index}
                className={`cursor-pointer hover:scale-110 hover:rounded-2xl transition-all duration-200 min-w-[70px] min-h-[70px] ${bg_color} last:border-[1px] last:border-odf rounded-lg`}
              />
            ))}
          </div>
          <div className='grid grid-cols-2 gap-10 mt-11 w-full'>
            <label>
              <span className='block mb-4 text-xs leading-4'>First name</span>
              <InputV2
                name='first_name'
                value={formData.User?.first_name ?? ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeInObject(e, 'User')
                }
                disabled={pending}
                placeholder='First name'
              />
            </label>
            <label>
              <span className='block mb-4 text-xs leading-4'>Last name</span>
              <InputV2
                name='last_name'
                value={formData.User?.last_name ?? ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChangeInObject(e, 'User')
                }
                placeholder='Last name'
                disabled={pending}
              />
            </label>
          </div>
          <label className='mt-11 w-full'>
            <span className='block mb-4 text-xs leading-4'>About myself</span>
            <TextareaV2
              name='summary'
              value={formData.summary}
              onChange={handleInputChange}
              className='h-[140px] text-xs'
              limitText='100 word max'
              placeholder='Description'
              disabled={pending}
            />
          </label>
          <Button
            onClick={submitHandler}
            loading={pending}
            className='mt-14 px-4 w-[186px]'
          >
            Save changes
          </Button>
        </form>
      </div>
    </ModalV2>
  );
}
