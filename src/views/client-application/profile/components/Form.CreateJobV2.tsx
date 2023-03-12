import { ChangeEvent, ReactElement } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { doJobPosting, updateJobPosting } from "redux/slices/companyJobs";

// components
import Heading from "components/Heading/HeadingV2";
import DropdownV2 from "components/V2/Dropdown/DropdownV2";
import InputWrapperV2 from "./Wrapper.InputV2";
import TextareaV2 from "components/V2/Textarea/TextareaV2";
import Button from "components/Button/ButtonV2";

// import svgs
import { ReactComponent as ExperienceSvg } from "assets/V2/svg/experience.svg";
import { ReactComponent as TimezoneSvg } from "assets/V2/svg/timezone.svg";
import { ReactComponent as LocationSvg } from "assets/V2/svg/location.svg";
import { ReactComponent as WorldSvg } from "assets/V2/svg/website.svg";
import { ReactComponent as UserSvg } from "assets/V2/svg/user.svg";

// import options types
import enums from "constants/v2/enums";
import RateRangeInputV2 from "components/V2/RateRange";
import SkillInputV2 from "views/client-application/components/SkillInputV2";
import JobInput from "views/client-application/components/JobInput";

// prototype helper
import protoHelper from "helpers/prototype";
import objectHelper from "helpers/object";
import IconV2 from "components/V2/Icons";
import useValidateJobPosting from "../hooks/useValidateJobPosting";
import { mixpanel_track } from "helpers/mixpanel";

const { addIndexArrayElem } = protoHelper;
const { safeJsonArray } = objectHelper;

