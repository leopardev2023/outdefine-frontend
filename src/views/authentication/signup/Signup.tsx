import * as Sentry from "@sentry/react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { Helmet } from "react-helmet";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import CheckBoxV2 from "components/V2/Buttons/CheckBoxV2";
import InputV2 from "components/V2/Input/InputV2";
import Button from "components/Button/ButtonV2";
import Heading from "components/Heading/HeadingV2";
import GoogleIcon from "components/GoogleIcon";
import LogoIcon from "assets/icons/logo.svg";
import SignupImage from "assets/welcome/signup.png";
import AccountSelect from "./AccountSelect";
import { AccountType } from "./types";
import { getCookie, getItem, setItem, setUserId } from "utils/storageUtils";
import authenticationAPI from "network/authentication";
import { isWorkEmail } from "utils/utils";
import Typography from "components/Typography/TypographyV2";
import MobileLogo from "assets/welcome/outdefine-mobile-logo.png";
import MobileGraphic from "assets/welcome/signup-mobile-graphic.png";
import "./styles.scss";
import ReferralAlert from "../component/ReferralAlert";

const Signup: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [signupInfo, setSignupInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    referralSource: "",
    agreeTerms: false,
  });
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<AccountType>();
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = "SignUp | Outdefine";
  }, []);

  const handleGoogleSignUp = async (e: any) => {
    e.preventDefault();
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Google,
    });
  };

  const handleSignup = async (event: any) => {
    event.preventDefault();
    const { email, password, firstName, lastName, agreeTerms } = signupInfo;
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      agreeTerms === false
    ) {
      toast.custom(<Toast type="error" message="Please fill out the form correctly." />);
      return;
    }

    if (accountType === "company" && !isWorkEmail(email)) {
      toast.custom(<Toast type="error" message="Please provide company email" />);
      return;
    }
    try {
      setLoading(true);
      const userInfo = {
        firstName,
        lastName,
        email,
        userType: accountType === "company" ? "CLIENT" : "FREELANCER",
      };

      await authenticationAPI.signUp(userInfo);
      const result = await Auth.signUp({
        username: email,
        password,
        attributes: {
          family_name: firstName,
          given_name: lastName,
        },
      });
      const { userSub } = result;
      if (userSub) {
        setItem("email", email);
        setItem("password", password);
        setUserId(email);
        navigate("/confirmUser");
      } else {
        toast.custom(<Toast type="error" message="Unknown error. Please contact with support." />);
      }
      setLoading(false);

      localStorage.removeItem("referral_code");
    } catch (err: any) {
      setLoading(false);
      let errorMessage = "";
      switch (err.code) {
        case "UserLambdaValidationException":
          errorMessage = "You are not authorized to signup. Please contact to admin";
          break;
        case "UsernameExistsException":
          errorMessage = "Email address already exists. Please try with another email.";
          break;
        default:
          errorMessage = err.message;
          break;
      }
      toast.custom(<Toast type="error" message={errorMessage} />);
      Sentry.captureException(err);
    }
  };

  if (!accountType) {
    return <AccountSelect onSelect={setAccountType} />;
  }

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Outdefine revolutionizes talent connections through decentralized tech & tokenization. We connect world's best web3 talent with global freelance job opportunities for easy collaboration."
          key="desc"
        />
        <meta
          property="og:description"
          content="Outdefine revolutionizes talent connections through decentralized tech & tokenization. We connect world's best web3 talent with global freelance job opportunities for easy collaboration."
        />
      </Helmet>
      <ReferralAlert />
      <div className="flex flex-col min-h-screen px-0 md:flex-row">
        <div className="relative md:flex flex-col gap-y-4 w-full md:w-[550px] lg:w-[725px] mr-0 md:mb-0 justify-between hidden">
          <img src={SignupImage} alt="Sign up" />
        </div>
        <div className="relative flex flex-col items-center justify-center text-center text-white mobile-header-background md:hidden">
          <img src={MobileLogo} alt="Outdefine" className="mt-8" width={186} />
          <Heading variant="h6" className="mt-6 mb-2">
            Define your future in the world of web3
          </Heading>
          <Typography variant="p1" className="mb-4">
            Own your career
          </Typography>
          <img src={MobileGraphic} alt="LFG" width={295} className="z-10" />
          <div className="w-full h-[80px] bg-white block absolute bottom-[-1px] rounded-t-lg"></div>
        </div>
        <div className="px-[13vw] md:px-2 mx-0 my-0 mb-10 md:mb-auto md:mt-auto">
          <div className="md:max-w-[300px] flex flex-col w-full md:w-[275px] sm:max-md:space-y-[30px]">
            <img src={LogoIcon} alt="Equi" width={42} className="hidden md:block" />
            <Heading
              className="font-bold text-[24px] text-black pt-6 pb-4 hidden md:block"
              variant="h5"
            >
              Sign up
            </Heading>

            { accountType === "company"
              ? (<div className="flex items-center justify-center w-full my-4">
              <div className="h-[1px] bg-inactive-gray w-[25%] rounded-full" />
              <p className="w-[50%] mx-2 text-center text-inactive-gray font-inter font-normal text-p3 md:text-xs">
                Sign up with Email
              </p>
              <div className="h-[1px] bg-inactive-gray w-[25%] rounded-full" />
            </div>)
              : (<><Button
              variant="secondary"
              left={GoogleIcon}
              onClick={handleGoogleSignUp}
              className="font-inter font-semibold text-p2 md:text-sm mt-4 text-inactive-gray h-[48px] md:h-12"
            >
              Sign up with Google
            </Button>

            <div className="flex items-center justify-center w-full my-4">
              <div className="h-[1px] bg-inactive-gray w-[25%] rounded-full" />
              <p className="w-[50%] mx-2 text-center text-inactive-gray font-inter font-normal text-p3 md:text-xs">
                Or Sign up with Email
              </p>
              <div className="h-[1px] bg-inactive-gray w-[25%] rounded-full" />
            </div></>)}

            <form
              onSubmit={handleSignup}
              className="flex flex-col w-full space-y-[20px] md:space-y-4"
              autoComplete="off"
            >
              <InputV2
                placeholder="First Name"
                name="firstName"
                className="font-inter tex-p2 md:text-xs font-normal h-[48px] md:h-12"
                required
                value={signupInfo.firstName}
                onChange={(e: any) => setSignupInfo({ ...signupInfo, firstName: e.target.value })}
              />
              <InputV2
                placeholder="Last Name"
                name="lastName"
                className="font-inter tex-p2 md:text-xs font-normal h-[48px] md:h-12"
                required
                value={signupInfo.lastName}
                onChange={(e: any) => setSignupInfo({ ...signupInfo, lastName: e.target.value })}
              />

              <InputV2
                placeholder={accountType === "talent" ? "Email Address" : "Work email"}
                name="email"
                className="font-inter tex-p2 md:text-xs font-normal h-[48px] md:h-12"
                type="email"
                required
                value={signupInfo.email}
                onChange={(e: any) =>
                  setSignupInfo({ ...signupInfo, email: e.target.value.toLowerCase() })
                }
              />

              <InputV2
                placeholder="Password"
                type="password"
                name="password"
                className="font-inter tex-p2 md:text-xs font-normal h-[48px] md:h-12"
                required
                value={signupInfo.password}
                onChange={(e: any) => setSignupInfo({ ...signupInfo, password: e.target.value })}
              />
              <div className="tex-p2 sm:max-md:ml-[1vw] md:text-xs font-normal font-inter flex justify-start">
                <CheckBoxV2
                  value={"terms_agreement"}
                  selected={signupInfo.agreeTerms}
                  className="sm:max-md:w-[24px] sm:max-md:h-[24px] "
                  onClick={() =>
                    setSignupInfo({
                      ...signupInfo,
                      agreeTerms: !signupInfo.agreeTerms,
                    })
                  }
                >
                  <span className="leading-5 ml-2">
                    I agree to Outdefine's{" "}
                    <u>
                      <a href="https://outdefine.com/terms">terms of service</a>
                    </u>{" "}
                    and{" "}
                    <u>
                      <a href="https://outdefine.com/privacy-policy">privacy policy</a>
                    </u>
                    .
                  </span>
                </CheckBoxV2>
              </div>
              <div className="flex items-center justify-center mt-6 ">
                <Button type="submit" className="w-full h-[48px] md:h-12" loading={isLoading}>
                  Sign up
                </Button>
              </div>
            </form>
            <div className="mx-auto mt-3 mb-[22px] cursor-pointer tex-p3 md:text-xs font-poppins">
              {`Have an account?`}
              <Link to="/login" className="ml-2 border-b border-black">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
