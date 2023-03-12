import { useState } from "react";
import * as Sentry from "@sentry/react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { loadAuth } from "redux/slices/authentication";
import { useAppDispatch } from "redux/hooks/redux-hooks";

import OnboardingAPI from "network/onboarding";

import Button from "components/Button/ButtonV2";
import InputV2 from "components/V2/Input/InputV2";
import Heading from "components/Heading/HeadingV2";
import { ReactComponent as BackSVG } from "assets/svg/back.svg";
import "./styles.scss";

import { getCookie, getItem, setItem } from "utils/storageUtils";
import { getFormData } from "utils/commonUtils";
import { useEffect } from "react";
import {
  mixpanel_identify,
  mixpanel_people_set,
  mixpanel_people_set_once,
  mixpanel_register,
  mixpanel_track,
} from "helpers/mixpanel";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const ConfirmUser = () => {
  const [isResending, setResending] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleConfirmSignUp = async (username: string, code: string) => {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (err) {
      throw err;
    }
  };

  const handleResendSignup = async () => {
    try {
      setResending(true);
      const email = getItem("email");
      await Auth.resendSignUp(email);
      toast.custom(
        <Toast type="success" message="Resent verification code. Please check your inbox." />,
      );
      setResending(false);
    } catch (err: any) {
      setResending(false);
      Sentry.captureException(err);
      console.log("err: ", err);
      toast.custom(<Toast type="error" message={err?.name} />);
    }
  };

  const handleConfirmUser = async (event: any) => {
    event.preventDefault();
    const { code } = getFormData(event.currentTarget);

    try {
      const email = getItem("email");
      const password: any = getItem("password");
      setLoading(true);
      await handleConfirmSignUp(email, code);
      const user = await Auth.signIn({
        username: email,
        password,
      });
      const userData = await OnboardingAPI.getUserDetail();
      if (user && userData) {
        const userType = userData.data?.user_type ?? "FREELANCER";
        const userRole =
          userData.data?.user_type.toLowerCase() === "client" ? "Client" : "Freelancer";
        setItem("userRole", userRole);
        const userName = `${userData.data?.first_name} ${userData.data?.last_name}`;
        mixpanel_identify(email);
        mixpanel_people_set({
          $name: userName,
          $email: email,
          account_type: userType,
          signup_date: new Date(),
        });
        mixpanel_register({ email, name: userName });
        mixpanel_track("Sign up", {
          account_type: userType,
          from_referral: getCookie("referral_code") ? true : false,
        });
        dispatch(loadAuth());
      } else {
        throw new Error("User not found.");
      }
      setLoading(false);
      toast.custom(<Toast type="success" message="Thanks for confirming your email." />);
    } catch (err: any) {
      setLoading(false);
      Sentry.captureException(err);

      if (err?.name === "CodeMismatchException") {
        toast.custom(<Toast type="error" message="Invalid verification code." />);
      } else if (err?.name === "NotAuthorizedException") {
        toast.custom(<Toast type="error" message="Your email is already confirmed." />);
      } else {
        toast.custom(<Toast type="error" message="Unknown error" />);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen confirmUser-background">
        <div className="flex flex-col items-center justify-end h-[45vh] md:h-auto">
          <img
            src="/common/spaceboy/moon-guitar-player.png"
            alt="spaceboy"
            className="block md:fixed w-[150px] md:w-[160px] mb-[10vh] md:top-[149px] md:right-[234px]"
          />
          <div className="relative flex flex-row justify-center items-center w-[90vw] md:w-[584px] ">
            <BackSVG
              className="absolute top-[-2] md:top-1 left-0 cursor-pointer w-[40px] md:w-[24px]"
              onClick={() => navigate("/signup")}
            />
            <Heading
              className="text-white text-center text-h6 md:text-xl font-semibold font-poppins"
              variant="h5"
            >
              Confirm your email
            </Heading>
          </div>
        </div>
        <div className="flex flex-col justify-start md:justify-center items-center mx-5 md:mx-0 h-[55vh] md:h-auto w-full md:w-[584px] rounded-[8px] bg-white px-6 mt-8 z-10">
          <Heading
            className="mt-[10vh] md:mt-9 font-semibold text-p2 md:text-[16px] font-inter"
            variant="h6"
          >
            Please enter the verification code sent to your email
          </Heading>
          <form
            onSubmit={handleConfirmUser}
            className="flex flex-col items-center justify-center mt-5"
          >
            <div>
              <InputV2
                name="code"
                type="text"
                placeholder="123456"
                onChange={(e) => setCode(e.target.value)}
                value={code}
                className="w-[65vw] md:w-[250px] my-[20px] p-0 tracking-[0.2rem] text-center text-p3 md:text-sm bg-lighter-gray font-inter h-[48px]"
                autoComplete="off"
                maxLength={6}
                minLength={6}
              />
            </div>
            <div className="flex mt-[50px] md:mt-4 mb-6 items-center flex-row space-x-8 md:space-x-4 space-y-0">
              <Button
                type="button"
                onClick={handleResendSignup}
                className="font-poppins font-bold text-p2 md:text-sm text-black sm:max-md:w-[40vw] sm:max-md:h-[60px]"
                variant="secondary"
                loading={isResending}
              >
                Resend code
              </Button>
              <Button
                type="submit"
                className="border border-odf font-poppins font-bold text-p2 md:text-sm sm:max-md:w-[40vw] sm:max-md:h-[60px]"
                loading={isLoading}
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ConfirmUser;
