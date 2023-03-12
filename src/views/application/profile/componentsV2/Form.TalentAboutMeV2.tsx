import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { updateTalentProfile, updateTalentSkills } from 'redux/slices/profile';

import Button from 'components/Button/ButtonV2';
import Heading from 'components/Heading/HeadingV2';
import DropdownV2 from 'components/V2/Dropdown/DropdownV2';
import InputV2 from 'components/V2/Input/InputV2';
import TextareaV2 from 'components/V2/Textarea/TextareaV2';
import IconV2 from 'components/V2/Icons';
import IconButtonV2 from 'components/V2/IconButton';
import MultiSelectDropdownV2 from 'components/V2/MultiSelectDropdown/MultiSelectDropdownV2';

import SkillInputV2 from 'views/client-application/components/SkillInputV2';
import LabelWrapperV2 from './Wrapper.LabelV2';

import enums from 'constants/v2/enums';

import protoHelper from 'helpers/prototype';
import RoleInputV2 from 'views/application/components/RoleInputV2';

import useProfileForm from '../hooks/useProfileForm';
import useWindowDimensions from 'hooks/utils/useWindowDimensions';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const { addIndexArrayElem } = protoHelper;

export default function TalentAboutMeFormV2(props: {
  profile: ITalentProfileV2;
  onClose: () => void;
}): ReactElement {
  const { isMobile, isXs } = useWindowDimensions();
  const dispatch = useDispatch<AppDispatch>();
  const is_busy = useSelector((root: RootState) => root.profile.is_busy);

  const {
    formData,
    handleInputChange,
    handleManualChange,
    handleRemoveSkills,
    handleRoleChange,
    skillChangeHandler,
  } = useProfileForm(props.profile);

  const submitHandler = async () => {
    try {
      let updated_skills;
      if (props.profile.skills.length !== formData.skills.length) {
        try {
          const result = await dispatch(
            updateTalentSkills({
              freelancer_id: formData.freelancer_id,
              skills: formData.skills.map((skill) => skill.freelancer_skill),
            })
          );
          updated_skills = result.payload.data.skills;
        } catch (e) {
          toast.custom(<Toast type="error" message="There was an error while updating skills" />);
          console.log('err: ', e);
        }
      }

      await dispatch(
        updateTalentProfile({
          ...formData,
          skills:
            updated_skills !== undefined ? updated_skills : formData.skills,
        })
      );
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error updating profile" />);
    }

    toast.custom(<Toast type="success" message="Successfully Updated" />);
    props.onClose();
  };

  return (
    <div className={`
      flex flex-col items-center w-full bg-white rounded-lg shadow-card relatvie
      ${isMobile ? "p-[64px_25px_28px_25px]" : "p-[64px_56px_28px_56px]"}
    `}>
      <IconButtonV2
        onClick={props.onClose}
        className='absolute top-8 right-8'
        iconType='CLOSE'
      />
      <Heading variant='h6' className='font-semibold text-xl leading-[150%]'>
        Edit about me
      </Heading>
      <LabelWrapperV2 className='mt-14 w-full' label={'Edit about me'}>
        <TextareaV2
          name='summary'
          onChange={handleInputChange}
          value={formData?.summary}
          className='text-xs h-[136px]'
          placeholder='Description'
          limitText='100 word max'
          disabled={is_busy}
        />
      </LabelWrapperV2>
      <div className={`
        mt-[72px] w-full grid gap-x-10 gap-y-4
        ${isXs ? "" : "grid-cols-2"}
      `}>
        <LabelWrapperV2
          key={Math.random() * 10}
          label='Choose your role'
          badgeColor='pink'
          badgeTexts={[formData?.Role?.name]}
        >
          <RoleInputV2
            className='text-xs'
            name='name'
            value={formData?.Role?.name}
            onRoleChange={handleRoleChange}
            disabled={is_busy}
          />
        </LabelWrapperV2>
        <LabelWrapperV2 label='Hourly rate' badgeColor='pink'>
          <InputV2
            name='hourly_rate'
            value={formData?.hourly_rate}
            icon={<IconV2 iconType='RATE' />}
            onChange={handleInputChange}
            disabled={is_busy}
          />
        </LabelWrapperV2>
        <LabelWrapperV2
          label='Experience level'
          badgeTexts={[formData?.level_of_experience]}
        >
          <DropdownV2
            icon={<IconV2 iconType={'EDUCATION'} iconClassName='w-5 h-5' />}
            data={addIndexArrayElem(enums.level, true)}
            selectedValue={formData?.level_of_experience.toLocaleLowerCase()}
            onChange={(idx: number) =>
              handleManualChange('level_of_experience', enums.level[idx])
            }
            placeholder={''}
            disabled={is_busy}
          />
        </LabelWrapperV2>
        <LabelWrapperV2
          label='Years of experience'
          badgeTexts={[formData.years_of_experience + ' years']}
        >
          <DropdownV2
            data={addIndexArrayElem(enums.yearsOfExperience, true)}
            selectedValue={formData?.years_of_experience.toLowerCase()}
            onChange={(idx: number) =>
              handleManualChange(
                'years_of_experience',
                enums.yearsOfExperience[idx]
              )
            }
            placeholder={''}
            suffixValue=' years'
            disabled={is_busy}
          />
        </LabelWrapperV2>
        <LabelWrapperV2
          label='Location open to'
          badgeColor='orange'
          badgeTexts={JSON.parse(formData?.roles_open_to ?? '[]').map(
            (elem: IData) => elem.value.toLocaleString().toLowerCase()
          )}
        >
          <MultiSelectDropdownV2
            icon={<IconV2 iconType={'LOCATION'} />}
            buttonClassName='w-full h-12 font-inter text-xs'
            buttonText={isXs ? "" : "What locations are you open to?"}
            listClassName='capitalize w-full'
            listData={addIndexArrayElem(enums.location, true)}
            selectedData={JSON.parse(
              formData.roles_open_to === ''
                ? '[]'
                : formData?.roles_open_to ?? '[]'
            )}
            onChange={(newArray: IData[]) => {
              const capitalized = newArray.map((elem: IData): IData => {
                return {
                  index: elem.index,
                  value: elem.value.toLocaleString().toUpperCase(),
                };
              });
              handleManualChange('roles_open_to', JSON.stringify(capitalized));
            }}
          />
        </LabelWrapperV2>
        <LabelWrapperV2
          label='Term open to'
          badgeColor='orange'
          badgeTexts={JSON.parse(formData?.terms_open_to ?? '[]').map(
            (elem: IData) => elem.value.toLocaleString().toLowerCase()
          )}
        >
          <MultiSelectDropdownV2
            listClassName='capitalize w-full'
            icon={<IconV2 iconType={'CLOCK'} />}
            buttonClassName='w-full h-12 font-inter text-xs'
            buttonText={isXs ? "" : "What terms are you open to?"}
            listData={addIndexArrayElem(enums.term, true)}
            selectedData={JSON.parse(formData?.terms_open_to ?? '[]').map(
              (elem: IData): IData => {
                return {
                  index: elem.index,
                  value: elem.value.toLocaleString().toLowerCase(),
                };
              }
            )}
            onChange={(newArray: IData[]) => {
              const capitalized = newArray.map((elem: IData): IData => {
                return {
                  index: elem.index,
                  value: elem.value.toLocaleString().toUpperCase(),
                };
              });
              handleManualChange('terms_open_to', JSON.stringify(capitalized));
            }}
          />
        </LabelWrapperV2>
        <LabelWrapperV2
          starInBadge
          smallBadge
          minusInBadge
          badgeColor='pink'
          badgeTexts={formData.skills
            .filter((elem) => elem.freelancer_skill.is_primary)
            .map((elem: ISkillInProfile) => elem.name)}
          label={'Primary Skills (up to 5)'}
          onBadgeClick={(skillToRemove: string) =>
            handleRemoveSkills('primary', skillToRemove)
          }
        >
          <SkillInputV2
            placeholder='Type the skill followed by the "Enter" to add'
            onAddSkill={(idx: number) => skillChangeHandler('skills', idx)}
            disabled={is_busy}
            directionUp
          />
        </LabelWrapperV2>
        <LabelWrapperV2
          smallBadge
          minusInBadge
          badgeTexts={formData.skills
            .filter((elem) => !elem.freelancer_skill.is_primary)
            .map((elem: ISkillInProfile) => elem.name)}
          label={'Secondary Skills (up to 5)'}
          onBadgeClick={(skillToRemove: string) =>
            handleRemoveSkills('secondary', skillToRemove)
          }
        >
          <SkillInputV2
            placeholder='Type the skill followed by the "Enter" to add'
            onAddSkill={(idx: number) =>
              skillChangeHandler('secondary_skills', idx)
            }
            disabled={is_busy}
            directionUp
          />
        </LabelWrapperV2>
      </div>
      <Button
        loading={is_busy}
        onClick={submitHandler}
        className='h-10 w-[180px] px-0 mt-9'
      >
        Save changes
      </Button>
    </div>
  );
}
