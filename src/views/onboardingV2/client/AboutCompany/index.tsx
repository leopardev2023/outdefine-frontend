import React from "react";
import { useWatch, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import { setOnboardFields } from "redux/slices/clientOnboard";

import {
  CompanyStage,
  Industry,
  NumberOfEmployees,
  NumberOfOpenRoles,
} from "./AboutCompany.data";

import Button from "components/Button/ButtonV2";
import { FormCheckBoxV2 } from "components/V2/Buttons/CheckBoxV2";
import { FormCountryInputV2 } from "components/V2/LocationAutocomplete/CountryInputV2";
import { FormCityInputV2 } from "components/V2/LocationAutocomplete/CityInputV2";
import { FormInputV2 } from "components/V2/Input/FormInputV2";
import { FormDropdownV2 } from "components/V2/Dropdown/FormDropdownV2";
import {
  InputContainer,
  FormControl,
  Label,
  OnboardHeading,
} from "../../components/Onboard.form";

import utils from "utils/utils";

import { OnboardComponentProps } from "../Onboard.types";
import { FormPhoneInput } from "components/V2/PhoneInput/FormPhoneInput";
import { FormDialCodeInput } from "components/V2/DialCodeInput/FormDialCodeInput";

const blueBadgeClass = {
  addClass: "text-xs font-inter px-3 py-2 w-fit mt-2",
};

const AboutCompany = (props: OnboardComponentProps) => {
  const dispatch = useAppDispatch();
  const onboard = useAppSelector((root) => root.clientOnboard);
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
  } = useForm({
    defaultValues: {
      ...onboard,
    },
  });

  const isRemoteFirst = useWatch({
    control,
    name: "isRemoteFirst",
  });
  const dialCode = useWatch({
    control,
    name: "dialCode",
  });

  // handle formData
  const onSubmit = (data) => {
    console.log({ data });
    dispatch(setOnboardFields({ ...data }));
    props.goNext();
  };

  return (
    <form className='mt-10 md:mt-20' onSubmit={handleSubmit(onSubmit)}>
      {/**
       * ---------------- contact info --------------------
       */}
      <InputContainer>
        <FormControl>
          <Label htmlFor='companyName'>Company name</Label>
          <FormInputV2
            name='companyName'
            control={control}
            rules={{ required: true }}
            className='w-full h-12 text-xs font-inter'
            placeholder='Company name'
            id='companyName'
          />
          {errors?.companyName && (
            <span className='font-inter text-xs text-red'>
              Company name is required
            </span>
          )}
        </FormControl>
        <FormControl>
          <Label htmlFor='companyWebsite'>Company website</Label>
          <FormInputV2
            name='companyWebsite'
            control={control}
            rules={{
              required: true,
              validate: () => {
                return utils.urlRegex.test(getValues("companyWebsite"));
              },
            }}
            className='w-full h-12 text-xs font-inter'
            placeholder='Website url'
            id='companyWebsite'
          />
          {errors?.companyWebsite && (
            <span className='font-inter text-xs text-red'>
              {String(errors?.companyWebsite?.type) === "required"
                ? "Website URL is required"
                : "Website URL is invalid (e.g. https://example.com)"}
            </span>
          )}
        </FormControl>
      </InputContainer>
      <InputContainer className='mt-3'>
        <FormControl>
          <Label>Dial code</Label>
          <FormDialCodeInput
            name='dialCode'
            control={control}
            rules={{ required: true }}
            placeholder='US +1'
          />
          {errors?.dialCode && (
            <span className='font-inter text-xs text-red'>
              Dial code is required
            </span>
          )}
        </FormControl>
        <FormControl>
          <Label>Phone number</Label>
          <FormPhoneInput
            name='phoneNumber'
            control={control}
            prefix={dialCode?.code}
            rules={{
              required: true,
              validate: () => {
                return utils.clientPhoneRegex.test(getValues("phoneNumber"));
              },
            }}
            className='w-full h-12 text-xs font-inter'
            placeholder='+584140192486'
          />
          {errors?.phoneNumber && (
            <span className='font-inter text-xs text-red'>
              {String(errors?.phoneNumber?.type) === "required"
                ? "Phone number is required"
                : "Phone number format is invalid"}
            </span>
          )}
        </FormControl>
      </InputContainer>

      {/**
       * ---------------- main info --------------------
       */}
      <OnboardHeading className='mt-9'>Company info</OnboardHeading>
      <InputContainer className='mt-9'>
        <FormControl>
          <Label>Industry</Label>
          <FormDropdownV2
            name='industry'
            control={control}
            rules={{ required: true }}
            data={Industry}
            placeholder='Select your industry'
            withBadge
            normalCase
            badgeClass={blueBadgeClass.addClass}
          />
          {errors?.industry && (
            <span className='font-inter text-xs text-red'>
              Industry is required
            </span>
          )}
        </FormControl>
        <FormControl>
          <Label>Number of employees</Label>
          <FormDropdownV2
            name='numberOfEmployees'
            control={control}
            rules={{ required: true }}
            data={NumberOfEmployees}
            placeholder='Select number of employees'
            withBadge
            normalCase
            badgeClass={blueBadgeClass.addClass}
          />
          {errors?.numberOfEmployees && (
            <span className='font-inter text-xs text-red'>
              Number of employees is required
            </span>
          )}
        </FormControl>
      </InputContainer>
      <InputContainer className='mt-7'>
        <FormControl>
          <Label>Company stage</Label>
          <FormDropdownV2
            name='companyStage'
            control={control}
            rules={{ required: true }}
            data={CompanyStage}
            placeholder='Select company stage'
            withBadge
            normalCase
            badgeClass={blueBadgeClass.addClass}
          />
          {errors?.companyStage && (
            <span className='font-inter text-xs text-red'>
              Company stage is required
            </span>
          )}
        </FormControl>
        <FormControl>
          <Label>Current number of open roles</Label>
          <FormDropdownV2
            name='numberOfOpenRoles'
            control={control}
            rules={{ required: true }}
            data={NumberOfOpenRoles}
            placeholder='Select number of open roles'
            withBadge
            normalCase
            badgeClass={blueBadgeClass.addClass}
          />
          {errors?.numberOfOpenRoles && (
            <span className='font-inter text-xs text-red'>
              Number of open roles is required
            </span>
          )}
        </FormControl>
      </InputContainer>

      {/**
       * ---------------- location --------------------
       */}
      <OnboardHeading className='mt-4'> Location </OnboardHeading>
      <InputContainer className='mt-9'>
        <FormControl>
          <Label htmlFor='city'>Country</Label>
          <FormCountryInputV2
            name='country'
            control={control}
            rules={{ required: !isRemoteFirst }}
            placeholder='Type a country'
            className='text-xs font-inter'
            withBadge
            badgeClass={blueBadgeClass.addClass}
            directionUp
            disabled={isRemoteFirst}
          />
          {!isRemoteFirst && errors?.country && (
            <span className='font-inter text-xs text-red'>
              Country is required
            </span>
          )}
        </FormControl>
        <FormControl>
          <Label htmlFor='country'>City</Label>
          <FormCityInputV2
            name='city'
            control={control}
            rules={{ required: !isRemoteFirst }}
            placeholder='Type a city'
            inputClass='text-xs font-inter'
            country={watch("country")}
            withBadge
            badgeClass={blueBadgeClass.addClass}
            directionUp
            disabled={isRemoteFirst}
          />
          {!isRemoteFirst && errors?.city && (
            <span className='font-inter text-xs text-red'>
              City is required
            </span>
          )}
        </FormControl>
      </InputContainer>
      {/**
       * ---------------- is Remote-first company? --------------------
       */}
      <div className='mt-5'>
        <FormCheckBoxV2 name='isRemoteFirst' control={control} value=''>
          <span className='leading-6 font-inter text-xs tracking-[-0.25px]'>
            Remote first company
          </span>
        </FormCheckBoxV2>
      </div>
      {/**
       * ---------------- Submit --------------------
       */}
      <div className='flex w-full'>
        <Button className='ml-auto' type='submit'>
          Next
        </Button>
      </div>
    </form>
  );
};

export default AboutCompany;
