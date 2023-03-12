import React, { Dispatch, SetStateAction, useMemo } from "react";
import Button from "components/Button/ButtonV2";
import Assessment from "./Assessment";
import { UIData } from "../../AssessmentV2.data";
import { AssessmentType } from "../../AssessmentV2.types";
import { ASSESSMENT_STATUS, useAssessmentResultType } from "../../hooks";
import { Lock, Tick, CloseIcon } from "../../Icons";
import { mixpanel_track } from "helpers/mixpanel";

type Props = {
  mainData: useAssessmentResultType;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const HackerearthCoding = (props: Props) => {
  const { confirmedType, hackerearthCodingStatus, hackerearthReviewed } = props.mainData;
  const { setModalOpen } = props;
  const handleStart = () => {
    mixpanel_track("Hackerearth assessment start clicked");
    setModalOpen(true);
  };
  const handleTryAgain = () => {
    mixpanel_track("Hackerearth assessment tryagain clicked");
    setModalOpen(true);
  };

  const statusButton = useMemo(() => {
    switch (hackerearthCodingStatus) {
      case ASSESSMENT_STATUS.START:
        return <Button onClick={handleStart}>Start</Button>;
      case ASSESSMENT_STATUS.RETAKE:
        return <Button onClick={handleTryAgain}>Try again</Button>;
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
  }, [hackerearthCodingStatus, setModalOpen]);

  if (confirmedType === "RECORD") {
    return null;
  }

  return (
    <Assessment
      time={60}
      type={AssessmentType.hackerearth_coding}
      {...UIData.hackerearth_coding}
      isReviewed={hackerearthReviewed}
    >
      {statusButton}
    </Assessment>
  );
};

export default HackerearthCoding;
