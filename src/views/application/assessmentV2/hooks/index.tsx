import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import AssessmentAPI from "network/assessment";
import { useAppSelector } from "redux/hooks/redux-hooks";
import { getItem } from "utils/storageUtils";
import { JobPropsType, JobType, RoleType } from "redux/slices/prototype";
import { mixpanel_track } from "helpers/mixpanel";
import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

export enum ASSESSMENT_STEP {
  ROLE_CONFIRMATION = 0,
  MAIN = 1,
  CONGRATULATIONS = 2,
  INTERVIEW = 3,
}

export enum ASSESSMENT_STATUS {
  START = "start",
  UNDER_REVIEW = "under_review",
  FAILED = "failed",
  PASSED = "passed",
  RETAKE = "retake",
}

export enum BANNER_STATUS {
  INITIALIZATION = "initialization",
  TRYAGAIN = "tryagain",
  FAILED = "failed",
  CONGRATULATIONS = "congratulations",
  BLANK = "blank",
}

export type useAssessmentResultType = {
  profile: ITalentProfileV2;
  prototype: JobPropsType;
  currentIndustry: JobType | undefined;
  currentRole: RoleType | undefined;
  assessmentStep: number;
  confirmedType: string;
  introStatus: ASSESSMENT_STATUS;
  isGettingAssessment: boolean;
  hackerearthMcqStatus: ASSESSMENT_STATUS;
  hackerearthCodingStatus: ASSESSMENT_STATUS;
  interviewStatus: ASSESSMENT_STATUS;
  assessmentTitle: string;
  bannerStatus: BANNER_STATUS;
  bookingData: Record<any, any> | undefined;
  isHackerearthUrlAvailable: boolean;
  setAssessmentStep: Dispatch<SetStateAction<number>>;
  gotoMcqAssessment: () => Promise<void>;
  gotoCodingAssessment: () => Promise<void>;
  init: () => Promise<void>;
  isLoading: boolean;

  introductionReviewed: boolean;
  hackerearthReviewed: boolean;
  interviewReviewed: boolean;
};

