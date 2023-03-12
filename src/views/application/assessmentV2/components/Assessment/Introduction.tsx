import React, { useMemo, useCallback, Dispatch, SetStateAction } from "react";
import Button from "components/Button/ButtonV2";
import Assessment from "./Assessment";
import { UIData } from "../../AssessmentV2.data";
import { AssessmentType } from "../../AssessmentV2.types";
import { ASSESSMENT_STATUS, ASSESSMENT_STEP, useAssessmentResultType } from "../../hooks";
import { Lock, BigClock, Tick, CloseIcon } from "../../Icons";

type Props = {
  mainData: useAssessmentResultType;
  setIntroModalOpen: Dispatch<SetStateAction<boolean>>;
};

const Introduction = (props: Props) => {
  const { setAssessmentStep, introStatus, introductionReviewed } = props.mainData;
  const { setIntroModalOpen } = props;

  const handleStart = useCallback(() => {
    console.log(
      "redirect to myinterview.com ===> https://start.myinterview.com/jwchsts462ytm0aszwad1iy1/outdefine/outdefine-trusted-talent-interview",
    );
    setIntroModalOpen(true);
  }, [setAssessmentStep]);

  const statusButton = useMemo(() => {
    switch (introStatus) {
      case ASSESSMENT_STATUS.START:
        return <Button onClick={handleStart}>Start</Button>;
      case ASSESSMENT_STATUS.UNDER_REVIEW:
        return (
          <div className="font-semibold font-poppins text-sm flex items-center justify-center gap-x-2">
            <BigClock />
            Under Review
          </div>
        );
      case ASSESSMENT_STATUS.RETAKE:
        return <Button onClick={handleStart}>Retake</Button>;
      case ASSESSMENT_STATUS.FAILED:
        return (
          <div className="font-semibold font-poppins text-sm flex items-center justify-center gap-x-2">
            <CloseIcon />
            Failed
          </div>
        );
      case ASSESSMENT_STATUS.PASSED:
        return (
          <div className="font-semibold font-poppins text-sm flex items-center justify-center gap-x-2">
            <Tick />
            Completed
          </div>
        );
      default:
        return undefined;
    }
  }, [handleStart, introStatus]);

  return (
    <Assessment
      time={10}
      type={AssessmentType.introduction}
      {...UIData.introduction}
      isReviewed={introductionReviewed}
    >
      {statusButton}
    </Assessment>
  );
};

export default Introduction;
