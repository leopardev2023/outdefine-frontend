import { ReactElement } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import {
  createProfileExperienceBatch,
  updateProfileExperienceBatch,
} from 'redux/slices/profile';

import Heading from 'components/Heading/HeadingV2';
import InputV2 from 'components/V2/Input/InputV2';
import DropdownV2 from 'components/V2/Dropdown/DropdownV2';
import ListTextareaV2 from 'components/V2/ListTextarea';
import Button from 'components/Button/ButtonV2';
import IconV2 from 'components/V2/Icons';

import LabelWrapperV2 from './Wrapper.LabelV2';

import useExperienceForm from '../hooks/useNormalForm';

import protoHelper from 'helpers/prototype';
import enums from 'constants/v2/enums';
import MonthPickerV2 from 'components/V2/MonthPicker';
import objectHelper from 'helpers/object';
const { addIndexArrayElem } = protoHelper;
import useWindowDimensions from 'hooks/utils/useWindowDimensions';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const headings = {
  CREATE: 'Add a experience',
  EDIT: 'Edit experience',
};

const initialExp: ITalentExperience = {
  company_name: '',
  start_date: new Date(),
  end_date: new Date(),
  position: '',
  term: '',
  summary: '[]',
};

export default function ExperienceFormV2(props: IExperienceForm): ReactElement {
  const { isXs } = useWindowDimensions();
  const dispatch = useDispatch<AppDispatch>();
  const is_busy = useSelector((root: RootState) => root.profile.is_busy);
  const email_id = useSelector((root: RootState) => root.profile.User.email_id);

  const { formData, handleInputChange, handleManualChange } = useExperienceForm(
    props.formType === 'CREATE' ? initialExp : props.experience
  );

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (props.formType === 'CREATE') {
      try {
        await dispatch(
          createProfileExperienceBatch({ email_id: email_id, data: [formData] })
        );
        toast.custom(<Toast type="success" message="Successfully created a new experience" />);
      } catch (e) {
        toast.custom(<Toast type="error" message="There was an error while creating a new experience" />);
      }
      props.onClose();
      return;
    }

    try {
      await dispatch(updateProfileExperienceBatch([formData]));
      toast.custom(<Toast type="success" message="Successfully updated an experience" />);
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error while updatig an experience" />);
    }
    props.onClose();
  };

  return (
    <form
      noValidate
      autoComplete='off'
      onSubmit={submitHandler}
      className={`
        w-full flex flex-col items-center bg-white rounded-lg relative
        ${isXs ? "p-[64px_25px_28px_25px]" : "p-[64px_56px_28px_56px]"}
      `}
    >
      <button onClick={props.onClose} className='absolute top-7 right-7'>
        <IconV2 iconType='CLOSE' />
      </button>
      <Heading variant='h6' className='font-semibold text-xl leading-[150%]'>
        {headings[props.formType]}
      </Heading>
      <div className={
        `grid mt-12 w-full gap-x-10 gap-y-7
        ${isXs ? "" : "grid-cols-2" }`}>
        <LabelWrapperV2 label='Company name'>
          <InputV2
            name='company_name'
            value={formData.company_name}
            onChange={handleInputChange}
            disabled={is_busy}
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label='Your position'>
          <InputV2
            name='position'
            value={formData.position}
            onChange={handleInputChange}
            disabled={is_busy}
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label='Term'>
          <DropdownV2
            icon={<IconV2 iconType='CLOCK' />}
            data={addIndexArrayElem(enums.term, true)}
            selectedValue={
              formData.term !== ''
                ? formData?.term?.toLocaleLowerCase()
                : undefined
            }
            onChange={(idx: number) =>
              handleManualChange('term', enums.term[idx])
            }
            placeholder={'Select your term'}
          />
        </LabelWrapperV2>
      </div>
      <div className={
        `mt-6 w-full grid gap-x-10 gap-y-6
        ${isXs ? "" : "grid-cols-2" }`}>
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
        <LabelWrapperV2 className='col-span-2' label='Duties completed'>
          <ListTextareaV2
            className='h-[200px] text-xs'
            limitText='100 word max'
            id={'experience duties'}
            lists={objectHelper.safeJsonArray(formData.summary)}
            onChange={(new_lists: string[]) =>
              handleManualChange('summary', JSON.stringify(new_lists))
            }
            disabled={is_busy}
          />
        </LabelWrapperV2>
      </div>
      <div className='mt-9 flex gap-6'>
        <Button type='submit' loading={is_busy} className='h-10 px-0 w-[180px]'>
          {props.formType === 'CREATE'
            ? 'Add experience'
            : props.formType === 'EDIT'
            ? 'Save changes'
            : ''}
        </Button>
      </div>
    </form>
  );
}
