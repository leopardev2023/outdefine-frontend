import React from "react";
import { ASSESSMENT_STEP, useAssessment } from "./hooks";
import { Profile } from "./components";

import Congratulations from "./pages/Congratulations";
import Confirmation from "./pages/Confirmation";
import AssessmentStages from "./pages/AssessmentStages";
import Schedule from "./pages/Schedule";

import OutdefineLogo from "assets/svg/dark-logo.svg";
import { ColorRing } from "react-loader-spinner";

const assessmentComponents = [Confirmation, AssessmentStages, Congratulations, Schedule];
let CurrentStep: any;

const AssessmentV2 = () => {
  const assessmentData = useAssessment();
  const { profile, currentRole, assessmentStep, assessmentTitle } = assessmentData;
  CurrentStep = assessmentComponents[assessmentStep];

  return (
    <div className="relative w-full h-screen overflow-x-hidden overflow-y-auto">
      <div className="mx-10 lg:mx-32 xl:ml-[150px] xl:mr-[265px] pt-20 pb-[92px]">
        <Profile
          avatar={profile.User.avatar ?? OutdefineLogo}
          name={`${profile.User.first_name} ${profile.User.last_name}`}
          status="You have assessments to complete"
          role={assessmentStep === ASSESSMENT_STEP.ROLE_CONFIRMATION ? "" : currentRole?.name ?? ""}
          bgNumber={profile.User.background_number}
          title={assessmentTitle}
        />
        {<CurrentStep mainData={assessmentData} />}
      </div>
    </div>
  );
};

export default AssessmentV2;
