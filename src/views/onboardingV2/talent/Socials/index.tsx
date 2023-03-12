import React, { useState, useEffect } from "react";
import OnboardAPI from "network/onboarding";
import { useForm, useWatch } from "react-hook-form";
import { setOnboardFields } from "redux/slices/talentOnboard";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import Button from "components/Button/ButtonV2";
import { Label, OnboardHeading } from "views/onboardingV2/components";
import { FormInputV2 } from "components/V2/Input/FormInputV2";
import { FormDropdownV2 } from "components/V2/Dropdown/FormDropdownV2";
import utils from "utils/utils";
import { OnboardComponentProps } from "../Onboard.types";
import { getCookie, getItem, setCookie } from "utils/storageUtils";
import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";
import { loadAuth } from "redux/slices/authentication";
import { isEmpty } from "@aws-amplify/core";
import { mixpanel_track } from "helpers/mixpanel";
import { channels } from "./Channels.data";
import ReferralAlert from "views/authentication/component/ReferralAlert";
import { FormSelectAvatar } from "components/V2/SelectAvatar/FormSelectAvatar";

const Socials = (props: OnboardComponentProps) => {
  const dispatch = useAppDispatch();
  const onboard = useAppSelector((root) => root.talentOnboard);
  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      website: onboard.website_link,
      linkedin: onboard.linkedin_link,
      github: onboard.github_link,
      source: onboard.talent_source,
      other: onboard.other,
      avatar: {},
    },
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const sourceWatch = useWatch({ control, name: "source" });

  useEffect(() => {
    onboard && setValue("other", onboard.other);
  }, [onboard, setValue]);

  const generateStepData = (data) => {
    const email_id = getItem("email");
    const resumeFile = onboard.resume;
    const avatar = data.avatar;
    const step4Data = {
      email_id,
      website_link: data.website,
      linkedin_link: data.linkedin,
      github_link: data.github,
      talent_source: getSourceData(data.source, data.other),
      referralCode: getCookie("referral_code") ?? "",
    };
    return {
      resumeFile,
      avatar,
      step4Data,
    };
  };

  const finishOnboard = async (data) => {
    const { step4Data, resumeFile, avatar } = generateStepData(data);
    try {
      setIsSubmitting(true);
      let response;

      response = await OnboardAPI.talentStep4(JSON.stringify(step4Data));
      if (!response.success) throw Error("Error on step 4: " + response.message);

      if (avatar.sampleAvatar) { // Upload sample avatar if therre is one, in s3 case was already updated
        const { sampleAvatar } = avatar;
        response = await OnboardAPI.updateUser({
          email_id: getItem("email"),
          avatar: (sampleAvatar.type === "men" ? 0 : 6) + sampleAvatar.index,
          background_number: avatar.bgIndex || null,
        });
        if (!response.success) throw Error("Error updating profile picture: " + response.message);
      }

      // File fields
      if (resumeFile) { // Upload resume if there is one
        response = await OnboardAPI.uploadResume(resumeFile);
        if (!response.success) throw Error("Error on resume uploading: " + response.message);
      }

      setIsSubmitting(false);
      toast.custom(<Toast type="success" message="You have been successfully onboarded!" />);

      if (data?.source >= 0) {
        mixpanel_track("Onboard", {
          account_type: "FREELANCER",
          talent_source: getSourceCategory(data?.source),
        });
      } else {
        mixpanel_track("Onboard", {
          account_type: "FREELANCER",
        });
      }

      if (getCookie("referral_code")) {
        setCookie("referral_code", "", -10);
      }

      dispatch(loadAuth());
    } catch (err) {
      console.error("Talent onboarding failed with: ", err);
      setIsSubmitting(false);
      toast.custom(<Toast type="error" message="Error occured while submitting talent data" />);
    }
  };

  const getSourceData = (source, other) => {
    if (source && source === 8) {
      return other || "";
    }
    return source >= 0 ? channels[source].value : "";
  };

  const getSourceCategory = (source) => {
    return source >= 0 ? channels[source].value : "";
  };

  const onSubmit = (data) => {
    const { website, linkedin, github, source, other } = data;

    dispatch(
      setOnboardFields({
        website_link: website,
        linkedin_link: linkedin,
        github_link: github,
        talent_source: source,
        other,
      }),
    );
    finishOnboard(data);
  };

  return (
    <>
      <ReferralAlert />
      <form className="md:ml-[70px] mt-6 md:mt-[124px]" onSubmit={handleSubmit(onSubmit)}>
        {/* Profile picture */}
        <OnboardHeading className="text-[14px]">Upload a profile picture or choose one of ours</OnboardHeading>
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

        {/* Reference */}
        <OnboardHeading className="mt-[51px]">How did you hear about us? (optional)</OnboardHeading>
        <div className="w-full md:w-72 mt-6 mb-10">
          <FormDropdownV2
            name={"source"}
            control={control}
            rules={{ required: false }}
            data={channels}
            placeholder="Choose how you heard about us"
            normalCase
          />
          {(sourceWatch && sourceWatch + 1) === 9 && (
            <div className="mt-4">
              <Label>Others</Label>
              <FormInputV2
                name="other"
                control={control}
                className="mt-[14px]"
                placeholder="How did you hear about us?"
                rules={{
                  validate: () => {
                    if (!getValues("other")) return true;
                  },
                }}
              />
            </div>
          )}
        </div>

        {/**
         * ---------------- Socials --------------------
         */}
        <OnboardHeading className="mt-12 md:mt-0">Share your socials!</OnboardHeading>

        <div className="w-full md:w-72 mt-6">
          <Label>Linkedin</Label>
          <FormInputV2
            name="linkedin"
            control={control}
            className="mt-[14px]"
            placeholder="Linkedin url"
            rules={{
              required: true,
              validate: (url) => utils.linkedinRegex.test(url)
              ,
            }}
          />
          {errors?.linkedin?.type === "required" && (
            <p className="font-inter text-xs text-red mt-1">{"Please fill in this field"}</p>
          )}
          {errors?.linkedin?.type === "validate" && (
            <p className="font-inter text-xs text-red mt-1">
              {"Linkedin profile is invalid (e.g. https://linkedin.com/in/john-doe)"}
            </p>
          )}
          <Label className="mt-[30px]">Website / Portfolio (optional)</Label>
          <FormInputV2
            name="website"
            control={control}
            className="mt-[14px]"
            placeholder="Website url"
            rules={{
              validate: (url) => utils.urlRegex.test(url) || !url,
            }}
          />
          {errors?.website && (
            <p className="font-inter text-xs text-red mt-1">
              {"Website url is invalid (e.g. https://example.com)"}
            </p>
          )}
          <Label className="mt-[30px]">Github (optional)</Label>
          <FormInputV2
            name="github"
            control={control}
            className="mt-[14px]"
            placeholder="Github url"
            rules={{
              validate: (url) => utils.githubRegex.test(url) || !url,
            }}
          />
          {errors?.github && (
            <p className="font-inter text-xs text-red mt-1">
              {"Github profile is invalid (e.g. https://github.com/johndoe)"}
            </p>
          )}
        </div>
        {/**
         * ---------------- Submit --------------------
         */}
        <div className="flex flex-col-reverse md:flex-row w-full justify-between mt-12 md:mt-36">
          <Button className="mt-3 md:mt-0" type="button" variant="secondary" onClick={props.goBack}>
            Back
          </Button>
          <Button type="submit" loading={isSubmitting} disabled={!isEmpty(errors)}>
            Finish
          </Button>
        </div>
      </form>
    </>
  );
};

export default Socials;
