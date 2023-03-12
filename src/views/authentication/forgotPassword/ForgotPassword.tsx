import * as Sentry from "@sentry/react";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import AuthUtils from "utils/authUtils";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import { getProfileId, setUserId } from "utils/storageUtils";
import { InputBox } from "components/forms";
import Button from "components/Button/ButtonV2";
import Heading from "components/Heading/HeadingV2";
import Typography from "components/Typography/TypographyV2";
import InputV2 from "components/V2/Input/InputV2";

import BackSVG from "assets/svg/back.svg";
import "./styles.scss";

const ForgotPassword = () => {
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (event: any) => {
    if (isLoading) return;
    event.preventDefault();
    try {
      setLoading(true);
      await Auth.forgotPassword(email);
      toast.custom(<Toast type="success" message={`A verification code is sent to your ${email}. Please check your inbox.`} />);
      setTimeout(() => {
        setUserId(email);
        navigate(`/resetPassword?email=${email}`);
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      Sentry.captureException(err);

      toast.custom(<Toast type="error" message={AuthUtils.getAuthError(err)} />);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen forgotPassword-background relative">
        <img
          src={"/common/spaceboy/gamer1.png"}
          className="absolute z-10 right-[110px] lg:right-[310px] top-1/4"
          width={230}
          height={230}
          alt="Go back"
        />
        <div className="flex flex-row items-center mt-[73px]">
          <div onClick={() => navigate("/login")} className="cursor-pointer">
            <img src={BackSVG} className="" width={20} height={20} alt="Go back" />
          </div>
          <Heading className="text-white text-[20px] font-semibold font-poppins ml-10" variant="h6">
            Forgot your password?
          </Heading>
        </div>
        <div className="flex flex-col justify-center items-center w-[370px] md:w-[495px] h-[209px] rounded-[15px] bg-white p-6 mt-8">
          <Typography className="font-semibold mt-[26px]" variant="p1">
            Enter the email address you used to sign up with Outdefine
          </Typography>
          <form
            onSubmit={handleForgotPassword}
            className="flex flex-col items-center justify-center w-full mt-5 mb-7"
          >
            <InputV2
              name="email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email address"
              className="w-[96%]"
            />
            <Button type="submit" loading={isLoading} className="mt-5 w-[200px]">
              Reset password
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
