// @ts-nocheck
import React, { useMemo, useState } from "react";

import { useForm, useWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import { setOnboardFields } from "redux/slices/talentOnboard";
import OnboardAPI from "network/onboarding";

import { FormControl, InputContainer, Label, OnboardHeading } from "views/onboardingV2/components";
import { FormInputV2 } from "components/V2/Input/FormInputV2";
import Button from "components/Button/ButtonV2";

import { OnboardComponentProps } from "../Onboard.types";
import utils from "utils/utils";
import { isEmpty } from "@aws-amplify/core";
import TypographyV2 from "components/Typography/TypographyV2";
import TipsIcon from "assets/svg/application/tips.svg";
import Tips from "components/Tips";
import { skillTip } from "./AboutMyself.data";
import { FormSearchSelect } from "components/V2/SearchSelect/FormSearchSelect";
import { FormDragDropFile } from "components/V2/DragDropFile/FormDragDropFile";
import FORMATS from "constants/fileFormats";
import { FormDialCodeInput } from "components/V2/DialCodeInput/FormDialCodeInput";
import { FormPhoneInput } from "components/V2/PhoneInput/FormPhoneInput";
import { FormSkillInputV2 } from "views/client-application/components/SkillInputV2";
import ReferralAlert from "views/authentication/component/ReferralAlert";
import Toast from "components/Toast/Toast";
import toast from "react-hot-toast";
import { getItem } from "utils/storageUtils";

const AboutMySelf = (props: OnboardComponentProps) => {
  const dispatch = useAppDispatch();
  const onboard = useAppSelector((root) => root.talentOnboard);
  const prototype = useAppSelector((root) => root.prototype);
  const [submitting, setSubmitting] = useState<boolean>(false);

  // Get all the available roles and memorize them
  const rolesData = useMemo(() => {
    if (!prototype.data) return [];
    const allRoles = Object.values(prototype.data).reduce(
      (accum, current) => accum.concat(current.roles),
      [],
    );
    return allRoles.map((item, _) => ({
      id: item.role_id,
      value: item.name,
    }));
  }, [prototype]);

  const defaultSkills = prototype.skills;
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: onboard.first_name,
      lastName: onboard.last_name,
      phoneNumber: onboard.phone_number,
      dialCode: onboard.dial_code,
      role: onboard.role,
      resume: onboard.resume,
      primarySkills: onboard.primary_skills,
      secondarySkills: onboard.secondary_skills,
    },
  });
  const selectedPrimarySkills = useWatch({ control, name: "primarySkills" });
  const selectedSecondarySkills = useWatch({ control, name: "secondarySkills" });
  const dialCode = useWatch({ control, name: "dialCode" });

  // Calculate the available skills based on the selected ones
  const selectableSkills = defaultSkills
    .filter((skill) => !selectedSecondarySkills.find((s) => s === skill.id))
    .filter((skill) => !selectedPrimarySkills.find((s) => s === skill.id));
  const atLeastOne = (skills) => skills.length > 0;

  // handle formData
  const onSubmit = async (data) => {
    setSubmitting(true);
    const stepData = {
      first_name: data.firstName,
      last_name: data.lastName,
      dial_code: data.dialCode,
      phone_number: data.phoneNumber,
      role: data.role,
      resume: data.resume,
      primary_skills: data.primarySkills,
      secondary_skills: data.secondarySkills,
    };

    // First update the database
    try {
      const email_id = getItem("email");
      const dataAPI = { ...stepData, dial_code: stepData.dial_code.value, email_id };
      const response = await OnboardAPI.talentStep1(JSON.stringify(dataAPI));
      if (!response.success) throw response.message;
    } catch (err) {
      console.error("Step 1 failed: ", err);
      setSubmitting(false);
      toast.custom(<Toast type="error" message="Error occured while submitting step 1 data" />);
      return;
    }

    // Update locally
    dispatch(setOnboardFields(stepData));

    setSubmitting(false);
    props.goNext();
  };

  return (
    <>
      <ReferralAlert />
      <form className="mt-10 md:mt-14" onSubmit={handleSubmit(onSubmit)}>
        {/**
         * ---------------- Basic Info --------------------
         */}
        <InputContainer>
          <FormControl className="md:!w-full md:mr-[72px]">
            <Label htmlFor="firstName">First name</Label>
            <FormInputV2
              name="firstName"
              control={control}
              rules={{ required: true }}
              className="w-full h-12 text-xs font-inter"
              placeholder="First name"
              id="firstName"
            />
            {errors?.firstName && (
              <span className="font-inter text-xs text-red">First name is required</span>
            )}
          </FormControl>
          <FormControl className="md:!w-full">
            <Label htmlFor="lastName" className="mt-7 md:mt-0">
              Last name
            </Label>
            <FormInputV2
              name="lastName"
              control={control}
              rules={{
                required: true,
              }}
              className="w-full h-12 text-xs font-inter"
              placeholder="Last name"
              id="lastName"
            />
            {errors?.lastName && (
              <span className="font-inter text-xs text-red">Last name is required</span>
            )}
          </FormControl>
        </InputContainer>
        <InputContainer className="mt-7">
          <FormControl className="md:!w-full md:mr-[72px]">
            <Label>Dial code</Label>
            <FormDialCodeInput
              name="dialCode"
              control={control}
              rules={{ required: true }}
              placeholder="US +1"
            />
            {errors?.dialCode && (
              <span className="font-inter text-xs text-red">Dial code is required</span>
            )}
          </FormControl>
          <FormControl className="md:!w-full">
            <Label className="mt-7 md:mt-0">Phone number</Label>
            <FormPhoneInput
              name="phoneNumber"
              prefix={dialCode?.code}
              control={control}
              rules={{
                required: true,
                validate: () => {
                  return utils.clientPhoneRegex.test(getValues("phoneNumber"));
                },
              }}
              className="w-full h-12 text-xs font-inter"
              placeholder="+584140192486"
            />
            {errors?.phoneNumber && (
              <span className="font-inter text-xs text-red">
                {String(errors?.phoneNumber?.type) === "required"
                  ? "Phone number is required"
                  : "Phone number format is invalid"}
              </span>
            )}
          </FormControl>
        </InputContainer>

        {/* ---- Expertirse ---- */}
        <TypographyV2
          variant="subtitle1"
          className="font-poppins font-semibold text-[24px]  text-left leading-relaxed mt-[30px] md:mt-[60px]"
        >
          Great! What is your expertise?
        </TypographyV2>

        <OnboardHeading className="mt-[30px] md:mt-[10px]">
          Search and select your position
        </OnboardHeading>

        <InputContainer className="mt-2">
          <div className="w-full">
            <FormSearchSelect
              name={"role"}
              control={control}
              rules={{ required: true }}
              data={rolesData}
              placeholder="Search your position"
              withBadge
            />
            {errors && errors.role && (
              <span className="font-inter text-xs text-red">Choose your position</span>
            )}
          </div>
        </InputContainer>

        <OnboardHeading className="mt-[30px]">Upload your resume (optional)</OnboardHeading>
        <InputContainer className="mt-2">
          <FormDragDropFile
            name="resume"
            control={control}
            title="Resume"
            preferredFormats={["pdf"]}
            acceptedFormats={FORMATS.resume}
          />
        </InputContainer>

        <div className="mt-[70px] flex items-center">
          <OnboardHeading className="mr-[20px]">Select your skills</OnboardHeading>
          <Tips IconSrc={TipsIcon} Text={skillTip} />
        </div>

        <InputContainer className="mt-6">
          <FormControl className="mt-4 md:mt-0 md:!w-full md:mr-[72px]">
            <FormSkillInputV2
              name="primarySkills"
              buttonClassName="w-full h-12 font-inter text-xs"
              control={control}
              rules={{ validate: atLeastOne }}
              skillData={[...selectableSkills]}
              labelText="Primary skills (multi-select up to 5)"
              isPrimary
            />
            {errors && errors.primarySkills && (
              <span className="font-inter text-xs text-red">Select primary skills up to 5</span>
            )}
          </FormControl>
          <FormControl className="mt-4 md:mt-0 md:!w-full">
            <FormSkillInputV2
              name="secondarySkills"
              buttonClassName="w-full h-12 font-inter text-xs"
              control={control}
              rules={{ validate: atLeastOne }}
              skillData={[...selectableSkills]}
              labelText="Secondary skills (multi-select up to 5)"
              isPrimary={false}
            />
            {errors && errors.secondarySkills && (
              <span className="font-inter text-xs text-red">Select secondary skills up to 5</span>
            )}
          </FormControl>
        </InputContainer>

        {/**
         * ---------------- Submit --------------------
         */}
        <div className="flex w-full mt-[80px] md:mt-10">
          <Button
            className="ml-auto w-full md:w-auto md:mb-[30vh]"
            type="submit"
            loading={submitting}
            disabled={!isEmpty(errors)}
          >
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

export default AboutMySelf;
