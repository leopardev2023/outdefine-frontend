import React, { useMemo } from "react";
import Button from "components/Button/ButtonV2";
import dateUtils from "utils/dateUtils";
import Assessment from "./Assessment";
import { UIData } from "../../AssessmentV2.data";
import { AssessmentType } from "../../AssessmentV2.types";
import { ASSESSMENT_STATUS, ASSESSMENT_STEP, useAssessmentResultType } from "../../hooks";
import { Tick, CloseIcon, Lock, Letter, Calendar, Clock, BigClock } from "../../Icons";
import { mixpanel_track } from "helpers/mixpanel";
import moment from "moment";

type Props = {
  mainData: useAssessmentResultType;
};

const Interview = (props: Props) => {
  const { setAssessmentStep, bookingData, interviewReviewed } = props.mainData;
  const handleStart = () => {
    mixpanel_track("Interview schedule clicked");
    setAssessmentStep(ASSESSMENT_STEP.INTERVIEW);
  };
  const handleReschedule = () => {
    mixpanel_track("Interview reschedule clicked");
    setAssessmentStep(ASSESSMENT_STEP.INTERVIEW);
  };

  const StatusButton = () => {
    return isInterviewScheduled() ? (
      <Button onClick={handleReschedule}>Reschedule</Button>
    ) : (
      <Button onClick={handleStart}>Start</Button>
    );
  };

  const isInterviewScheduled = () => {
    if (!bookingData) return false;
    const { user, startTime } = bookingData;
    if (!user || !startTime) return false;

    return true;
  };

  const interviewData = () => {
    if (!bookingData) return undefined;
    const { user, startTime } = bookingData;
    if (!user || !startTime) return undefined;
    // const localTime = dateUtils.getLocalDateFromUTCDate(startTime);
    return (
      <div className="grid grid-cols-3 font-poppins text-xs mt-2">
        <div>
          <span>Email</span>
          <div className="flex gap-x-2 font-inter font-semibold mt-2">
            <Letter />
            <span>{user.email}</span>
          </div>
        </div>
        <div>
          <span>Date</span>
          <div className="flex gap-x-2 font-inter font-semibold mt-2">
            <Calendar />
            <span>{moment(startTime).format("YYYY/MM/DD")}</span>
          </div>
        </div>
        <div>
          <span>Time</span>
          <div className="flex gap-x-2 font-inter font-semibold mt-2">
            <Clock />
            <span>{moment(startTime).format("hh:mm A")}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Assessment
      time={20}
      tokenAmount={500}
      type={AssessmentType.interview}
      {...UIData.interview}
      body={interviewData()}
      isReviewed={interviewReviewed}
    >
      {<StatusButton />}
    </Assessment>
  );
};

export default Interview;
