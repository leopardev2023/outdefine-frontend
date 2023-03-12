import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import OnboardAPI from "network/onboarding";
import { FormControl, InputContainer, Label, OnboardHeading } from "views/onboardingV2/components";
import { FormDropdownV2 } from "components/V2/Dropdown/FormDropdownV2";
import Button from "components/Button/ButtonV2";
import { OnboardComponentProps } from "../Onboard.types";
import { FormCountryInputV2 } from "components/V2/LocationAutocomplete/CountryInputV2";
import { FormCityInputV2 } from "components/V2/LocationAutocomplete/CityInputV2";
import { EnglishProficiency } from "./Location.data";
import { setOnboardFields } from "redux/slices/talentOnboard";
import { isEmpty } from "@aws-amplify/core";
import ReferralAlert from "views/authentication/component/ReferralAlert";
import { getItem } from "utils/storageUtils";
import Toast from "components/Toast/Toast";
import toast from "react-hot-toast";

const blueBadgeClass = {
  addClass: "text-xs font-inter px-3 py-2 w-fit mt-2",
};

const Location = (props: OnboardComponentProps) => {
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const onboard = useAppSelector((root) => root.talentOnboard);
  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      country: onboard.country,
      city: onboard.city,
      englishFluency: onboard.english_fluency,
    },
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    const { country, city, englishFluency } = data;
    const stepData = {
      country,
      city,
      english_fluency: englishFluency,
    };
    console.log(englishFluency);
    // First update the database
    try {
      const email_id = getItem("email");
      const dataAPI = {
        ...stepData,
        email_id,
        english_fluency: EnglishProficiency[englishFluency].value,
      };
      const response = await OnboardAPI.talentStep3(JSON.stringify(dataAPI));
      if (!response.success) throw response.message;
    } catch (err) {
      console.error("Step 3 failed: ", err);
      setSubmitting(false);
      toast.custom(<Toast type="error" message="Error occured while submitting step 3 data" />);
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
      <form className="mt-8 md:mt-[140px]" onSubmit={handleSubmit(onSubmit)}>
        {/**
         * ---------------- location --------------------
         */}
        <OnboardHeading> Where are you located? </OnboardHeading>
        <InputContainer className="mt-5 md:mt-9">
          <FormControl>
            <Label htmlFor="country">Country</Label>
            <FormCountryInputV2
              name="country"
              control={control}
              rules={{ required: true }}
              placeholder="Type a country"
              className="text-xs font-inter"
              withBadge
              badgeClass={blueBadgeClass.addClass}
            />
            {errors?.country && (
              <span className="font-inter text-xs text-red">Country is required</span>
            )}
          </FormControl>
          <FormControl>
            <Label className="mt-10 md:mt-0" htmlFor="city">
              City
            </Label>
            <FormCityInputV2
              name="city"
              control={control}
              rules={{ required: true }}
              placeholder="Type a city"
              inputClass="text-xs font-inter"
              country={watch("country")}
              withBadge
              badgeClass={blueBadgeClass.addClass}
            />
            {errors?.city && <span className="font-inter text-xs text-red">City is required</span>}
          </FormControl>
        </InputContainer>
        {/**
         * ---------------- English Fluency --------------------
         */}
        <OnboardHeading className="mt-[51px]">What is your English fluency level?</OnboardHeading>
        <InputContainer className="mt-6">
          <FormControl>
            <Label htmlFor="city">English fluency</Label>
            <FormDropdownV2
              name={"englishFluency"}
              control={control}
              rules={{ required: true }}
              data={EnglishProficiency}
              placeholder="Select your english fluency"
              withBadge
              badgeClass={blueBadgeClass.addClass}
              normalCase
            />
            {errors && errors.englishFluency && (
              <span className="font-inter text-xs text-red">English fluency is required</span>
            )}
          </FormControl>
        </InputContainer>
        {/**
         * ---------------- Submit --------------------
         */}
        <div className="flex flex-col-reverse md:flex-row w-full justify-between mt-32 md:mt-36">
          <Button className="mt-5 md:mt-0" type="button" variant="secondary" onClick={props.goBack}>
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

export default Location;
