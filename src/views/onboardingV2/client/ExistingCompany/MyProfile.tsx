import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import OnboardAPI from "network/onboarding";
import ApplicationAPI from "network/application";
import UploadPanel from "./UploadPanel";
import { Label } from "views/onboardingV2/components";
import TypographyV2 from "components/Typography/TypographyV2";
import { FormInputV2 } from "components/V2/Input/FormInputV2";
import Button from "components/Button/ButtonV2";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import { setOnboardFields } from "redux/slices/clientOnboard";
import { OnboardComponentProps } from "../Onboard.types";
import { isEmpty } from "@aws-amplify/core";
import { default_men_avatars, default_women_avatars } from "constants/v2/default_images";
import Loader from "components/V2/Loader/Loader";
import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";
import { loadAuth } from "redux/slices/authentication";
import { mixpanel_track } from "helpers/mixpanel";
import { FormSelectAvatar } from "components/V2/SelectAvatar/FormSelectAvatar";

type AvatarProps = {
  url: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  innerClass?: string;
};
const Avatar = ({ url, onClick, className, innerClass }: AvatarProps) => {
  return (
    <div
      onClick={onClick}
      className={`w-[55px] h-[55px] shrink-0 rounded-[8px] bg-white border border-white cursor-pointer ${
        className ?? ""
      }`}
    >
      <img
        src={url}
        alt="avatar"
        className={`w-full h-full bg-cover rounded-[8px] ${innerClass ?? ""}`}
      />
    </div>
  );
};

const MyProfile = ({ user, goBack, selectedCompany }) => {
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user?.first_name ?? "",
      lastName: user?.last_name ?? "",
      companyEmail: user?.email_id ?? "",
      position: "Admin",
      avatar: {
        isSampleAvatar: false,
        avatarImage: "",
        bgIndex: -1,
      },
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await OnboardAPI.createClientProfile({
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email_id,
        company_name: selectedCompany?.name,
      });

      const { avatar, position } = data;
      delete data.avatar;

      const isSampleAvatar = !!avatar.sampleAvatar;
      const s3Avatar = avatar.avatarImage;
      const sampleAvatar = avatar.sampleAvatar;
      const sampleBg = avatar.bgIndex;

      await ApplicationAPI.updateClientProfile({
        client_id: user?.user_id,
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email_id,
        position,
      });

      if (isSampleAvatar) {
        const pronoun = sampleAvatar.type === "men" ? 0 : 1;
        await OnboardAPI.updateUser({
          email_id: user?.email_id,
          avatar: pronoun * 6 + sampleAvatar.index,
          background_number: sampleBg,
        });
      } else {
        await OnboardAPI.updateUser({
          email_id: user?.email_id,
          avatar: s3Avatar,
          background_number: sampleBg,
        });
      }

      await OnboardAPI.updateOnboardingStatus({
        client_id: user?.user_id,
        onboarding_status: "COMPLETED",
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
      setLoading(false);
    } catch (err) {
      setLoading(false);
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
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <TypographyV2 variant="subtitle2" className="font-poppins text-base text-[20px]" semibold>
        Fill in your information to sign up and join your team!
      </TypographyV2>

      <TypographyV2 variant="subtitle2" className="font-poppins text-base mt-[30px]" semibold>
        Upload a profile picture or choose one of our avatars
      </TypographyV2>

      <FormSelectAvatar
        name="avatar"
        withS3
        control={control}
        rules={{ validate: (av) => !!(av.sampleAvatar || av.avatarImage) }}
      />
      {errors?.avatar && (
        <p className="font-inter text-xs text-red mt-1">{"Please select an avatar"}</p>
      )}

      {/**
       * -------------------- Name ---------------------------------
       */}
      <div className="mt-11 w-full flex justify-between flex-wrap md:flex-nowrap gap-y-3">
        <div>
          <Label>First name</Label>
          <FormInputV2
            name="firstName"
            control={control}
            className="w-56 xl:w-72 mt-3"
            placeholder="First name"
            disabled
          />
        </div>
        <div>
          <Label>Last name</Label>
          <FormInputV2
            name="lastName"
            control={control}
            className="w-56 xl:w-72 mt-3"
            placeholder="Last name"
            disabled
          />
        </div>
      </div>
      {/**
       * --------------------- Job info -----------------------------
       */}
      <div className="font-poppins font-semibold text-sm mt-16">Job info</div>
      <div className="mt-6 w-full flex justify-between flex-wrap md:flex-nowrap gap-y-3">
        <div>
          <Label>Position</Label>
          <FormInputV2
            name="position"
            control={control}
            className="w-56 xl:w-72 mt-3"
            placeholder="Position"
            disabled={true}
          />
        </div>
        <div>
          <Label>Company email</Label>
          <FormInputV2
            name="companyEmail"
            control={control}
            className="w-56 xl:w-72 mt-3"
            placeholder="Company email"
            disabled
          />
        </div>
      </div>
      {/**
       * ---------------- Submit --------------------
       */}
      <div className="flex w-full justify-between mt-12">
        <Button type="button" variant="secondary" onClick={goBack}>
          Back
        </Button>
        <Button type="submit" loading={isLoading}>
          Next
        </Button>
      </div>
    </form>
  );
};

export default MyProfile;
