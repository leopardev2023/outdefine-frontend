import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import { setOnboardFields } from "redux/slices/clientOnboard";

import OnboardAPI from "network/onboarding";
import ApplicationAPI from "network/application";

import UploadPanel from "../AboutMyself/UploadPanel";
import { Label } from "views/onboardingV2/components";
import TypographyV2 from "components/Typography/TypographyV2";
import { FormInputV2 } from "components/V2/Input/FormInputV2";
import Button from "components/Button/ButtonV2";
import utils from "utils/utils";
import { isEmpty } from "@aws-amplify/core";

import { OnboardComponentProps } from "../Onboard.types";
import { loadAuth } from "redux/slices/authentication";

import {
  CompanyStage,
  Industry,
  NumberOfEmployees,
  NumberOfOpenRoles,
} from "../AboutCompany/AboutCompany.data";
import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";
import { mixpanel_track } from "helpers/mixpanel";
import { getCookie, setCookie } from "utils/storageUtils";

const CompanyBrand = (props: OnboardComponentProps) => {
  const dispatch = useAppDispatch();
  const onboard = useAppSelector((root) => root.clientOnboard);
  const userId = useAppSelector((state) => state.authentication.userId);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      linkedin: onboard.linkedin,
      twitter: onboard.twitter,
      instagram: onboard.instagram,
    },
  });

  const handleUpload = async (val: boolean, selectedFiles) => {
    console.log({ selectedFiles });
    if (!selectedFiles || selectedFiles?.length === 0) return;
    const objectUrls: any = [];
    for (const key in selectedFiles) {
      if (Object.prototype.hasOwnProperty.call(selectedFiles, key)) {
        const element = selectedFiles[key];
        objectUrls.push(URL.createObjectURL(element));
      }
    }
    dispatch(
      setOnboardFields({
        companyLogoFile: selectedFiles[0],
        companyLogoPreviewImg: objectUrls,
      }),
    );
  };
  const onSubmit = async (data) => {
    dispatch(setOnboardFields(data));
    const onboardData = { ...onboard, ...data };
    console.log({ onboardData });
    try {
      setIsSubmitting(true);
      //======================= step1 ==========================
      const resultStep1 = await OnboardAPI.createClientCompany({
        company_name: onboardData.companyName,
        website: onboardData.companyWebsite,
        industry: Industry[onboardData.industry].value,
        number_of_employees: NumberOfEmployees[onboardData.numberOfEmployees].value,
        stage: CompanyStage[onboardData.companyStage].value,
        number_of_open_roles: NumberOfOpenRoles[onboardData.numberOfOpenRoles].value,
        city: onboardData.city,
        country: onboardData.country,
        dial_code: onboardData.dialCode?.value,
        phone_number: onboardData.phoneNumber,
        remote_first: onboardData.isRemoteFirst,
      });
      //======================= step2 ==========================
      await OnboardAPI.createClientProfile({
        first_name: onboardData.firstName,
        last_name: onboardData.lastName,
        email: onboardData.companyEmail,
        company_name: resultStep1.data?.name,
      });
      await ApplicationAPI.updateClientProfile({
        client_id: userId,
        first_name: onboardData.firstName,
        last_name: onboardData.lastName,
        email: onboardData.companyEmail,
        position: onboardData.position,
        avatar: onboardData.s3Avatar,
      });
      if (onboard.isSampleAvatar) {
        const pronoun = onboardData.sampleAvatar.type === "men" ? 0 : 1;
        await OnboardAPI.updateUser({
          email_id: onboardData.companyEmail,
          avatar: pronoun * 6 + onboardData?.sampleAvatar.index,
          background_number: onboardData.sampleBg,
        });
      }
      //======================= step3 ==========================
      await OnboardAPI.updateClientServiceAgreement({
        company_id: resultStep1.data.company_id,
        signed_by: userId,
        optAgree: onboardData.termAgreement,
        optAuth: onboardData.termAuthorize,
        msa_id: Number(localStorage.getItem("msa_id")),
        agreed: true,
        authorized: true,
      });
      //======================= step4 ==========================
      await OnboardAPI.updateClientSocialLink({
        company_id: resultStep1.data?.company_id,
        linkedin_link: onboardData.linkedin,
        twitter_link: onboardData.twitter,
        instagram_link: onboardData.instagram,
      });
      const companyId = resultStep1?.data?.company_id;
      if (onboardData.companyLogoFile) {
        await OnboardAPI.uploadCompanyLogo(onboardData.companyLogoFile, companyId);
      }
      await OnboardAPI.updateOnboardingStatus({
        client_id: userId,
        onboarding_status: "COMPLETED",
        referralCode: getCookie("referral_code") ?? "",
      }).then((response) => {
        if (response.success === true) {
          mixpanel_track("Onboard", {
            account_type: "CLIENT",
          });
          toast.custom(
            <Toast
              type="success"
              message="Congratulations! You have successfully onboarded to Outdefine!"
            />,
          );
          dispatch(loadAuth());
        }
      });

      if (getCookie("referral_code")) {
        setCookie("referral_code", "", -10);
      }
      setIsSubmitting(false);
    } catch (err) {
      setIsSubmitting(false);
      console.log("Error occured while submitting company data: ", err);
      toast.custom(
        <Toast
          type="error"
          message="Unexpected error occured while submitting company profile... Please make sure you filled all the fields correctly and your company name is unique."
        />,
      );
    }
  };

  return (
    <form className="mt-[90px]" onSubmit={handleSubmit(onSubmit)}>
      <TypographyV2 variant="subtitle2" className="font-poppins text-base" semibold>
        Upload company logo
      </TypographyV2>
      <UploadPanel
        handleUpload={handleUpload}
        className="shrink-0 mt-7"
        background={onboard.companyLogoPreviewImg}
      />
      <span className="font-inter text-xs mt-2 inline-block">Recommended size: 180px x 180px</span>
      <TypographyV2 variant="subtitle2" className="font-poppins text-sm mt-7" semibold>
        Company socials
      </TypographyV2>
      <div className="w-72 mt-[18px]">
        <Label className="mt-[18px]">Linkedin</Label>
        <FormInputV2
          name="linkedin"
          control={control}
          className="mt-[14px]"
          placeholder="Linkedin url"
          rules={{
            required: true,
            validate: () => {
              return utils.linkedinRegex.test(getValues("linkedin"));
            },
          }}
        />
        {errors?.linkedin && (
          <p className="font-inter text-xs text-red mt-1">
            {String(errors?.linkedin?.type) === "required"
              ? "Linkedin profile is required"
              : "Linkedin profile is invalid (e.g. https://linkedin.com/in/john-doe)"}
          </p>
        )}
        <Label className="mt-[30px]">Twitter (optional)</Label>
        <FormInputV2
          name="twitter"
          control={control}
          className="mt-[14px]"
          placeholder="Twitter url"
          rules={{
            validate: () => {
              if (!getValues("twitter")) return true;
              return utils.urlRegex.test(getValues("twitter"));
            },
          }}
        />
        {errors?.twitter && (
          <p className="font-inter text-xs text-red mt-1">
            {errors?.twitter && "Twitter profile is invalid (e.g. https://twitter.com)"}
          </p>
        )}
        <Label className="mt-[30px]">Instagram (optional)</Label>
        <FormInputV2
          name="instagram"
          control={control}
          className="mt-[14px]"
          placeholder="Instagram url"
          rules={{
            validate: () => {
              if (!getValues("instagram")) return true;
              return utils.urlRegex.test(getValues("instagram"));
            },
          }}
        />
        {errors?.instagram && (
          <p className="font-inter text-xs text-red mt-1">
            {errors?.instagram && "Instagram profile is invalid (e.g. https://instagram.com)"}
          </p>
        )}
      </div>
      {/**
       * ---------------- Submit --------------------
       */}
      <div className="flex w-full justify-between mt-12">
        <Button type="button" variant="secondary" onClick={props.goBack}>
          Back
        </Button>
        <Button
          type="submit"
          disabled={!isEmpty(errors) || !onboard.companyLogoPreviewImg}
          loading={isSubmitting}
        >
          Finish
        </Button>
      </div>
    </form>
  );
};

export default CompanyBrand;
