import React, { useEffect } from "react";

import Application from "./application";
import Authentication from "./authentication";
import Onboard from "./onboard";

import { OnboardStatus } from "@types";
import LoadingScreen from "components/LoadingScreen";

import { getCookie, getItem, setCookie } from "utils/storageUtils";
import { useSearchParams } from "react-router-dom";

type AppRouteProps = {
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AppRoutes = (props: AppRouteProps) => {
  const { isLoading, isAuthenticated } = props;

  const onboardStatus = getItem("onboardingStatus") || OnboardStatus.TODO;

  const [searchParams] = useSearchParams();

  useEffect(() => {
    !!searchParams.get("r") && setCookie("referral_code", searchParams.get("r")!, 10);
    console.log("referral code stored in cookie:", getCookie("referral_code"));
  }, []);

  return (
    <>
      {isLoading
        ? (
        <LoadingScreen />
          )
        : isAuthenticated && onboardStatus === OnboardStatus.COMPLETED
          ? (
        <Application />
            )
          : isAuthenticated
            ? (
        <Onboard />
              )
            : (
        <Authentication />
              )}
    </>
  );
};

export default AppRoutes;
