import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";

import AboutMySelf from "./AboutMyself";
import Experience from "./Experience";
import Location from "./Location";
import Socials from "./Socials";

import { getStepsData, goBackward, goForward } from "redux/slices/talentOnboard";
import { OnboardComponentProps } from "./Onboard.types";
import { getProtoTypes } from "redux/slices/prototype";
import Introduction from "./Introduction";
import OnboardTemplate from "../components/OnboardTemplate";
import Loader from "components/V2/Loader/Loader";

const onboardComponents: React.FC<OnboardComponentProps>[] = [
  AboutMySelf, // step 1
  Experience, // step 2
  Location, // step 3
  Socials, // step 4
];

const onboardTitles = [
  "Tell us about yourself",
  "Nice. Let’s highlight your experience!",
  "Awesome. We are a global company, where are you from?",
  "Final step! Share your socials and show off your work.",
];

const onboardSpaceboys = ["mooner", "relaxing", "playing", "soccer"];

const boysStyles = [
  "md:ml-[15vw] md:w-[7vw]",
  "md:ml-[10vw] md:w-[9vw]",
  "md:ml-[10vw] md:mt-[-20px] md:w-[12vw]",
  "md:ml-[5vw] md:mt-[10px] md:w-[10vw]",
];

const Onboard = () => {
  const dispatch = useAppDispatch();
  const mountedRef = useRef(true); // Check is is mounted
  const step = useAppSelector((root) => root.talentOnboard.step);
  const [loading, setLoading] = useState<boolean>(true);
  const goBack = () => {
    dispatch(goBackward());
  };
  const goNext = () => {
    dispatch(goForward());
  };
  const CurOnboardStep: React.FC<OnboardComponentProps> = useMemo(() => {
    const Comp = onboardComponents[step];
    return () => <Comp goBack={goBack} goNext={goNext} />;
  }, [step]);

  // Request steps saved data
  useEffect(() => {
    const fetch = async () => {
      await dispatch(getStepsData());
      if (!mountedRef.current) return;
      setLoading(false);
    };
    fetch();
  }, []);

  useEffect(() => {
    dispatch(getProtoTypes());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader /></div>;

  if (step === -1) {
    return <Introduction goNext={goNext} goBack={goBack} />;
  }

  return (
    <OnboardTemplate
      title={onboardTitles[step]}
      spaceBoy={onboardSpaceboys[step]}
      CurrentStepComp={CurOnboardStep}
      spaceBoyClassName={boysStyles[step]}
      step={step}
    />
  );
};

export default Onboard;
