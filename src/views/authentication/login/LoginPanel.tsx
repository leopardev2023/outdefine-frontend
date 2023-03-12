import * as Sentry from "@sentry/react";
import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { useAppDispatch } from "redux/hooks/redux-hooks";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import OnboardingAPI from "network/onboarding";
import Button from "components/Button/ButtonV2";
import GoogleIcon from "components/GoogleIcon";
import LogoIcon from "assets/icons/logo.svg";
import AuthUtils from "utils/authUtils";
import Heading from "components/Heading/HeadingV2";

import { loadAuth } from "redux/slices/authentication";
import { clearInfo, getCookie, getItem, setItem } from "utils/storageUtils";
import InputV2 from "components/V2/Input/InputV2";
import {
  mixpanel_identify,
  mixpanel_people_set,
  mixpanel_people_set_once,
  mixpanel_register,
  mixpanel_track,
} from "helpers/mixpanel";

const LoginPanel: React.FC = () => {
  const [searchParams] = useSearchParams();

  console.log(searchParams)

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Login | Outdefine";
    return () => {
      setLoading(false);
    };
  }, []);

  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGoogleSignIn = async (e: any) => {
    e.preventDefault();
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { email, password } = loginInfo;
    if (email !== "" && password !== "") {
      setItem("email", email);
      setItem("password", password);
    } else {
      clearInfo();
    }
    try {
      setLoading(true);
      const user = await Auth.signIn({
        username: email,
        password,
      });
      const userData = await OnboardingAPI.getUserDetail();
      if (user && userData?.success) {
        const userType = userData.data?.user_type ?? "FREELANCER";
        const userName = `${userData.data?.first_name} ${userData.data?.last_name}`;
        let avatar: unknown;
        const avatarInfo = userData.data?.avatar;
        if (avatarInfo && avatarInfo.length > 2) avatar = avatarInfo;
        else if (avatarInfo && avatarInfo.length <= 2) {
          avatar = `/app/common/avatar/DEFAULT-${
            Number(avatarInfo) >= 6 ? "WOMEN" : "MAN"
          }-${(Number(avatarInfo) + 1) % 6}.png`;
        } else {
          avatar = undefined;
        }

        mixpanel_identify(email);
        mixpanel_people_set({
          $name: userName,
          $email: email,
          $avatar: avatar,
          account_type: userType,
        });
        mixpanel_people_set_once({ first_login_date: new Date() });
        mixpanel_register({ email, name: userName });
        mixpanel_track("Log in", { account_type: userType });
        const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
        if (user) {
          dispatch(loadAuth());
          navigate("/dashboard");
        }
      } else {
        toast.custom(<Toast type="error" message="User does not exist on database" />);
      }

      setLoading(false);
    } catch (err: any) {
      Sentry.captureException(err);
      console.log("login err: ", err);
      setLoading(false);
      toast.custom(<Toast type="error" message={AuthUtils.getAuthError(err)} />);
      /**
       * if user is not confirmed yet, bring to /confirmUser screen
       */
      if (err.code === "UserNotConfirmedException") {
        navigate("/confirmUser");
      }
    }
  };

  return (
    <div className="md:max-w-[275px] flex flex-col" data-cy="login">
      <img src={LogoIcon} alt="Equi" width={42} className="hidden md:block" />
      <Heading className="font-bold text-[24px] text-black pt-6 pb-4 hidden md:block" variant="h5">
        Log in
      </Heading>
      <Button
        variant="secondary"
        left={GoogleIcon}
        onClick={handleGoogleSignIn}
        className="relative font-inter font-semibold text-p2 md:text-sm text-inactive-gray h-[48px] md:h-12"
      >
        Log in with Google
      </Button>
      <div className="flex items-center justify-center w-full mt-4">
        <div className="h-[1px] bg-inactive-gray w-[25%] rounded-full" />
        <p className="w-[50%] mx-2 text-center text-inactive-gray font-inter text-p3 md:text-xs">
          Or Login with Email
        </p>
        <div className="h-[1px] bg-inactive-gray w-[25%] rounded-full" />
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <InputV2
          placeholder="Email"
          className="mt-3 font-inter h-[48px] md:h-auto text-p3 md:text-xs"
          name="email"
          type="email"
          value={loginInfo.email}
          onChange={(e: any) => setLoginInfo({ ...loginInfo, email: e.target.value.toLowerCase() })}
          data-cy="email"
          required
        />
        <InputV2
          placeholder="Password"
          className="mt-3 mb-3 font-inter h-[48px] md:h-auto text-p3 md:text-xs"
          name="password"
          type="password"
          value={loginInfo.password}
          onChange={(e: any) => setLoginInfo({ ...loginInfo, password: e.target.value })}
          data-cy="password"
          required
        />
        <div className="text-right">
          <Link
            to="/forgotPassword"
            className="border-b border-black text-p3 md:text-xs font-inter font-semibold"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="flex items-center justify-center mt-4" data-cy="login-button">
          <Button
            type="submit"
            className="w-full h-[48px] md:h-auto text-p2 md:text-xs"
            loading={isLoading}
          >
            Log in
          </Button>
        </div>
      </form>
      <div className="mx-auto mt-3 mb-[22px] cursor-pointer font-poppins text-p3 md:text-xs">
        {`New here?`}
        <Link
          to={`/signup${
            getCookie("referral_code")
              ? `?referral_code=${getCookie("referral_code")}`
              : searchParams.get("r") ?? ""
          }`}
          className="ml-2 border-b border-black"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default LoginPanel;
