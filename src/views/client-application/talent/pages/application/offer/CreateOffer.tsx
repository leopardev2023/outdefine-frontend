import { ChangeEvent, useRef, useState } from "react";

import SkillInputV2 from "views/client-application/components/SkillInputV2";

import Button from "components/Button/ButtonV2";
import IconV2 from "components/V2/Icons/IconV2";
import BadgeV2 from "components/V2/Badges/BadgeV2";
import InputV2 from "components/V2/Input/InputV2";
import IconButtonV2 from "components/V2/IconButton";
import DropdownV2 from "components/V2/Dropdown/DropdownV2";
import CheckBoxV2 from "components/V2/Buttons/CheckBoxV2";
import TextareaV2 from "components/V2/Textarea/TextareaV2";

// skill validation

import protoHelper from "helpers/prototype";

import useCreateOffer from "../../../hooks/useCreateOffer";
import {
  expData,
  locationData,
  payFreqData,
  // termData,
  // termThData,
  timezoneData,
} from "./dataTypes";
// import MonthPickerV2 from "components/V2/MonthPicker";
import { useAppDispatch } from "redux/hooks/redux-hooks";
import { initialOffer, updatedCreatedOffer } from "redux/slices/application";
import object from "helpers/object";
import formatDate from "helpers/date";

interface PropsType {
  setOfferPreviewModal: (enabled: boolean) => void;
  setExtendOfferModal: (enabled: boolean) => void;
  freelancerId: any;
  app: any;
}

