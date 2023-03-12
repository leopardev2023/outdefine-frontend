import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { isEmpty } from "@aws-amplify/core";

import { FormCheckBoxV2 } from "components/V2/Buttons/CheckBoxV2";
import Button from "components/Button/ButtonV2";

import bgComImg from "assets/onboard/bgCom.png";
import { OnboardComponentProps } from "../Onboard.types";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import { setOnboardFields } from "redux/slices/clientOnboard";
import moment from "moment";

const MasterService = (props: OnboardComponentProps) => {
  const { feed } = props;
  const dispatch = useAppDispatch();
  const onboard = useAppSelector((root) => root.clientOnboard);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      termAgreement: onboard.termAgreement,
      termAuthorize: onboard.termAuthorize,
    },
  });
  const [contents, setContents] = useState(Object);

  const init = async () => {
    setContents(feed?.msa);
  };

  useEffect(() => {
    init();
  }, []);

  const onSubmit = (data) => {
    console.log({ data });
    props.goNext();
    dispatch(setOnboardFields(data));
  };

  return (
    <form className="mt-16" onSubmit={handleSubmit(onSubmit)}>
      {/**
       * ------------------------ Banner ------------------------
       */}
      <div className="flex justify-start items-center w-full bg-orange-hue-1 pt-2 pb-2 md:pb-0 gap-x-5 rounded-md flex-wrap md:flex-nowrap">
        <div className="w-[137px] h-[117px] relative shrink-0 pl-4">
          <img alt="bgBikeImg" src={bgComImg} className="w-[137px] h-[117px] absolute bg-contain" />
        </div>
        <div className="flex flex-col gap-y-2 px-5">
          <span className="font-poppins font-semibold text-sm">Master Service Agreement</span>
          <span className="text-xs font-inter">
            This master services agreement represents the terms for governing, sourcing and hiring
            of talent on the platform between your company and Outdefine. Please contact us at
            sales@outdefine.com or via the chat if you have any questions.
          </span>
        </div>
      </div>
      {/**
       * ----------------------- Master Service Content ----------------------
       */}
      <div className="flex justify-between w-full mt-12">
        <div className="flex w-full flex-col gap-y-5 bg-white px-12 py-8 rounded-md">
          <div className="h-[436px] overflow-y-auto">
            <div className="flex flex-col gap-y-3 mt-5">
              <h1 className="font-bold font-poppins text-base">{contents.title}</h1>
              <span className="font-inter text-xs">
                {contents?.summary
                  ?.replace("__today__date__", moment().format("MM/DD/YYYY"))
                  .replace("__client__", onboard?.companyName)}
              </span>
            </div>

            {!isEmpty(contents.sections) &&
              contents.sections?.map((item, index: number) => (
                <div key={index} className="flex flex-col gap-y-3 mt-5">
                  <span className="font-poppins text-sm font-semibold">{item.title}</span>
                  {item.contents?.map((cont, ind: number) => (
                    <span key={ind} className="font-inter text-xs">
                      {cont}
                    </span>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/**
       * ---------------------- Agreement -----------------------
       */}
      <div className="text-xs font-inter mt-14">
        <FormCheckBoxV2
          name={"termAgreement"}
          control={control}
          value=""
          rules={{ required: true }}
        >
          <span className={`leading-6 ${errors?.termAgreement && "text-red"}`}>
            {"I agree to Outdefine’s Master Service Agreement."}
          </span>
        </FormCheckBoxV2>
        <FormCheckBoxV2
          name={"termAuthorize"}
          control={control}
          value=""
          rules={{ required: true }}
        >
          <span className={`leading-6 ${errors?.termAuthorize && "text-red"}`}>
            I am authorized to agree to these terms on behalf of my company.
          </span>
        </FormCheckBoxV2>
      </div>
      {/**
       * ---------------- Submit --------------------
       */}
      <div className="flex w-full justify-between mt-12">
        <Button type="button" variant="secondary" onClick={props.goBack}>
          Back
        </Button>
        <Button type="submit" disabled={!isEmpty(errors)}>
          Next
        </Button>
      </div>
    </form>
  );
};

export default MasterService;
