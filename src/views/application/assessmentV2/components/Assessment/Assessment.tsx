import React, { useMemo } from "react";
import { Clock, Token } from "../../Icons";
import { AssessmentType } from "../../AssessmentV2.types";
import OutdefineReviewedSvg from "assets/svg/assessment/outdefine-reviewed-check.svg";

type Props = {
  image: string;
  background: string;
  stage: string | JSX.Element;
  todo: string | JSX.Element;
  time: number;
  type: AssessmentType;
  tokenAmount?: number;
  children?: JSX.Element;
  body?: JSX.Element;
  isReviewed: boolean;
};

const Badge = ({ odd, children }) => {
  const colorSet = !odd ? "bg-coral-red-hue text-coral-red" : "bg-blue2-hue text-blue2";

  return (
    <div
      className={`flex justify-center items-center rounded-[8px] text-xs font-inter text-center w-fit h-fit py-1 px-4 ${colorSet}`}
    >
      {children}
    </div>
  );
};

const testedBy = {
  introduction: "Testing by: Outdefine",
  hackerearth: "Testing by: Hackerearth",
  hackerearth_coding: "Testing by: Hackerearth",
  interview: "Interview by: Outdefine",
};

const testType = {
  introduction: "Self-record",
  hackerearth: "Multiple Choice",
  hackerearth_coding: "Coding Challenge",
  interview: "In-person interview",
};

const Assessment = (props: Props) => {
  const {
    background,
    image,
    stage,
    todo,
    type,
    time,
    tokenAmount = 0,
    children,
    body,
    isReviewed,
  } = props;

  const isInterview = useMemo(() => type === AssessmentType.interview, [type]);

  return (
    <>
      <div className="inline-block mr-3 mt-4">
        <div className="flex justify-between flex-wrap flex-col lg:flex-nowrap gap-x-5 bg-white rounded-[8px] py-3 pl-[14px] pr-5 items-center w-[341px] h-[440px]">
          <div>
            <div className="flex flex-col items-center min-h-[134px] w-full">
              <img
                src={background}
                alt="assessment"
                className="w-full rounded-[5px] h-[145px] shrink-0"
              />
              <img
                src={image}
                alt="assessment"
                className="absolute rounded-[5px] h-[145px] shrink-0 p-4"
              />
            </div>
            <div className="flex flex-col min-h-[134px] w-full">
              <div className="flex justify-between items-end mt-2 w-full">
                <Badge odd={type === AssessmentType.hackerearth}>{testedBy[type as string]}</Badge>
                <span className="font-semibold text-sm font-poppins">
                  {testType[type as string]}
                </span>
              </div>
              <div className="flex justify-between items-end mt-1 w-full">
                <div className="font-poppins text-base font-semibold">{stage}</div>
              </div>
              <div className="flex justify-between items-end mt-1 w-full">
                <div className="font-inter text-xs">{todo}</div>
              </div>

              {isReviewed && (
                <div className="flex bg-[#DCFFE4] rounded p-1 px-2 mt-[20px] mb-[9px] w-fit">
                  <span className="font-inter text-xs text-[#26993F]">
                    Outdefine reviewed &nbsp;{" "}
                  </span>
                  <img src={OutdefineReviewedSvg} alt="outdefine-reviewed-image" className="" />
                </div>
              )}

              <div className="flex xl:gap-x-40 justify-between">
                <div className="flex flex-col gap-y-1 shrink-0 "></div>
              </div>
              {body ?? null}
            </div>
          </div>
          <div className="flex justify-between items-end mt-1 w-full mb-{auto}">
            <div className="flex flex-col gap-y-1 shrink-0 ">
              {isInterview && (
                <div className="flex gap-x-2 font-inter text-xs font-semibold mt-2">
                  <Token />
                  {tokenAmount}
                </div>
              )}
              <div className="flex gap-x-2">
                <Clock />
                <span className="font-inter text-xs font-semibold">
                  {time % 60 === 0 ? time / 60 + " hrs" : time + " mins"}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-1">{children ?? null}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Assessment;