const CreateOffer = ({
  setOfferPreviewModal,
  setExtendOfferModal,
  freelancerId,
  app,
}: PropsType) => {
  const dispatch = useAppDispatch();

  const { offer, disabled, skills, skillChangeHandler, offerChangeHandler, createOffer } =
    useCreateOffer(freelancerId, app, setExtendOfferModal, setOfferPreviewModal);

  const [confirm, setConfirm] = useState<boolean>(false);

  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const dueToRef = useRef<HTMLInputElement>(null);

  return (
    <div className="absolute top-[150px] left-1/2 -translate-x-1/2 z-10 pb-20">
      <div className="flex flex-col items-center bg-white w-[720px] rounded-lg px-16">
        <div className="flex flex-col justify-center items-center gap-y-5">
          <IconButtonV2
            onClick={() => {
              setExtendOfferModal(false);
              dispatch(updatedCreatedOffer(initialOffer));
            }}
            iconType="CLOSE"
            className="p-0 absolute right-6 top-6"
            iconClassName="w-5 h-5"
          />
          <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">
            Extend offer
          </h2>
          <h5 className="font-poppins text-sm font-semibold">{app?.PostedJobs?.job_title ?? ""}</h5>
        </div>
        <div className="w-full">
          <span className="font-poppins font-semibold text-sm float-left">Offer details</span>
        </div>
        <form className="flex flex-col w-full mt-5 pr-7">
          {/* Experience level & Term */}
          <div className="flex w-full gap-x-7 justify-between mb-9">
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Experience level</span>
              <DropdownV2
                icon={<IconV2 iconType="EDUCATION" iconClassName="w-4 h-4" />}
                placeholder="Select a level"
                data={expData}
                selectedValue={offer.experience_level}
                onChange={(idx: number) =>
                  offerChangeHandler("experience_level", expData[idx].value)
                }
              />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Term</span>
              <div className="w-full h-12 bg-lighter-gray rounded-lg border-[1px] border-odf flex items-center px-4">
                <IconV2 iconType="EDUCATION" iconClassName="w-4 h-4" />
                <p className="pl-2 font-inter text-xs">{offer.term}</p>
              </div>
              {/* <DropdownV2
                icon={<IconV2 iconType="EDUCATION" iconClassName="w-4 h-4" />}
                placeholder="Choose a term"
                data={termData}
                selectedValue={selectedTerm}
                onChange={(idx: number) => {
                  setOfferInfo({
                    ...offerInfo,
                    term: [termData[idx].value],
                  });
                  setSelectedTerm(termData[idx].value);
                }}
              /> */}
            </div>
          </div>
          {/* Hourly rate & Term hours */}
          <div className="flex w-full gap-x-7 justify-between mb-9">
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Hourly rate</span>
              <InputV2
                icon={<IconV2 iconType="DOLLAR-BLUE-CIRCLE" iconClassName="w-4 h-4" />}
                type="number"
                placeholder="55"
                value={offer.hourly_rate}
                onChange={(e) => offerChangeHandler("hourly_rate", Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Term hours</span>
              <div className="w-full h-12 bg-lighter-gray rounded-lg border-odf border-[1px] flex items-center px-4">
                <IconV2 iconType="CLOCK" iconClassName="w-4 h-4" />
                <p className="pl-2 font-inter text-xs">{offer.term_of_hours} /hrs</p>
                <p className="pl-4 font-inter text-xs capitalize">
                  {offer.term_of_hours_duration?.toLowerCase()}
                </p>
              </div>
              {/* <div className="flex gap-x-3">
                <div className="relative">
                  <InputV2
                    icon={<IconV2 iconType="CLOCK" iconClassName="w-4 h-4" />}
                    placeholder="55"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const value = isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value);
                      setOfferInfo({
                        ...offerInfo,
                        term_of_hours: value,
                      });
                      setTermOfHours(value);
                    }}
                    value={40}
                    validators={[successValidator]}
                    className="border-none"
                    disabled
                  />
                  <span className="absolute right-2 top-[25%]">/hrs</span>
                </div>
                <DropdownV2
                  placeholder="Select an option"
                  data={termThData}
                  selectedValue={selectedTermOfHoursUnit}
                  onChange={(idx: number) => {
                    setOfferInfo({
                      ...offerInfo,
                      term_of_hours_duration: termThData[idx].value,
                    });
                    setSelectedTermOfHoursUnit(termThData[idx].value);
                  }}
                />
              </div> */}
            </div>
          </div>
          {/* Pay Frequency & Location */}
          <div className="flex w-full gap-x-7 justify-between mb-9">
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Pay frequency</span>
              <DropdownV2
                icon={<IconV2 iconType="DOLLAR-BLUE-CIRCLE" iconClassName="w-4 h-4" />}
                placeholder="Choose pay frequency"
                data={payFreqData}
                selectedValue={offer.pay_frequency}
                onChange={(idx: number) =>
                  offerChangeHandler("pay_frequency", payFreqData[idx].value)
                }
              />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Location</span>
              <DropdownV2
                icon={<IconV2 iconType="LOCATION" iconClassName="w-4 h-4" />}
                placeholder="Choose a location"
                data={locationData.map((loc) => {
                  return { ...loc, value: loc.value?.toLowerCase() };
                })}
                selectedValue={offer.location?.toLowerCase()}
                onChange={(idx: number) => offerChangeHandler("location", locationData[idx].value)}
              />
            </div>
          </div>
          {/* Timezone & Contract length */}
          <div className="flex w-full gap-x-7 justify-between mb-2">
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Timezone</span>
              <DropdownV2
                icon={<IconV2 iconType="CLOCK-SAND" iconClassName="w-4 h-4" />}
                placeholder="Choose a timezone"
                data={timezoneData}
                selectedValue={offer.timezone}
                onChange={(idx: number) => offerChangeHandler("timezone", timezoneData[idx].value)}
              />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Contract length</span>
              <div className="relative px-4 flex items-center border-[1px] border-odf h-12 w-full rounded-lg bg-lighter-gray">
                <IconV2 iconType="DATE" iconClassName="w-4 h-4" />
                <input
                  ref={fromRef}
                  className="ml-2 w-20 px-0 border-none no-date-indicator font-inter text-xs bg-lighter-gray"
                  type="date"
                  value={offer.contract_start}
                  onChange={(e) => offerChangeHandler("contract_start", e.target.value)}
                  onClick={() => {
                    fromRef.current?.showPicker();
                  }}
                />
                -
                {offer.is_ongoing ? (
                  <span className="font-inter text-xs pl-2">Ongoing</span>
                ) : (
                  <input
                    ref={toRef}
                    className="ml-2 w-20 px-0 border-none no-date-indicator font-inter text-xs bg-lighter-gray"
                    type="date"
                    value={offer.contract_end}
                    onChange={(e) => offerChangeHandler("contract_end", e.target.value)}
                    onClick={() => {
                      toRef.current?.showPicker();
                    }}
                  />
                )}
              </div>
              <label className="block font-inter text-[10px] leading-4">
                We require a minimum 3 month contract for each hire.
              </label>
              <div className="-mt-2">
                <CheckBoxV2
                  value={"ONGOING"}
                  selected={!!offer.is_ongoing}
                  onClick={() => offerChangeHandler("is_ongoing", !offer.is_ongoing)}
                >
                  <span className="font-inter text-xs leading-6">Ongoing role</span>
                </CheckBoxV2>
              </div>
            </div>
          </div>
          {/* Duties */}
          <div className="flex flex-col w-full gap-y-4 justify-between mb-7">
            <span className="font-poppins text-xs">Welcome note</span>
            <div className="w-full">
              <TextareaV2
                value={offer.welcome_note}
                placeholder={`We are so excited for you to join us!`}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  offerChangeHandler("welcome_note", e.target.value)
                }
                className="text-xs h-[196px]"
                limitText="100 word max"
              />
            </div>
          </div>
          {/* Primary Skills & Secondary Skills */}
          {/* <div className="flex w-full gap-x-7 justify-between mb-6">
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Primary Skills (required)</span>
              <SkillInputV2
                placeholder="Type the skill followed by the space bar to add"
                onAddSkill={(idx: number) => skillChangeHandler("primary_skills", idx)}
                className="w-full h-12"
              />
              <div className="flex justify-start gap-x-2">
                {protoHelper
                  .getSkillNamesFromIDs(skills, object.safeJsonArray(offer.primary_skills) ?? [])
                  .map((elem, index) => (
                    <BadgeV2 key={elem + index} starInBadge color="pink" addClass="h-6">
                      {elem}
                    </BadgeV2>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Secondary Skills (nice to have)</span>
              <SkillInputV2
                placeholder="Type the skill followed by the space bar to add"
                onAddSkill={(idx: number) => skillChangeHandler("secondary_skills", idx)}
                className="w-full h-12"
              />
              <div className="flex justify-start gap-x-2">
                {protoHelper
                  .getSkillNamesFromIDs(skills, object.safeJsonArray(offer.secondary_skills) ?? [])
                  .map((elem, index) => (
                    <BadgeV2 key={elem + index} addClass=" h-6">
                      {elem}
                    </BadgeV2>
                  ))}
              </div>
            </div>
          </div> */}
          {/* Response due */}
          <div className="flex w-full gap-x-7 justify-between mb-6">
            <div className="flex flex-col gap-y-4 w-1/2 pr-[14px]">
              <span className="font-poppins text-xs">Response due</span>
              <div className="flex items-center px-4 w-full h-12 rounded-lg border-[1px] border-odf">
                <IconV2 iconType="DATE" iconClassName="w-4 h-4" />
                <input
                  ref={dueToRef}
                  type="date"
                  className="ml-2 no-date-indicator text-xs font-inter border-none px-0 w-20"
                  value={offer.response_due}
                  onChange={(e) => offerChangeHandler("response_due", e.target.value)}
                  onClick={() => dueToRef.current?.showPicker()}
                  min={formatDate.yyyy_mm_dd(new Date().toLocaleDateString())}
                />
              </div>
              {/* <MonthPickerV2
                icon={<IconV2 iconType="DATE" iconClassName="w-4 h-4" />}
                value={{
                  year: !!dueDate ? new Date(dueDate).getFullYear() : new Date().getFullYear(),
                  month: !!dueDate ? new Date(dueDate).getMonth() : new Date().getMonth() + 1,
                }}
                onChange={(value: { year: string; month: string }) => {
                  setDueDate(
                    new Date(Number(value.year), Number(value.month), 1, 0, 0, 0).toDateString(),
                  );
                }}
              /> */}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-9">
            <CheckBoxV2 value={"Confirm"} selected={confirm} onClick={() => setConfirm(!confirm)}>
              <span className="font-inter text-xs leading-6">
                By extending an offer, you agree to hire the talent full-time for minimum 3 month
                contract period. Outdefine will manage the payroll, 1 week risk-free trial and
                service fees associated with the hire.
              </span>
            </CheckBoxV2>
          </div>
        </form>
        <div className="mb-8">
          <Button
            disabled={disabled || !confirm}
            type="button"
            variant="primary"
            onClick={createOffer}
          >
            Create offer
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CreateOffer;
