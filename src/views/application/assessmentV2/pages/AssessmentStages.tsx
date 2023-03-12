import React, { useMemo, useState } from "react";
import {
  Introduction,
  Hackerearth,
  HackerearthCoding,
  Interview,
  Title,
  Banner,
} from "../components";
import {
  ASSESSMENT_STATUS,
  ASSESSMENT_STEP,
  BANNER_STATUS,
  useAssessmentResultType,
} from "../hooks";
import { BackIcon } from "../Icons";
import { BannerData } from "../AssessmentV2.data";
import HackerearthModal from "../components/Modals/HackerearthModal";
import MyInterviewModal from "../components/Modals/MyInterviewModal";
import assessmentAPI from "network/assessment";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import { ColorRing } from "react-loader-spinner";

type Props = {
  mainData: useAssessmentResultType;
};

const AssessmentStages = (props: Props) => {
  const { mainData } = props;
  const userId = useSelector((root: RootState) => root.authentication.userId);
  const {
    introStatus,
    hackerearthCodingStatus,
    hackerearthMcqStatus,
    isGettingAssessment,
    gotoMcqAssessment,
    gotoCodingAssessment,
    bannerStatus,
    isHackerearthUrlAvailable,
    setAssessmentStep,
    assessmentTitle,
    isLoading,
  } = mainData;
  const [isOpened, setOpened] = useState<boolean>(false);
  const [isCodingModalOpened, setCodingModalOpened] = useState<boolean>(false);
  const [isIntroModalOpened, setIntroModalOpened] = useState<boolean>(false);
  const isAssessmentsClean = useMemo(
    () =>
      introStatus === ASSESSMENT_STATUS.START &&
      hackerearthMcqStatus === ASSESSMENT_STATUS.START &&
      hackerearthCodingStatus === ASSESSMENT_STATUS.START,
    [introStatus, hackerearthMcqStatus, hackerearthCodingStatus],
  );

  const cancelConfirmationRole = async () => {
    setAssessmentStep(ASSESSMENT_STEP.ROLE_CONFIRMATION);

    const assessmentResponse = await assessmentAPI.cancelCandidateRoleConfirmation(Number(userId));

    if (assessmentResponse?.data?.status === 500) {
      throw new Error(`${assessmentResponse?.data?.message}`);
    }

    // const inviteUrls = assessmentResponse.data?.data?.invite_urls;
    // if (inviteUrls && inviteUrls[emailId]) {
    //   setHackerearthUrlAvailable(true);
    //   mixpanel_track("Hackerearth assessment redirected", { emailId });
    //   window.open(inviteUrls[emailId], "_blank");
    // } else if (
    //   !inviteUrls &&
    //   assessmentResponse.data?.data?.log_message?.indexOf("Test reset") >= 0
    // ) {
    //   toast.info("Check your email for your assessment invite!");
    //   setHackerearthUrlAvailable(false);
    // } else {
    //   setHackerearthUrlAvailable(false);
    //   toast.info("Check your email for your assessment invite!");
    // }
    // mixpanel_track("Hackerearth assessment requested", { emailId });
    // setIsGettingAssessment(false);
  };

  const handleBackToConfirmation = () => {
    if (isAssessmentsClean) {
      cancelConfirmationRole();
    }
  };

  return (
    <div className="mt-7">
      <span className="font-inter font-semibold text-xs text-inactive-gray">
        Begin your assessment when your ready. Once you are a trusted member you can start applying
        to jobs. Earn 500 token rewards once this step is completed.
      </span>
      {/* <Title title={`${assessmentTitle ?? "Assessments"} Assessment`} className="my-8" /> */}
      {bannerStatus === BANNER_STATUS.BLANK ? null : (
        <Banner {...BannerData[bannerStatus]} wrapperClass="mt-13" />
      )}
      <div className="relative flex flex-col mt-10 gap-y-10">
        <BackIcon
          className={`absolute top-0 -left-8 cursor-pointer ${
            !isAssessmentsClean ? "opacity-30" : ""
          }`}
          onClick={handleBackToConfirmation}
        />

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

        <div className="mt-[16px]" style={{ width: "calc(100% + 170px)" }}>
          <Introduction mainData={mainData} setIntroModalOpen={setIntroModalOpened} />
          <Hackerearth mainData={mainData} setModalOpen={setOpened} />
          <HackerearthCoding mainData={mainData} setModalOpen={setCodingModalOpened} />
          <Interview mainData={mainData} />
        </div>
      </div>
      <HackerearthModal
        isOpened={isOpened}
        isGettingAssessment={isGettingAssessment}
        isHackerearthUrlAvailable={isHackerearthUrlAvailable}
        setOpened={setOpened}
        status={hackerearthMcqStatus}
        gotoAssessment={gotoMcqAssessment}
      />
      <HackerearthModal
        isOpened={isCodingModalOpened}
        isGettingAssessment={isGettingAssessment}
        isHackerearthUrlAvailable={isHackerearthUrlAvailable}
        setOpened={setCodingModalOpened}
        status={hackerearthCodingStatus}
        gotoAssessment={gotoCodingAssessment}
      />
      <MyInterviewModal isOpened={isIntroModalOpened} setOpened={setIntroModalOpened} />
    </div>
  );
};

export default AssessmentStages;
