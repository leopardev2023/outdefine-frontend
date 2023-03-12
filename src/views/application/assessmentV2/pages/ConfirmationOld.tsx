import React, { useState } from "react";
import OnboardingAPI from "network/onboarding";

import { RoleType } from "redux/slices/prototype";
import { setProfileData } from "redux/slices/profile";
import { useAppDispatch } from "redux/hooks/redux-hooks";

import Button from "components/Button/ButtonV2";
import { Accordion, Banner, Title } from "../components";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import { Token } from "../Icons";
import { mixpanel_track } from "helpers/mixpanel";
import { ASSESSMENT_STEP, useAssessmentResultType } from "../hooks";

type Props = {
  mainData: useAssessmentResultType;
};

const Confirmation = (props: Props) => {
  const dispatch = useAppDispatch();
  const { prototype, setAssessmentStep } = props.mainData;

  const [isLoading, setLoading] = useState<boolean>(false);
  const [confirmedRole, setConfirmedRole] = useState<RoleType>();

  const handleConfirm = async () => {
    if (!confirmedRole) return;
    const { jobTypeJobTypeId: jobId, role_id: roleId } = confirmedRole;

    if (jobId === undefined || roleId === undefined) {
      console.error("selected role incorrect");
    } else {
      setLoading(true);
      await OnboardingAPI.updateJobAndRoleType(jobId, roleId, true)
        .then((response) => {
          mixpanel_track("Assessment Role Confirmation", {
            selected_roleId: confirmedRole.role_id,
            selected_roleName: confirmedRole.name,
          });
          response?.data && dispatch(setProfileData(response.data));
          setAssessmentStep(ASSESSMENT_STEP.MAIN);
          toast.custom(<Toast type="success" message="Role confirmation successful!" />);
        })
        .catch((err) => {
          console.log("Confirm role error: ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Banner
        image="/assessments/banner_init.png"
        content={
          <>
            Choose an industry and verfiy your skills. Once you are a trusted member you earn{" "}
            <Token className="inline" /> 500 tokens that can be used towards boosting job
            applications and can start applying to jobs!
          </>
        }
        title="Complete your assessment, earn tokens and apply for jobs!"
        wrapperClass="mt-9"
      />
      <Title title="Select your industry and role" className="mt-[50px] mb-8" />
      <Accordion data={prototype.data} activeRole={confirmedRole} setRole={setConfirmedRole} />
      <Button className="mt-12 float-right" onClick={handleConfirm} loading={isLoading}>
        Confirm
      </Button>
    </div>
  );
};

export default Confirmation;