const JobPostFormV2: React.FC<{
  data: IJobPostingV2;
  editType: "EDIT" | "CREATE" | "DELETE";
  onSubmit: (success: boolean) => void;
  onClose: () => void;
}> = (props): ReactElement => {
  const { skills, posting, handleRemoveSkills, changeHandler, skillChangeHandler, diabeldStatus } =
    useValidateJobPosting(props.data);

  const dispatch = useDispatch<AppDispatch>();

  const busy = useSelector((root: RootState) => root.companyjob.busy);
  const companyStore = useSelector((root: RootState) => root.companyprofile);
  const positions = useSelector((root: RootState) => root.prototype.roles).map((elem) => {
    return {
      id: elem.id,
      value: elem.name,
    };
  });

  const submitHandler = async (e): Promise<void> => {
    e.preventDefault();
    if (companyStore.client_id === undefined || companyStore.id === undefined) return;

    const skill_names = protoHelper.getSkillNamesFromIDs(skills, [
      ...safeJsonArray(posting.primary_skills),
      ...safeJsonArray(posting.secondary_skills),
    ]);
    const padyload = {
      ...posting,
      skill_names: String(skill_names),
      company_name: companyStore.company.name ?? "",
      client_id: Number(companyStore?.client_id),
      company_id: Number(companyStore?.id),
    };

    const result = await dispatch(
      props.editType === "CREATE" ? doJobPosting(padyload) : updateJobPosting(padyload),
    );
    if (result.payload.success && props.editType === "CREATE") {
      mixpanel_track("New Job Posting", { ...padyload });
    }
    props.onSubmit(result.payload.success);
  };

  const form_data_lists: IFormDataForJobPosting[] = [
    {
      label: "Open position",
      badgeColor: "pink",
      badgeData: [posting.job_title ?? ""],
      children: (
        <JobInput
          placeholder='Type the position followed by the "Enter"'
          data={positions}
          onAddJob={(value: any) => {
            changeHandler("job_title", value);
          }}
          className="w-full h-12"
        />
      ),
    },
    {
      label: "Compensation range",
      badgeData: [""],
      children: (
        <RateRangeInputV2
          min={posting.hourly_min_rate ?? 0}
          max={posting.hourly_max_rate ?? 0}
          onChange={(name: "min" | "max", value: number) =>
            changeHandler(name === "min" ? "hourly_min_rate" : "hourly_max_rate", value)
          }
        />
      ),
    },
    {
      label: "Term",
      badgeData: posting.term ? [posting.term?.toLocaleLowerCase()] : [],
      children: (
        <>
          <DropdownV2
            icon={<IconV2 iconType="CLOCK" iconClassName="w-5 h-5" />}
            placeholder={"Choose a term"}
            data={addIndexArrayElem(enums.term, true)}
            selectedValue={posting.term?.toLocaleLowerCase()}
            onChange={(idx: number) => changeHandler("term", enums.term[idx])}
          />
        </>
      ),
    },
    {
      label: "Experience level",
      badgeData: [posting.experience_level ?? ""],
      children: (
        <DropdownV2
          icon={<ExperienceSvg className="w-5 h-5" />}
          selectedValue={posting.experience_level?.toLocaleLowerCase()}
          data={addIndexArrayElem(enums.level, true)}
          onChange={(idx: number) => changeHandler("experience_level", enums.level[idx])}
          placeholder={"Level of experience"}
        />
      ),
    },
    {
      label: "Timezone",
      badgeData: [posting.timezone ?? ""],
      children: (
        <DropdownV2
          icon={<TimezoneSvg className="w-5 h-5" />}
          data={addIndexArrayElem(enums.timezone)}
          selectedValue={posting.timezone}
          onChange={(idx: number) => changeHandler("timezone", enums.timezone[idx])}
          placeholder={"Choose a timezone"}
        />
      ),
    },
    {
      label: "Location",
      badgeData: [posting.location?.toLowerCase() ?? ""],
      children: (
        <DropdownV2
          icon={<LocationSvg className="w-5 h-5" />}
          data={addIndexArrayElem(enums.location, true)}
          selectedValue={posting.location?.toLowerCase()}
          onChange={(idx: number) => changeHandler("location", enums.location[idx])}
          placeholder={"Choose location"}
        />
      ),
    },
    {
      label: "Visa Sponsor",
      badgeData: [posting.visa_sponsor ? "Yes" : posting.visa_sponsor === false ? "None" : ""],
      children: (
        <DropdownV2
          icon={<WorldSvg className="w-5 h-5" />}
          data={[
            { id: 0, value: "Yes" },
            { id: 1, value: "None" },
          ]}
          selectedValue={
            posting.visa_sponsor ? "Yes" : posting.visa_sponsor === false ? "None" : undefined
          }
          onChange={(idx: number) => changeHandler("visa_sponsor", idx === 0)}
          placeholder={"Visa sponsor"}
        />
      ),
    },
    {
      label: "Number of hires",
      badgeData: [posting.number_of_hires ?? ""],
      badgeColor: "orange",
      badgeClass: "w-fit px-3 h-8",
      children: (
        <DropdownV2
          icon={<UserSvg className="w-5 h-5" />}
          data={addIndexArrayElem(enums.numberOfHires)}
          selectedValue={posting.number_of_hires}
          onChange={(idx: number) => changeHandler("number_of_hires", enums.numberOfHires[idx])}
          placeholder={"How many people are you hiring"}
        />
      ),
    },

    {
      label: "Primary Skills (required)",
      badgeColor: "pink",
      badgeStar: true,
      minusInBadge: true,
      badgeData: protoHelper.getSkillNamesFromIDs(skills, safeJsonArray(posting.primary_skills)),
      onBadgeClick: (skill) => {
        handleRemoveSkills("primary_skills", skill);
      },
      children: (
        <SkillInputV2
          placeholder='Type the skill followed by the "Enter" to add'
          onAddSkill={(idx: any) => {
            skillChangeHandler("primary_skills", idx);
          }}
          className="w-full h-12"
        />
      ),
    },
    {
      label: "Secondary Skills (nice to have)",
      badgeData: protoHelper.getSkillNamesFromIDs(skills, safeJsonArray(posting.secondary_skills)),
      minusInBadge: true,
      onBadgeClick: (skill) => {
        {
          console.log("remove handler trigger");
          handleRemoveSkills("secondary_skills", skill);
        }
      },
      children: (
        <SkillInputV2
          placeholder='Type the skill followed by the "Enter" to add'
          onAddSkill={(idx: any) => skillChangeHandler("secondary_skills", idx)}
          className="w-full h-12"
        />
      ),
    },
    {
      label: "Job description",
      badgeData: [posting.description ?? ""],
      noBadge: true,
      wrapperClass: "col-span-2",
      children: (
        <TextareaV2
          value={posting.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            changeHandler("description", e.target.value)
          }
          placeholder="Description"
          className="text-xs leading-[18px] min-h-[130px]"
          limitText="200 word max"
        />
      ),
    },
    {
      label: "Minimum requirements",
      badgeData: [posting.looking_for_description ?? ""],
      noBadge: true,
      wrapperClass: "col-span-2",
      children: (
        <TextareaV2
          value={posting.looking_for_description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            changeHandler("looking_for_description", e.target.value)
          }
          placeholder="Description"
          className="text-xs leading-[18px] min-h-[130px]"
          limitText="100 word max"
        />
      ),
    },
    {
      label: "Job duties",
      badgeData: [],
      noBadge: true,
      wrapperClass: "col-span-2",
      children: (
        <TextareaV2
          id="duties"
          value={posting.duties}
          className="min-h-[160px] text-xs"
          limitText="200 word max"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            changeHandler("duties", e.target.value)
          }
          placeholder="Description"
        />
      ),
    },
    // {
    //   label: 'Hiring status (optional)',
    //   noBadge: true,
    //   badgeData: [],
    //   children: (
    //     <DropdownV2
    //       directionUp
    //       data={addIndexArrayElem(enums.hiringStatus, true)}
    //       selectedIndex={posting.actively_hiring ? 0 : 1}
    //       onChange={(idx: number) =>
    //         changeHandler('actively_hiring', idx === 0)
    //       }
    //       placeholder={'Choose a hiring status'}
    //     />
    //   ),
    // },
  ];

  return (
    <div className="w-full rounded-lg p-[64px_56px_24px_56px] bg-white relative">
      <div
        onClick={() => {
          props.onClose();
        }}
        className="p-0 absolute top-7 right-7"
      >
        <IconV2 iconType={"CLOSE"} iconClassName="w-5 h-5" />
      </div>

      <Heading variant="h6" className="font-semibold leading-[30px] text-center">
        {props.editType === "CREATE" ? "Create job post" : "Edit job post"}
      </Heading>
      <div className="mt-[76px] grid grid-cols-2 gap-x-[28px] gap-y-6">
        {form_data_lists.map((formData: IFormDataForJobPosting, index) => (
          <InputWrapperV2
            key={formData.label + index}
            label={formData.label}
            wrapperClass={formData.wrapperClass ?? "w-full"}
            noBadge={formData.noBadge}
            badgeColor={formData.badgeColor ?? "blue"}
            badgeStar={formData.badgeStar}
            badgeClass={formData.badgeClass ?? "w-fit px-2 h-8"}
            badgeTexts={formData.badgeData}
            badgeWrapperAddClass="mt-[10px] capitalize"
            minusInBadge={formData.minusInBadge}
            onBadgeClick={formData.onBadgeClick}
          >
            {formData.children}
          </InputWrapperV2>
        ))}
      </div>
      <div className="action-button flex mt-14 mb-7">
        <Button
          disabled={diabeldStatus}
          loading={busy}
          onClick={submitHandler}
          className="mx-auto min-w-[190px]"
        >
          {props.editType === "CREATE" ? "Create job" : "Save changes"}
        </Button>
      </div>
    </div>
  );
};

export default JobPostFormV2;
