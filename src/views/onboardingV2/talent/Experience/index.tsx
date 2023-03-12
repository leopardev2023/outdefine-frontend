import React, { useState } from "react";
import { FormControl, InputContainer, Label, OnboardHeading } from "views/onboardingV2/components";
import OnboardAPI from "network/onboarding";
import { FormDropdownV2 } from "components/V2/Dropdown/FormDropdownV2";
import { useForm, Controller } from "react-hook-form";
import Button from "components/Button/ButtonV2";
import { OnboardComponentProps } from "../Onboard.types";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import { LevelOfExperience, YearOfExperience } from "./Experience.data";
import InputV2 from "components/V2/Input/InputV2";
import IconV2 from "components/V2/Icons/IconV2";
import { setOnboardFields } from "redux/slices/talentOnboard";
import { isEmpty } from "@aws-amplify/core";
import ReferralAlert from "views/authentication/component/ReferralAlert";
import { getItem } from "utils/storageUtils";
import Toast from "components/Toast/Toast";
import toast from "react-hot-toast";

const blueBadgeClass = {
  addClass: "text-xs font-inter px-3 py-2 w-fit mt-2",
};

const Experience = (props: OnboardComponentProps) => {
  const dispatch = useAppDispatch();
  const onboard = useAppSelector((root) => root.talentOnboard);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      yearsOfExperience: onboard.years_of_experience,
      levelOfExperience: onboard.level_of_experience,
      hourlyRate: onboard.hourly_rate,
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    const { yearsOfExperience, levelOfExperience, hourlyRate } = data;
    const stepData = {
      years_of_experience: yearsOfExperience,
      level_of_experience: levelOfExperience,
      hourly_rate: hourlyRate,
    };

    // First update the database
    try {
      const email_id = getItem("email");
      const dataAPI = {
        ...stepData,
        email_id,
        years_of_experience: YearOfExperience[yearsOfExperience].value,
        level_of_experience: LevelOfExperience[levelOfExperience].value,

      };
      const response = await OnboardAPI.talentStep2(JSON.stringify(dataAPI));
      if (!response.success) throw response.message;
    } catch (err) {
      console.error("Step 2 failed: ", err);
      setSubmitting(false);
      toast.custom(<Toast type="error" message="Error occured while submitting step 2 data" />);
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
      <form className="mt-3 md:mt-14" onSubmit={handleSubmit(onSubmit)}>
        {/**
         * ---------------- Years of Experience --------------------
         */}
        <OnboardHeading className="mt-11">How many years of experience do you have?</OnboardHeading>
        <InputContainer className="mt-6">
          <FormControl>
            <Label htmlFor={"yearsOfExperience"}>Experience</Label>
            <FormDropdownV2
              name={"yearsOfExperience"}
              control={control}
              rules={{ required: true }}
              data={YearOfExperience}
              placeholder="Select years of experience"
              withBadge
              badgeClass={blueBadgeClass.addClass}
              normalCase
            />
            {errors && errors.yearsOfExperience && (
              <span className="font-inter text-xs text-red">Select years of experience</span>
            )}
          </FormControl>
        </InputContainer>
        {/**
         * ---------------- Choose your experience level  --------------------
         */}
        <OnboardHeading className="mt-14 md:mt-[75px]">Choose your experience level</OnboardHeading>
        <InputContainer className="mt-6">
          <FormControl>
            <Label htmlFor={"levelOfExperience"}>Experience level</Label>
            <FormDropdownV2
              name={"levelOfExperience"}
              control={control}
              rules={{ required: true }}
              data={LevelOfExperience}
              placeholder="Select experience level"
              withBadge
              badgeClass={blueBadgeClass.addClass}
              normalCase
            />
            {errors && errors.levelOfExperience && (
              <span className="font-inter text-xs text-red">Select experience level</span>
            )}
          </FormControl>
        </InputContainer>
        {/**
         * --------------- What would you like your rate to be?  --------------------
         */}
        <OnboardHeading className="mt-[66px]">What would you like your rate to be?</OnboardHeading>
        <InputContainer className="mt-6">
          <FormControl>
            <Label htmlFor={"hourlyRate"}>Hourly rate</Label>
            <Controller
              name="hourlyRate"
              control={control}
              rules={{
                required: true,
                validate: () => {
                  const val = getValues("hourlyRate");
                  return val > 0 && val <= 200;
                },
              }}
              render={({ field: { value, onChange } }) => (
                <div className="relative">
                  <InputV2
                    icon={<IconV2 iconType="DOLLAR-CIRCLE" iconClassName="w-5 h-5" />}
                    type="number"
                    onChange={onChange}
                    value={value}
                    autoComplete="off"
                    placeholder="Add your hourly rate"
                  />
                  <span className="absolute right-4 bottom-[12px] font-normal text-sm">/hr</span>
                </div>
              )}
            />
            {errors && errors.hourlyRate && (
              <span className="font-inter text-xs text-red">
                {String(errors?.hourlyRate?.type) === "required"
                  ? "Hourly rate is required"
                  : "Hourly rate is invalid"}
              </span>
            )}
          </FormControl>
        </InputContainer>
        {/**
         * ---------------- Submit --------------------
         */}
        <div className="flex flex-col-reverse md:flex-row w-full justify-between mt-20">
          <Button className="mt-3 md:mt-0" type="button" variant="secondary" onClick={props.goBack}>
            Back
          </Button>
          <Button type="submit" loading={submitting} disabled={!isEmpty(errors)}>
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

export default Experience;
