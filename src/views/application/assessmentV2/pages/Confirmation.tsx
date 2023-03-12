import React, { useEffect, useState } from "react";
import OnboardingAPI from "network/onboarding";

import { setProfileData } from "redux/slices/profile";
import { useAppDispatch } from "redux/hooks/redux-hooks";

import Button from "components/Button/ButtonV2";
import { Banner, Title } from "../components";

import { Token } from "../Icons";
import { mixpanel_track } from "helpers/mixpanel";
import { ASSESSMENT_STEP, useAssessmentResultType } from "../hooks";
import Category from "../components/Assessment/Category";
import assessmentAPI from "network/assessment";
import { ColorRing } from "react-loader-spinner";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

type Props = {
  mainData: useAssessmentResultType;
};

const Confirmation = (props: Props) => {
  const dispatch = useAppDispatch();
  const { setAssessmentStep, init, isLoading } = props.mainData;

  const [isConfirming, setLoading] = useState<boolean>(false);
  const [assessmentData, setAssessmentData] = useState();
  const [selectedItem, setSelectedItem] = useState({ id: -1, name: "", type: "" });

  useEffect(() => {
    assessmentAPI.getAssessmentData().then((response) => {
      setAssessmentData(response?.data.data);
    });
  }, []);

  const handleConfirm = async () => {
    if (!selectedItem || selectedItem.id === -1 || selectedItem.name === "") {
      toast.custom(<Toast type="warning" message="Please select role to confirm" />);
      return;
    }

    setLoading(true);
    await OnboardingAPI.confirmTalentRole(selectedItem.id, selectedItem.type)
      .then((response) => {
        mixpanel_track("Assessment Role Confirmation", {
          selected_roleId: selectedItem.id,
          selected_roleName: selectedItem.name,
        });
        response?.data && dispatch(setProfileData(response.data));

        setAssessmentStep(ASSESSMENT_STEP.MAIN);
        toast.custom(<Toast type="success" message="Role confirmation successful!" />);
      })
      .then(() => init())
      .catch((err) => {
        console.log("Confirm role error: ", err);
      })
      .finally(() => {
        setLoading(false);
      });
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
      <Title title="First choose a category" className="mt-[50px] mb-8" />
      {isLoading && (
        <div className="absolute z-10 pt-28 flex w-full justify-center">
          <ColorRing
            visible={true}
            height="120"
            width="120"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#FF813460", "#FF575760", "#5F5FFF60", "#2F345460", "transparent"]}
          />
        </div>
      )}
      <Category
        assessmentData={assessmentData}
        selectedItem={selectedItem}
        onSelect={(item) => setSelectedItem(item)}
      />

      <Button className="mt-12 float-right" onClick={handleConfirm} loading={isConfirming}>
        Confirm
      </Button>
    </div>
  );
};

export default Confirmation;