export const useAssessment = (): useAssessmentResultType => {
  const profile = useAppSelector((state) => state.profile);
  const prototype = useAppSelector((state) => state.prototype);
  const [assessmentInfo, setAssessmentInfo] = useState<Record<any, any> | undefined>(undefined);
  const [assessmentStep, setAssessmentStep] = useState(ASSESSMENT_STEP.ROLE_CONFIRMATION);
  const primaryRoleConfirmed = useMemo(() => assessmentInfo?.confirmed, [assessmentInfo]);
  const assessmentTitle = useMemo(() => assessmentInfo?.assessmentTitle, [assessmentInfo]);
  const confirmedType = useMemo(() => assessmentInfo?.confirmed_type, [assessmentInfo]);
  const [introStatus, setIntroStatus] = useState(ASSESSMENT_STATUS.START);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isGettingAssessment, setIsGettingAssessment] = useState<boolean>(false);
  const [hackerearthMcqStatus, setHackerearthMcqStatus] = useState(ASSESSMENT_STATUS.START);
  const [hackerearthCodingStatus, setHackerearthCodingStatus] = useState(ASSESSMENT_STATUS.START);
  const [interviewStatus, setInterviewStatus] = useState(ASSESSMENT_STATUS.START);
  const [isHackerearthUrlAvailable, setHackerearthUrlAvailable] = useState<boolean>(true);
  const [bookingData, setBookingData] = useState(undefined);

  const [introductionReviewed, setIntroductionReviewed] = useState<boolean>(false);
  const [hackerearthReviewed, setHackerearthReviewed] = useState<boolean>(false);
  const [interviewReviewed, setInterviewReviewed] = useState<boolean>(false);

  /**
   * @description Banner status
   */
  const bannerStatus = useMemo(() => {
    if (!assessmentInfo) return BANNER_STATUS.BLANK;

    const { confirmed_type } = assessmentInfo;
    if (
      hackerearthMcqStatus === ASSESSMENT_STATUS.RETAKE ||
      hackerearthCodingStatus === ASSESSMENT_STATUS.RETAKE
    ) {
      return BANNER_STATUS.TRYAGAIN;
    } else if (
      hackerearthMcqStatus === ASSESSMENT_STATUS.FAILED ||
      hackerearthCodingStatus === ASSESSMENT_STATUS.FAILED ||
      introStatus === ASSESSMENT_STATUS.FAILED ||
      interviewStatus === ASSESSMENT_STATUS.FAILED
    ) {
      return BANNER_STATUS.FAILED;
    } else if (
      confirmed_type?.toLowerCase() === "record" &&
      introStatus === ASSESSMENT_STATUS.PASSED
    ) {
      return BANNER_STATUS.CONGRATULATIONS;
    } else if (
      confirmed_type?.toLowerCase() === "hackerearth" &&
      introStatus === ASSESSMENT_STATUS.PASSED &&
      hackerearthMcqStatus === ASSESSMENT_STATUS.PASSED &&
      hackerearthCodingStatus === ASSESSMENT_STATUS.PASSED
    ) {
      return BANNER_STATUS.CONGRATULATIONS;
    }

    return BANNER_STATUS.BLANK;
  }, [introStatus, hackerearthMcqStatus, hackerearthCodingStatus, interviewStatus, assessmentInfo]);

  /**
   * @description Candidate primary industry & role
   */
  const currentIndustry = useMemo(
    () => prototype.data.find((item) => item.job_type_id === profile.industry_id),
    [prototype.data, profile.industry_id],
  );

  const currentRole = useMemo(
    () => prototype.roles.find((item) => item.id === profile.role),
    [prototype.roles, profile.role],
  );

  /**
   * @description Initialization
   */
  const init = async () => {
    setLoading(true);
    const assessmentData: any = await AssessmentAPI.getAssessmentInfoByEmail({
      email_id: getItem("email"),
    })
      .then((res) => res.data?.data)
      .catch((e) => {
        setLoading(false);
        console.log("Error: Unable to fetch assessment info");
      });

    setLoading(false);
    setAssessmentInfo(assessmentData);
    if (!assessmentData) return;

    /**
     * @notice init introduction status
     */
    const { introduction_status } = assessmentData;
    let s: ASSESSMENT_STATUS = ASSESSMENT_STATUS.START;
    switch (introduction_status) {
      case "TODO":
        s = ASSESSMENT_STATUS.START;
        break;
      case "SUBMITTED":
        s = ASSESSMENT_STATUS.RETAKE;
        break;
      case "PASSED":
        s = ASSESSMENT_STATUS.PASSED;
        break;
      case "FAILED":
        s = ASSESSMENT_STATUS.FAILED;
        break;
      default:
    }
    setIntroStatus(s);

    /**
     * @notice init assessment status
     */
    const { mcq_passed, mcq_taken_count } = assessmentData;
    setHackerearthMcqStatus(getHackerearthStatus(mcq_passed, mcq_taken_count));

    const { coding_passed, coding_taken_count } = assessmentData;
    setHackerearthCodingStatus(getHackerearthStatus(coding_passed, coding_taken_count));

    /**
     * @notice fetch booking data
     */
    const { booking_uid } = assessmentData;
    if (!booking_uid) {
      setBookingData(undefined);
      return;
    }
    const booking: any = await AssessmentAPI.getBookingByUid(booking_uid)
      .then((response) => response?.data?.booking)
      .catch((err) => console.log("Fetch booking err: ", err));
    setBookingData(booking);
  };

  const getHackerearthStatus = (isPassed, takenCount) => {
    let status: ASSESSMENT_STATUS = ASSESSMENT_STATUS.START;

    if (isPassed === false && takenCount === 0) {
      status = ASSESSMENT_STATUS.START;
    } else if (isPassed === false && takenCount < 3) {
      status = ASSESSMENT_STATUS.RETAKE;
    } else if (isPassed === false && takenCount >= 3) {
      status = ASSESSMENT_STATUS.FAILED;
    } else if (isPassed === true) {
      status = ASSESSMENT_STATUS.PASSED;
    }

    return status;
  };

  /**
   * @description determine interview status
   * @description interview status depends on other status(introStatus, hackerearthStatus) as well
   */
  useEffect(() => {
    if (!assessmentInfo) return;
    const { booking_uid, assessment_type, interview_status } = assessmentInfo;
    let s: ASSESSMENT_STATUS = ASSESSMENT_STATUS.START;

    if (interview_status === "PASSED") {
      s = ASSESSMENT_STATUS.PASSED;
    } else if (interview_status === "FAILED") {
      s = ASSESSMENT_STATUS.FAILED;
    } else if (booking_uid || interview_status === "SUBMITTED") {
      s = ASSESSMENT_STATUS.UNDER_REVIEW;
    } else if (!booking_uid && interview_status !== "SUBMITTED") {
      s = ASSESSMENT_STATUS.START;
    }

    if (assessment_type?.toLowerCase() === "record") {
      // for non-engineering talents
      if (introStatus !== ASSESSMENT_STATUS.PASSED) {
        s = ASSESSMENT_STATUS.START;
      }
    } else {
      // for engineering talents
      if (
        introStatus !== ASSESSMENT_STATUS.PASSED ||
        hackerearthCodingStatus !== ASSESSMENT_STATUS.PASSED ||
        hackerearthMcqStatus !== ASSESSMENT_STATUS.PASSED
      ) {
        s = ASSESSMENT_STATUS.START;
      }
    }
    setInterviewStatus(s);

    setIntroductionReviewed(assessmentInfo.introduction_reviewed);
    setHackerearthReviewed(assessmentInfo.hackerearth_reviewed);
    setInterviewReviewed(assessmentInfo.interview_reviewed);
  }, [introStatus, hackerearthCodingStatus, hackerearthMcqStatus, assessmentInfo]);

  useEffect(() => {
    init();
  }, []);

  /**
   * @description determine current Assessment screen (role_confirmation, main, congratulations)
   */
  useEffect(() => {
    let step: ASSESSMENT_STEP = ASSESSMENT_STEP.MAIN;

    if (profile.is_trusted_talent === "TRUSTED") step = ASSESSMENT_STEP.CONGRATULATIONS;
    else if (!primaryRoleConfirmed) {
      step = ASSESSMENT_STEP.ROLE_CONFIRMATION;
    } else {
      step = ASSESSMENT_STEP.MAIN;
    }
    setAssessmentStep(step);
  }, [primaryRoleConfirmed, profile]);

  const gotoMcqAssessment = async () => {
    const emailId = getItem("email");
    setIsGettingAssessment(true);
    try {
      const assessmentResponse = await AssessmentAPI.startMcqAssessment({
        email_id: emailId,
      });

      if (assessmentResponse?.data?.status === 500) {
        throw new Error(`${assessmentResponse?.data?.message}`);
      }

      const inviteUrls = assessmentResponse.data?.data?.invite_urls;
      if (inviteUrls && inviteUrls[emailId]) {
        setHackerearthUrlAvailable(true);
        mixpanel_track("Hackerearth assessment redirected", { emailId });
        window.open(inviteUrls[emailId], "_blank");
      } else {
        setHackerearthUrlAvailable(false);
        toast.custom(
          <Toast type="success" message="Check your email for your assessment invite!" />,
        );
      }
      mixpanel_track("Hackerearth assessment requested", { emailId });
      setIsGettingAssessment(false);
    } catch (err) {
      setIsGettingAssessment(false);
      console.error("Get Recommended Test Error: ", err);
    }
  };

  const gotoCodingAssessment = async () => {
    const emailId = getItem("email");
    setIsGettingAssessment(true);
    try {
      const assessmentResponse = await AssessmentAPI.startCodingAssessment({
        email_id: emailId,
      });

      if (assessmentResponse?.data?.status === 500) {
        throw new Error(`${assessmentResponse?.data?.message}`);
      }

      const inviteUrls = assessmentResponse.data?.data?.invite_urls;
      if (inviteUrls && inviteUrls[emailId]) {
        setHackerearthUrlAvailable(true);
        mixpanel_track("Hackerearth assessment redirected", { emailId });
        window.open(inviteUrls[emailId], "_blank");
      } else {
        setHackerearthUrlAvailable(false);
        toast.custom(
          <Toast type="success" message="Check your email for your assessment invite!" />,
        );
      }
      mixpanel_track("Hackerearth assessment requested", { emailId });
      setIsGettingAssessment(false);
    } catch (err) {
      setIsGettingAssessment(false);
      console.error("Get Recommended Test Error: ", err);
    }
  };

  return {
    profile,
    prototype,
    currentRole,
    currentIndustry,
    assessmentStep,
    introStatus,
    isGettingAssessment,
    hackerearthMcqStatus,
    hackerearthCodingStatus,
    interviewStatus,
    bannerStatus,
    bookingData,
    isHackerearthUrlAvailable,
    assessmentTitle,
    setAssessmentStep,
    gotoMcqAssessment,
    gotoCodingAssessment,
    init,
    confirmedType,
    isLoading,
    introductionReviewed,
    hackerearthReviewed,
    interviewReviewed,
  };
};
