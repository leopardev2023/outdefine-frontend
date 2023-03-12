import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import OnboardAPI from "network/onboarding";
import { Label } from "views/onboardingV2/components";
import TypographyV2 from "components/Typography/TypographyV2";
import { FormInputV2 } from "components/V2/Input/FormInputV2";
import Button from "components/Button/ButtonV2";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import { setOnboardFields } from "redux/slices/clientOnboard";
import { OnboardComponentProps } from "../Onboard.types";
import { isEmpty } from "@aws-amplify/core";
import { FormSelectAvatar } from "components/V2/SelectAvatar/FormSelectAvatar";

const AboutMyself = (props: OnboardComponentProps) => {
  const { feed } = props;
  const dispatch = useAppDispatch();
  const onboard = useAppSelector((root) => root.clientOnboard);
  console.log(onboard);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: feed?.user?.first_name ?? "",
      lastName: feed?.user?.last_name ?? "",
      companyEmail: feed?.user?.email_id ?? "",
      position: "Admin",
      avatar: {
        avatarImage: onboard.s3Avatar,
        sampleAvatar: onboard.sampleAvatar,
        bgIndex: onboard.sampleBg,
      },
    },
  });

  const onSubmit = (data) => {
    console.log({ data });
    const { avatar } = data;
    delete data.avatar;
    const payload = {
      ...data,
      isSampleAvatar: !!avatar.sampleAvatar,
      s3Avatar: avatar.avatarImage,
      sampleAvatar: avatar.sampleAvatar,
      sampleBg: avatar.bgIndex,
    };
    dispatch(setOnboardFields(payload));
    props.goNext();
  };

  return (
    <form className='mt-20' onSubmit={handleSubmit(onSubmit)}>
      <TypographyV2
        variant='subtitle2'
        className='font-poppins text-base'
        semibold
      >
        Upload a profile picture or choose one of our avatars
      </TypographyV2>
      <FormSelectAvatar
          name="avatar"
          withS3
          control={control}
          rules={{ validate: (av) => !!(av.sampleAvatar || av.avatarImage) }}
        />
        {errors?.avatar && (
            <p className="font-inter text-xs text-red mt-1">
              {"Please select an avatar"}
            </p>
        )}

      {/**
       * -------------------- Name ---------------------------------
       */}
      <div className='mt-11 w-full flex justify-between flex-wrap md:flex-nowrap gap-y-3'>
        <div>
          <Label>First name</Label>
          <FormInputV2
            name='firstName'
            control={control}
            className='w-56 xl:w-72 mt-3'
            placeholder='First name'
            disabled
          />
        </div>
        <div>
          <Label>Last name</Label>
          <FormInputV2
            name='lastName'
            control={control}
            className='w-56 xl:w-72 mt-3'
            placeholder='Last name'
            disabled
          />
        </div>
      </div>
      {/**
       * --------------------- Job info -----------------------------
       */}
      <div className='font-poppins font-semibold text-sm mt-16'>Job info</div>
      <div className='mt-6 w-full flex justify-between flex-wrap md:flex-nowrap gap-y-3'>
        <div>
          <Label>Position</Label>
          <FormInputV2
            name='position'
            control={control}
            className='w-56 xl:w-72 mt-3'
            placeholder='Position'
            disabled={true}
          />
        </div>
        <div>
          <Label>Company email</Label>
          <FormInputV2
            name='companyEmail'
            control={control}
            className='w-56 xl:w-72 mt-3'
            placeholder='Company email'
            disabled
          />
        </div>
      </div>
      {/**
       * ---------------- Submit --------------------
       */}
      <div className='flex w-full justify-between mt-12'>
        <Button type='button' variant='secondary' onClick={props.goBack}>
          Back
        </Button>
        <Button type='submit' disabled={!isEmpty(errors)}>
          Next
        </Button>
      </div>
    </form>
  );
};

export default AboutMyself;
