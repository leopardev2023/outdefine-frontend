import { useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import en from 'react-phone-number-input/locale/en.json';
import Input, {
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input/input';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import {
  updateTalentProfile,
  updateTalentProfileSocials,
  updateTalentUser,
  uploadTalentUserAvatar,
} from 'redux/slices/profile';

import Button from 'components/Button/ButtonV2';
import DropdownV2 from 'components/V2/Dropdown/DropdownV2';
import IconV2 from 'components/V2/Icons';
import InputV2 from 'components/V2/Input/InputV2';
import { CityInputV2 } from 'components/V2/LocationAutocomplete/CityInputV2';
import CountryInputV2 from 'components/V2/LocationAutocomplete/CountryInputV2';
import LabelWrapperV2 from './Wrapper.LabelV2';
import IconButtonV2 from 'components/V2/IconButton';

import useDefaultAvatar from '../hooks/useDefaultAvatar';
import useProfileForm from '../hooks/useProfileForm';

import useWindowDimensions from 'hooks/utils/useWindowDimensions';

import {
  default_background_colors,
  default_men_avatars,
  default_women_avatars,
} from 'constants/v2/default_images';

export default function TalentProfileFormV2(props: ITalentProfileFormV2) {
  const { isXs } = useWindowDimensions();
  const phoneInputRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const is_busy = useSelector((root: RootState) => root.profile.is_busy);
  const [selectedCountry, setSelectedCountry] = useState<string>('US');

  const {
    formData,
    handleInputChange,
    handleManualChange,
    handleChangeInObject,
  } = useProfileForm(props.profile);

  const {
    avatarImage,
    preAvatar,
    backgroundColor,
    setPreAvatar,
    setBackgroundColor,
    setAvatarImage,
    changeAvatarHandler,
  } = useDefaultAvatar(
    props.profile.User.avatar,
    props.profile.User.background_number
  );

  const countryCodes = useMemo(() => getCountries().map((i) => i), []);

  const dialCodes = useMemo(
    () =>
      getCountries().map((country, index) => ({
        id: index,
        value: `${en[country]} +${getCountryCallingCode(country)}`,
      })),
    []
  );

  const newSocial = formData.FreelancerProfileSocialLink;
  const oldSocial = props.profile.FreelancerProfileSocialLink;

  const submitHandler = async (e: any) => {
    e.preventDefault();
    // update social links
    if (
      newSocial.github_link !== oldSocial.github_link ||
      newSocial.linkedin_link !== oldSocial.linkedin_link ||
      newSocial.website_link !== oldSocial.website_link
    ) {
      try {
        await dispatch(updateTalentProfileSocials(newSocial));
      } catch (e) {
        toast.custom(<Toast type="error" message="There was an error while updating talent social links" />);
      }
    }

    // update profile
    try {
      await dispatch(updateTalentProfile(formData));
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error while updating profile" />);
      console.log('err: ', e);
    }

    //update default avatar & upload
    try {
      if (
        props.profile.User.avatar !== avatarImage ||
        props.profile.User.first_name !== formData.User.first_name ||
        props.profile.last_name
      ) {
        // changed only first name or last name
        if (
          props.profile.User.first_name !== formData.User.first_name ||
          props.profile.last_name
        ) {
          await dispatch(
            updateTalentUser({
              ...formData.User,
              first_name: formData.first_name,
              last_name: formData.last_name,
            })
          );
        }

        if (typeof avatarImage === 'number') {
          await dispatch(
            updateTalentUser({
              ...formData.User,
              first_name: formData.first_name,
              last_name: formData.last_name,
              avatar: avatarImage.toString(),
              background_number: backgroundColor,
            })
          );
        } else if (avatarImage) {
          await dispatch(uploadTalentUserAvatar(avatarImage));
        }
      }
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error while updating avatar" />);
    }
    toast.custom(<Toast type="success" message="Successfully updated profile" />);

    props.onClose();
  };

  return (
    <form
      noValidate
      autoComplete='off'
      onSubmit={submitHandler}
      className={`flex flex-col items-center w-full bg-white rounded-lg relative
      ${isXs ? "p-[28px]" : "p-[64px_56px_28px_56px]" }`}
    >
      <IconButtonV2
        className='absolute right-7 top-7'
        onClick={props.onClose}
        iconType='CLOSE'
        iconClassName='w-5 h-5'
      />
      <h5 className='font-semibold text-xl leading-[150%] font-poppins'>
        Edit profile
      </h5>
      <div
        className={`mt-6 w-[160px] h-[136px] ${
          default_background_colors[backgroundColor] ?? 'bg-[#D9D9D9]'
        } rounded-lg relative overflow-hidden`}
      >
        {preAvatar && (
          <img
            src={
              [...default_men_avatars, ...default_women_avatars][preAvatar] ??
              preAvatar
            }
            alt='avatar preshow'
            className='w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          />
        )}
      </div>
      <p className='mt-4 font-poppins font-semibold text-sm leading-4'>
        Change your profile image
      </p>
      <label className='cursor-pointer border-[1px] border-odf rounded-lg h-10 px-4 mt-4 flex items-center gap-2 font-semibold font-poppins text-sm'>
        <IconV2 iconType='UPLOAD' /> Upload image
        <input type='file' onChange={changeAvatarHandler} hidden />
      </label>

      <p className='mt-5 font-poppins text-sm leading-4'>
        Add a profile image or choose one of ours
      </p>

      <div className={`mt-6 flex flex-wrap gap-x-3 gap-y-6
        ${ isXs ? "justify-center" : "w-[480px]" }`}>
        {[...default_men_avatars, ...default_women_avatars].map(
          (default_avatar, index) => (
            <img
              key={`default-${
                index < default_men_avatars.length ? 'man' : 'woman'
              }-avatar-${index}`}
              src={default_avatar}
              alt={`default-${index <= 5 ? 'man' : 'woman'}-avatar-${index}`}
              width={70}
              height={70}
              className={`w-[70px] h-[70px] cursor-pointer hover:scale-125 hover:rounded-3xl transition-all duration-300 ${
                avatarImage?.toString() === index.toString()
                  ? 'scale-125 rounded-3xl'
                  : ''
              }`}
              onClick={() => {
                setPreAvatar(default_avatar);
                setAvatarImage(index);
              }}
            />
          )
        )}
      </div>
      <p className='mt-6 font-poppins text-sm'>Choose a background color</p>
        <div className={`
          mt-6 flex gap-3
          ${isXs ? "justify-center flex-wrap" : ""}
        `}>
        {default_background_colors.map((bg_color, index) => (
          <span
            onClick={() => setBackgroundColor(index.toString())}
            key={'default-bg-' + index}
            className={`cursor-pointer hover:scale-110 hover:rounded-2xl transition-all duration-200 min-w-[70px] min-h-[70px] ${bg_color} last:border-[1px] last:border-odf rounded-lg`}
          />
        ))}
      </div>

      <div className={`
        mt-8 w-full grid gap-x-11 gap-y-8
        ${isXs ? "" : "grid-cols-2"}
      `}>
        <LabelWrapperV2 label={'First name'}>
          <InputV2
            name='first_name'
            value={formData.first_name}
            onChange={handleInputChange}
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label={'Last name'}>
          <InputV2
            name='last_name'
            value={formData.last_name}
            onChange={handleInputChange}
          />
        </LabelWrapperV2>
        {/* <div className='col-span-2'>
          <LabelWrapperV2 label={'Choose your role'}>
            <InputV2 name='role' value={formData.Role.name} />
          </LabelWrapperV2>
        </div> */}
        <LabelWrapperV2 label='Country'>
          <CountryInputV2
            icon={<IconV2 iconType={'LOCATION'} iconClassName='w-5 h-5' />}
            value={formData.country}
            name='country'
            onCountryChange={(value: string) =>
              handleManualChange('country', value)
            }
            placeholder='Type a country'
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label='City'>
          <CityInputV2
            icon={<IconV2 iconType={'LOCATION'} iconClassName='w-5 h-5' />}
            value={formData.city}
            country={formData.country}
            handleSelect={(address: string) =>
              handleManualChange('city', address)
            }
            placeholder='Type a city'
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label='Dial code'>
          <DropdownV2
            data={dialCodes}
            onChange={(index) => {
              handleManualChange('dial_code', dialCodes[index]?.value ?? '');
              setSelectedCountry(countryCodes[dialCodes[index]?.id]);
            }}
            placeholder='US +1'
            selectedValue={formData.dial_code}
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label='Phone number'>
          <Input
            ref={phoneInputRef}
            id='phone_number'
            country={selectedCountry as any}
            international
            withCountryCallingCode
            value={formData.phone_number}
            onChange={(value) =>
              handleManualChange('phone_number', value?.toString() ?? '')
            }
            autoComplete='off'
            className='rounded-[8px] bg-lighter-gray w-full text-xs font-inter  h-12 border border-odf  focus:border-odf'
          />
        </LabelWrapperV2>
      </div>
      <LabelWrapperV2 label='Socials' className='mt-10 w-full'>
        <div className='flex flex-col gap-4'>
          <InputV2
            name='linkedin_link'
            value={formData.FreelancerProfileSocialLink.linkedin_link}
            icon={<IconV2 iconType='LINKEDIN' iconClassName='w-5 h-5' />}
            className={`text-xs ${isXs ? "" : "w-[286px]"}}`}
            onChange={(e) =>
              handleChangeInObject(e, 'FreelancerProfileSocialLink')
            }
          />
          <InputV2
            name='github_link'
            value={formData.FreelancerProfileSocialLink.github_link}
            icon={<IconV2 iconType='GITHUB' iconClassName='w-5 h-5' />}
            className={`text-xs ${isXs ? "" : "w-[286px]"}}`}
            onChange={(e) =>
              handleChangeInObject(e, 'FreelancerProfileSocialLink')
            }
          />
          <InputV2
            name='website_link'
            icon={<IconV2 iconType='PORTFOLIO' iconClassName='w-5 h-5' />}
            className={`text-xs ${isXs ? "" : "w-[286px]"}}`}
            value={formData.FreelancerProfileSocialLink.website_link}
            onChange={(e) =>
              handleChangeInObject(e, 'FreelancerProfileSocialLink')
            }
          />
        </div>
      </LabelWrapperV2>
      <Button type='submit' loading={is_busy} className='mt-6 px-0 w-[180px]'>
        Save changes
      </Button>
    </form>
  );
}
