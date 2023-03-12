import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';

import Button from 'components/Button/ButtonV2';
import Heading from 'components/Heading/HeadingV2';
import CheckBoxV2 from 'components/V2/Buttons/CheckBoxV2';
import DropdownV2 from 'components/V2/Dropdown/DropdownV2';
import InputV2 from 'components/V2/Input/InputV2';
import IconV2 from 'components/V2/Icons';

import LabelWrapperV2 from './Wrapper.LabelV2';

import useEducationForm from '../hooks/useEducationForm';

import protoHelper from 'helpers/prototype';
import enums from 'constants/v2/enums';
import {
  createProfileEducationBatch,
  updateProfileEducationBatch,
} from 'redux/slices/profile';
import MonthPickerV2 from 'components/V2/MonthPicker';
import useWindowDimensions from 'hooks/utils/useWindowDimensions';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const { addIndexArrayElem } = protoHelper;

const initialEdu: ITalentEducation = {
  name: '',
  degree: enums.degree[0],
  start_date: new Date(),
  end_date: new Date(),
  major: '',
  self_taught: false,
};

export default function TalentEducationFormV2(
  props: IEducationForm
): ReactElement {
  const { isXs } = useWindowDimensions();
  const dispatch = useDispatch<AppDispatch>();
  const email_id = useSelector((root: RootState) => root.profile.User.email_id);
  const is_busy = useSelector((root: RootState) => root.profile.is_busy);
  const { formData, handleInputChange, handleManualChange } = useEducationForm(
    props.formType === 'CREATE' ? initialEdu : props.education
  );

  const submitHandler = async (e: any) => {
    // e.preventDefault();
    if (props.formType === 'CREATE') {
      try {
        await dispatch(
          createProfileEducationBatch({ id: email_id, data: [formData] })
        );
        toast.custom(<Toast type="success" message="Successfully created a new education" />);
      } catch (e) {
        toast.custom(<Toast type="error" message="There was an error while creating new education" />);
      }
      props.onClose();
      return;
    }
    try {
      await dispatch(updateProfileEducationBatch([formData]));
      toast.custom(<Toast type="success" message="Successfully updated an education" />);
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error while updating education" />);
    }
    props.onClose();
  };

  return (
    <form
      autoComplete='off'
      noValidate
      className={`
        w-full flex flex-col items-center p-[60px_56px_32px_56px] bg-white rounded-lg relative
        ${isXs ? "p-[64px_25px_28px_25px]" : "p-[60px_56px_32px_56px]"}
      `}
    >
      <button
        type='button'
        onClick={props.onClose}
        className='absolute top-7 right-7'
      >
        <IconV2 iconType='CLOSE' />
      </button>
      <Heading variant='h6' className='font-semibold leading-[150%]'>
        {props.formType === 'CREATE'
          ? 'Add education'
          : props.formType === 'EDIT'
          ? 'Edit education'
          : ''}
      </Heading>
      <div className={`mt-[52px] w-full grid gap-x-10 gap-y-5
        ${isXs ? "" : "grid-cols-2"}`}>
        <LabelWrapperV2 label='Insitituation name'>
          <InputV2
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            placeholder='Insitituation name'
            disabled={formData.self_taught}
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label='Major/ Field'>
          <InputV2
            name='major'
            value={formData.major}
            onChange={handleInputChange}
            placeholder='Area of study'
            disabled={formData.self_taught}
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label='Degree'>
          <DropdownV2
            icon={<IconV2 iconType={'EDUCATION'} />}
            data={addIndexArrayElem(enums.degree, true)}
            selectedValue={
              formData?.degree === ''
                ? enums.degree[0].toLocaleLowerCase()
                : formData?.degree?.toLocaleLowerCase()
            }
            onChange={(idx: number) =>
              handleManualChange('degree', enums.degree[idx])
            }
            placeholder={'Select your degree'}
            disabled={formData.self_taught}
          />
        </LabelWrapperV2>
      </div>
      <div className='mt-7 w-full grid grid-cols-2 gap-x-10'>
        <LabelWrapperV2 label='Start date'>
          <MonthPickerV2
            icon={<IconV2 iconType='DATE' iconClassName='w-4 h-4' />}
            value={{
              month: new Date(formData.start_date).getMonth() + 1,
              year: new Date(formData.start_date).getFullYear(),
            }}
            onChange={(payload) =>
              handleManualChange(
                'start_date',
                new Date(payload.year, payload.month - 1, 1)
              )
            }
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label='End date'>
          <MonthPickerV2
            icon={<IconV2 iconType='DATE' iconClassName='w-4 h-4' />}
            value={{
              month: new Date(formData.end_date).getMonth() + 1,
              year: new Date(formData.end_date).getFullYear(),
            }}
            onChange={(payload) =>
              handleManualChange(
                'end_date',
                new Date(payload.year, payload.month - 1, 1)
              )
            }
          />
        </LabelWrapperV2>
      </div>
      <div
        onClick={() => handleManualChange('self_taught', !formData.self_taught)}
        className='cursor-pointer mt-4 w-full flex items-center gap-3 text-xs leading-6 tracking-[-0.25px]'
      >
        <CheckBoxV2 value={'self-taught'} selected={formData.self_taught}>
          <span className='leading-6'>I am Self-taught</span>
        </CheckBoxV2>
      </div>
      <Button
        loading={is_busy}
        onClick={submitHandler}
        className='mt-5 h-10 px-0 w-[160px]'
      >
        {props.formType === 'CREATE'
          ? 'Add education'
          : props.formType === 'EDIT'
          ? 'Save changes'
          : ''}
      </Button>
    </form>
  );
}
