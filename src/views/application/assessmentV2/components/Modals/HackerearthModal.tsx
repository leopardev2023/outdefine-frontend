import ModalV2 from "components/Modal/ModalV2";
import React, { Dispatch, SetStateAction } from "react";
import { CloseIcon, TestBoy } from "../../Icons";
import Button from "components/Button/ButtonV2";
import { ASSESSMENT_STATUS } from "../../hooks";

type Props = {
  isOpened: boolean;
  isGettingAssessment: boolean;
  isHackerearthUrlAvailable: boolean;
  status: string;
  gotoAssessment: () => void;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const HackerearthModal = ({
  isOpened,
  isGettingAssessment,
  isHackerearthUrlAvailable,
  gotoAssessment,
  setOpened,
  status,
}: Props) => {
  return (
    <ModalV2 isOpen={isOpened}>
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className="overflow-hidden w-[680px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
      >
        <CloseIcon
          className="absolute right-14 top-9 z-10 cursor-pointer"
          onClick={() => setOpened(!isOpened)}
        />
        <div className="bg-white w-[680px] relative pt-[76px] pb-[60px] rounded-[8px] text-center">
          <h1 className="max-w-[360px] mx-auto text-[20px] font-poppins font-semibold text-black">
            {!isHackerearthUrlAvailable
              ? "Check your email for your assessment invite!"
              : status === ASSESSMENT_STATUS.START
              ? "You will be redirected to Hackerarth and receive an email invitation"
              : status === ASSESSMENT_STATUS.RETAKE
              ? "You will receive an email invitation"
              : ""}
          </h1>
          <img src={TestBoy} alt="hackerearth" width={186} className="mx-auto" />
          <div className="flex justify-center mt-10">
            <Button onClick={() => gotoAssessment()} loading={isGettingAssessment}>
              Start Assessment
            </Button>
          </div>
        </div>
      </div>
    </ModalV2>
  );
};

export default HackerearthModal;
