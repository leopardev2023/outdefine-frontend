import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "redux/hooks/redux-hooks";
import pathUtils from "utils/pathUtils";

import TalentOnboarding from "views/onboardingV2/talent";
import ClientOnboarding from "views/onboardingV2/client";
import { getItem, setItem } from "utils/storageUtils";
import OnboardingAPI from "network/onboarding";
import { OnboardStatus } from "@types";
import LoadingScreen from "components/LoadingScreen";
import { useEffect } from "react";

const Onboard: React.FC = () => {
  const userType = useAppSelector((state) => state.authentication.userRole) || getItem("userRole");

  const userRole = localStorage.getItem("OUTDEFINE_userRole");

  if (!userRole) {
    return <LoadingScreen/>;
  }

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const userData = await OnboardingAPI.getUserDetail(getItem("email")).then(
          (response) => response?.data ?? null,
        );
        const userRole: string = userData?.user_type.toLowerCase() === "client" ? "Client" : "Freelancer";
        setItem("userRole", userRole);

        let profile: any = {};
        if (
          userData?.user_type?.toLowerCase() === "freelancer" ||
        userData?.user_type?.toLowerCase() === "admin"
        ) {
          profile = await OnboardingAPI.getFreelancerProfile(userData?.user_id).then(
            (response) => response.data,
          );
        } else if (userData?.user_type?.toLowerCase() === "client") {
          profile = await OnboardingAPI.getClientProfile(userData?.user_id).then(
            (response) => response.profile,
          );
        }

        const onboardingStatus: OnboardStatus = profile?.onboarding_status?.toLowerCase() || "completed";
        setItem("onboardingStatus", onboardingStatus);
      } catch (error) {
        console.log("[FATAL] Error fetching the user data");
      }
    }
    if (!userRole) { fetchUserDetails(); }
  });

  if (userType?.toLowerCase() === "client") {
    return (
      <Routes>
        <Route path={pathUtils.ClIENT_ONBOARDING} element={<ClientOnboarding />} />
        <Route path={"*"} element={<Navigate to={pathUtils.ClIENT_ONBOARDING} replace />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path={pathUtils.TALENT_ONBOARDING} element={<TalentOnboarding />} />
        <Route path={"*"} element={<Navigate to={pathUtils.TALENT_ONBOARDING} replace />} />
      </Routes>
    );
  }
};

export default Onboard;
