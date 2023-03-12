import { ChangeEvent, FormEventHandler, ReactElement, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

// components
import Heading from 'components/Heading/HeadingV2';
import TextareaV2 from 'components/V2/Textarea/TextareaV2';
import DropdownV2 from 'components/V2/Dropdown/DropdownV2';
import CountryInputV2 from 'components/V2/LocationAutocomplete/CountryInputV2';
import { CityInputV2 } from 'components/V2/LocationAutocomplete/CityInputV2';
import CheckBoxV2 from 'components/V2/Buttons/CheckBoxV2';
import InputV2 from 'components/V2/Input/InputV2';
import Button from 'components/Button/ButtonV2';

// import enums
import enums from 'constants/v2/enums';
import protoHelper from 'helpers/prototype';

// import social icons
import { ReactComponent as LinkedinSvg } from 'assets/V2/svg/linkedin.svg';
import { ReactComponent as WebsiteSvg } from 'assets/V2/svg/website.svg';
import { ReactComponent as TwitterSvg } from 'assets/V2/svg/twitter.svg';
import { ReactComponent as InstagramSvg } from 'assets/V2/svg/instagram.svg';
import { ReactComponent as CloseSvg } from 'assets/V2/svg/close-dark.svg';
import { updateCompanyProfile } from 'redux/slices/companyProfile';
import IconV2 from 'components/V2/Icons';

import { stringNotEmptyOrUndefined } from 'helpers/validations/form';

const EditCompanyInfoFormV2: React.FC<IForm> = (props): ReactElement => {
  const dispatch = useDispatch<AppDispatch>();
  const company_profile: ICompanyProfile = useSelector(
    (root: RootState) => root.companyprofile
  );

  const [preference, setPreference] = useState<ICompanyPreference>(
    company_profile.company
  );
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const submitHandler: FormEventHandler<HTMLFormElement> = async (
    e
  ): Promise<void> => {
    e.preventDefault();

    if (preference.city === '' || preference.city === undefined) {
      setShowErrors(true);
      return;
    }
    const result = await dispatch(updateCompanyProfile(preference));
    result.payload.success &&
      toast.custom(<Toast type="success" message="Successfully updated company profile" />);
    props.onClose();
  };

  const changeHandler = (name: string, value: string | boolean): void => {
    setPreference({ ...preference, [name]: value });
  };

  const socialChangeHandler = (name: string, value: string): void => {
    setPreference({
      ...preference,
      CompanySocialLink: {
        ...preference.CompanySocialLink,
        [name]: value,
      },
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      className='w-full rounded-lg p-[66px_56px_30px_56px] bg-white relative flex flex-col'
    >
      <CloseSvg
        onClick={props.onClose}
        className='absolute right-7 top-7 cursor-pointer'
      />
      <Heading
        variant='h6'
        className='font-semibold leading-[30px] text-center'
      >
        Edit company profile
      </Heading>
      <div className='mt-14'>
        <label className='font-poppins text-xs leading-4 block mb-4'>
          Tell us about your company
        </label>
        <TextareaV2
          placeholder='Description'
          className='text-xs leading-[18px] min-h-[120px]'
          limitText='200 word max'
          value={preference.summary ?? ''}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            changeHandler('summary', e.target.value)
          }
        />
        <div className='mt-8 grid grid-cols-2 gap-x-14 gap-y-9'>
          <div>
            <label className='font-poppins text-xs leading-4 block mb-[14px]'>
              Industry
            </label>
            <DropdownV2
              icon={<IconV2 iconType='COMPANY' iconClassName='w-5 h-5' />}
              data={protoHelper.addIndexArrayElem(enums.industry)}
              selectedValue={preference.industry}
              onChange={(idx: number) =>
                changeHandler('industry', enums.industry[idx])
              }
              placeholder='Select your industry'
            />
          </div>
          <div>
            <label className='font-poppins text-xs leading-4 block mb-[14px]'>
              Company stage
            </label>
            <DropdownV2
              icon={<IconV2 iconType='COMPANY' iconClassName='w-5 h-5' />}
              data={protoHelper.addIndexArrayElem(enums.companyStage)}
              selectedValue={preference.stage}
              onChange={(idx: number) =>
                changeHandler('stage', enums.companyStage[idx])
              }
              placeholder='Choose your company stage'
            />
          </div>
          <div>
            <label className='font-poppins text-xs leading-4 block mb-[14px]'>
              Number of employees
            </label>
            <DropdownV2
              icon={<IconV2 iconType='USER' iconClassName='w-5 h-5' />}
              data={protoHelper.addIndexArrayElem(
                enums.companyNumberOfEmployees
              )}
              selectedValue={preference.number_of_employees}
              onChange={(idx: number) =>
                changeHandler(
                  'number_of_employees',
                  enums.companyNumberOfEmployees[idx]
                )
              }
              placeholder='Choose number of employees'
            />
          </div>
        </div>

        <h6 className='mt-9 font-semibold text-sm leading-4 tracking-[0.25px]'>
          Location
        </h6>
        <div className='mt-[26px] grid grid-cols-2 gap-x-14 gap-y-4'>
          <div>
            <label className='font-poppins text-xs leading-4 block mb-[14px]'>
              Country
            </label>
            <CountryInputV2
              icon={<IconV2 iconType={'LOCATION'} iconClassName='w-5 h-5' />}
              onCountryChange={(value: string) =>
                changeHandler('country', value)
              }
              value={preference.country}
              placeholder='Type a country'
            />
          </div>
          <div>
            <label className='font-poppins text-xs leading-4 block mb-[14px]'>
              City
            </label>
            <CityInputV2
              icon={<IconV2 iconType={'LOCATION'} iconClassName='w-5 h-5' />}
              value={preference.city ?? ''}
              country={preference.country ?? ''}
              handleSelect={(address: string) => changeHandler('city', address)}
              placeholder='Type a city'
              validators={showErrors ? [stringNotEmptyOrUndefined] : []}
            />
          </div>
          <div>
            <CheckBoxV2
              value={''}
              onClick={() =>
                changeHandler('remote_first', !preference.remote_first)
              }
              selected={preference.remote_first}
            >
              <span className='leading-6 text-xs tracking-[-0.25px] font-inter'>
                Remote first company
              </span>
            </CheckBoxV2>
          </div>
        </div>

        <h6 className='mt-7 font-poppins text-xs leading-4 tracking-[0.25px]'>
          Socials
        </h6>
        <div className='mt-4 grid grid-cols-2 gap-x-14'>
          <div className='flex flex-col gap-4'>
            <InputV2
              placeholder='Add your website url'
              icon={<WebsiteSvg className='w-5 h-5' />}
              className='pl-12 text-xs'
              value={preference.website}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                changeHandler('website', e.target.value)
              }
            />
            <InputV2
              placeholder='Add your Linkedin url'
              icon={<LinkedinSvg className='w-5 h-5' />}
              className='pl-12 text-xs'
              value={preference.CompanySocialLink?.linkedin_link}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                socialChangeHandler('linkedin_link', e.target.value)
              }
            />
            <InputV2
              placeholder='Add your twitter url'
              icon={<TwitterSvg className='w-5 h-5' />}
              className='pl-12 text-xs'
              value={preference.CompanySocialLink?.twitter_link}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                socialChangeHandler('twitter_link', e.target.value)
              }
            />
            <InputV2
              placeholder='Add your instagram url'
              icon={<InstagramSvg className='w-5 h-5' />}
              className='pl-12 text-xs'
              value={preference.CompanySocialLink?.instagram_link}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                socialChangeHandler('instagram_link', e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <Button
        loading={company_profile.is_busy}
        type='submit'
        className='mt-9 mx-auto w-[182px]'
      >
        Save changes
      </Button>
    </form>
  );
};

export default EditCompanyInfoFormV2;
