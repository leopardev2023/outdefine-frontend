import { ChangeEvent, useRef } from "react";

import Button from "components/Button/ButtonV2";
import expSVG from "assets/svg/talent/exp.svg";
import locationSVG from "assets/svg/talent/location.svg";
import dollarSVG from "assets/svg/talent/dollar.svg";
import timerSVG from "assets/svg/talent/timer.svg";

import InputV2 from "components/V2/Input/InputV2";
import DropdownV2 from "components/V2/Dropdown/DropdownV2";
import CheckBoxV2 from "components/V2/Buttons/CheckBoxV2";

import IconButtonV2 from "components/V2/IconButton/IconButtonV2";

import useUpdateContract from "views/client-application/talent/hooks/useUpdateContract";
import IconV2 from "components/V2/Icons";
import formatDate from "helpers/date";

interface PropsType {
  setUpdateModal: (enabled: boolean) => void;
  selectedItem: any;
  onRefetch: () => void;
}

const UpdateTalent = ({ setUpdateModal, selectedItem, onRefetch }: PropsType) => {
  const {
    pending,
    expData,
    locationData,
    timezoneData,
    statusData,
    payFreqData,

    //
    contract,
    update,
    onChangeHandler,
  } = useUpdateContract(setUpdateModal, selectedItem, onRefetch);

  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  return (
    <div className="absolute top-[150px] left-1/2 -translate-x-1/2 z-10 pb-20">
      <div className="flex flex-col items-center bg-white w-[720px] rounded-lg px-16">
        <IconButtonV2
          onClick={() => setUpdateModal(false)}
          iconType="CLOSE"
          className="p-0 absolute right-6 top-6"
        />

        <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center mb-5">
          Update contract
        </h2>
        <h5 className="font-poppins text-sm font-semibold">{selectedItem?.position}</h5>
        <form className="flex flex-col w-full mt-5 overflow-y-scroll pr-7">
          {/* Experience level & Term */}
          <div className="flex w-full gap-x-7 justify-between mb-9">
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Experience level</span>
              <DropdownV2
                icon={<img alt="expSVG" src={expSVG} className="w-4 h-4" />}
                placeholder="Select a level"
                data={expData}
                selectedValue={contract.experience_level}
                onChange={(idx: number) => {
                  onChangeHandler("experience_level", expData[idx].value);
                }}
              />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Term</span>
              <div className="w-full h-12 bg-lighter-gray rounded-lg border-[1px] border-odf flex items-center px-4">
                <IconV2 iconType="EDUCATION" iconClassName="w-4 h-4" />
                <p className="pl-4 font-inter text-xs">{contract.term}</p>
              </div>
            </div>
          </div>
          {/* Hourly rate & Term hours */}
          <div className="flex w-full gap-x-7 justify-between mb-9">
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Hourly rate</span>
              <InputV2
                icon={<img alt="dollarSVG" src={dollarSVG} className="w-4 h-4" />}
                placeholder="55"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  onChangeHandler("hourly_rate", parseInt(e.target.value));
                }}
                value={contract.hourly_rate}
              />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Term hours</span>
              <div className="w-full h-12 bg-lighter-gray rounded-lg border-odf border-[1px] flex items-center px-4">
                <IconV2 iconType="CLOCK" iconClassName="w-4 h-4" />
                <p className="pl-4 font-inter text-xs">{contract.term_of_hours} /hrs</p>
                <p className="pl-4  font-inter text-xs capitalize">
                  {contract.term_of_hours_duration?.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
          {/* Pay Frequency & Location */}
          <div className="flex w-full gap-x-7 justify-between mb-9">
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Pay frequency</span>
              <DropdownV2
                icon={<img alt="dollarSVG" src={dollarSVG} className="w-4 h-4" />}
                placeholder="Choose pay frequency"
                data={payFreqData}
                selectedValue={contract.pay_frequency}
                onChange={(idx: number) => {
                  onChangeHandler("pay_frequency", payFreqData[idx].value);
                }}
              />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Location</span>
              <DropdownV2
                icon={<img alt="locationSVG" src={locationSVG} className="w-4 h-4" />}
                placeholder="Choose a location"
                data={locationData.map((loc) => {
                  return { ...loc, value: loc.value?.toLowerCase() };
                })}
                selectedValue={contract.location?.toLowerCase()}
                onChange={(idx: number) => {
                  onChangeHandler("location", locationData[idx].value);
                }}
              />
            </div>
          </div>
          {/* Timezone & Contract length */}
          <div className="flex w-full gap-x-7 justify-between mb-2">
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Timezone</span>
              <DropdownV2
                icon={<img alt="timerSVG" src={timerSVG} className="w-4 h-4" />}
                placeholder="Choose a timezone"
                data={timezoneData}
                selectedValue={contract.timezone}
                onChange={(idx: number) => {
                  onChangeHandler("timezone", timezoneData[idx].value);
                }}
              />
            </div>
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-poppins text-xs">Contract length</span>
              <div className="px-4 flex items-center border-[1px] border-odf h-12 w-full rounded-lg bg-lighter-gray">
                <IconV2 iconType="DATE" iconClassName="w-4 h-4" />
                <input
                  ref={fromRef}
                  className="ml-5 w-20 px-0 border-none no-date-indicator font-inter text-xs bg-lighter-gray"
                  type="date"
                  value={contract.contract_start}
                  onChange={(e) => onChangeHandler("contract_start", e.target.value)}
                  onClick={() => {
                    fromRef.current?.showPicker();
                  }}
                />
                -
                {contract.is_ongoing ? (
                  <span className="font-inter text-xs pl-2">Ongoing</span>
                ) : (
                  <input
                    ref={toRef}
                    className="ml-2 w-20 px-0 border-none no-date-indicator font-inter text-xs bg-lighter-gray"
                    type="date"
                    value={contract.contract_end}
                    onChange={(e) => onChangeHandler("contract_end", e.target.value)}
                    onClick={() => {
                      toRef.current?.showPicker();
                    }}
                  />
                )}
              </div>
              <CheckBoxV2
                value={"OPTION1"}
                selected={contract.is_ongoing}
                onClick={() => onChangeHandler("is_ongoing", !contract.is_ongoing)}
              >
                <span className="font-inter text-xs leading-6">Ongoing role</span>
              </CheckBoxV2>
            </div>
          </div>
          {/* Response due */}
          <div className="flex w-full gap-x-7 justify-between">
            <div className="flex flex-col gap-y-4 w-1/2 pr-[14px]">
              <span className="font-poppins text-xs">Status</span>
              <DropdownV2
                directionUp
                placeholder="Choose a status"
                data={statusData}
                selectedValue={contract.contract_status}
                onChange={(idx: number) => {
                  onChangeHandler("contract_status", statusData[idx].value);
                }}
              />
            </div>
            {contract.contract_status === "Inactive" && (
              <div className="flex flex-col gap-y-4 w-1/2 pr-[14px]">
                <span className="font-poppins text-xs">Set inactive date</span>
                <InputV2
                  type="date"
                  icon={<IconV2 iconType="DATE" iconClassName="w-4 h-4" />}
                  name="inactive_date"
                  placeholder="MM/DD/YYYY"
                  value={contract.inactivated_date}
                  onChange={(e) => onChangeHandler("inactivated_date", e.target.value)}
                  min={formatDate.yyyy_mm_dd(contract.contract_start)}
                />
              </div>
            )}
          </div>
        </form>
        <div className="mb-8 mt-10">
          <Button
            className="w-[160px] px-0"
            type="button"
            variant="primary"
            onClick={update}
            loading={pending}
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};
export default UpdateTalent;
