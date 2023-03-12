import { LogoWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";
import { useState } from "react";

import ModalV2 from "components/Modal/ModalV2";
import InputV2 from "components/V2/Input/InputV2";
import Button from "components/Button/ButtonV2";
import IconV2 from "components/V2/Icons/IconV2";
import BadgeV2 from "components/V2/Badges/BadgeV2";
import DropdownV2 from "components/V2/Dropdown/DropdownV2";
import CheckBoxV2 from "components/V2/Buttons/CheckBoxV2";
import useEditJobContract from "../hooks/useEditJobContract";
import IconButtonV2 from "components/V2/IconButton/IconButtonV2";
import formatDate from "helpers/date";

const statusArray = [
  { index: 0, value: "active" },
  { index: 1, value: "inactive" },
];

export interface IContractCard extends IJobContractV2 {
  active: boolean;
  updatedAt: Date;
  onRefetch?: () => void;
}

export default function ContractCard(props: IContractCard) {
  const {
    pending,
    confirmed,
    inactiveDate,
    visibility,
    jobStatusEditHandler,
    setConfirmed,
    setInactiveDate,
    setVisibility,
  } = useEditJobContract(props);

  console.log(props);

  const [status, setStatus] = useState<string>(props.contract_status);

  const enabled = status === "inactive" && inactiveDate !== undefined && confirmed;

  return (
    <>
      <div className="w-full rounded-lg shadow-card bg-white p-[24px_24px_14px_16px]">
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-[14px] h-fit">
              <div className="w-[45px] h-[45px] rounded-full overflow-hidden">
                <LogoWithDefaultV2 src={props.Company.logo ?? ""} />
              </div>

              <div>
                <h3 className="font-bold text-base">{props.position}</h3>
                <div className="flex items-center gap-2 font-inter font-semibold text-sm text-dark-gray">
                  <IconV2 iconType="COMPANY" iconClassName="w-5 h-5" />
                  {props.Company.name}
                </div>
              </div>
            </div>
            <div className="mt-4 pl-[60px] w-[520px] h-fit flex gap-x-4 gap-y-2 flex-wrap">
              <BadgeV2>
                <span className="first-letter:capitalize">{props.term.toLowerCase()}</span>
              </BadgeV2>
              <BadgeV2>{props.experience_level}</BadgeV2>
              <BadgeV2>
                {props.term_of_hours} /hrs&nbsp;
                <span className="lowercase">{props.term_of_hours_duration}</span>
              </BadgeV2>
              <BadgeV2>
                {props.hourly_rate} /hr &nbsp;
                <span className="capitalize">{props.pay_frequency.toLowerCase()}</span>
              </BadgeV2>
              <BadgeV2>
                <span className="capitalize">{props.location.toLowerCase()}</span>
              </BadgeV2>
              <BadgeV2>{props.timezone}</BadgeV2>
              <BadgeV2>
                {formatDate.yyyy_mm_dd(props.contract_start)}
                {" - "}
                {formatDate.yyyy_mm_dd(props.contract_end)}
              </BadgeV2>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <h6 className="font-bold text-base">${props.hourly_rate} /hr</h6>
            {!props.active && (
              <div className="mt-1 flex items-center gap-2">
                <span className="font-inter font-semibold text-xs text-dark-gray">End date:</span>
                <BadgeV2>
                  {formatDate.yyyy_mm_dd(new Date(props.inactivated_date).toLocaleDateString())}
                </BadgeV2>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-end justify-between pl-[60px] mt-[18px]">
          {props.contract_status === "ACTIVE" ? (
            <BadgeV2 color="pink">
              <span className="first-letter:capitalize">{props.contract_status.toLowerCase()}</span>
            </BadgeV2>
          ) : (
            <div></div>
          )}

          <div className="action-group flex gap-6">
            {/* <Button className="w-[155px] px-0" variant="secondary">
              Write a review
            </Button> */}
            {props.active && (
              <Button onClick={() => setVisibility(true)} className="w-[155px] px-0">
                Edit status
              </Button>
            )}
          </div>
        </div>
      </div>
      <ModalV2 isOpen={visibility}>
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          className="overflow-x-hidden w-[720px] absolute left-1/2 top-[150px] -translate-x-1/2 pb-20 z-10"
        >
          <div className="w-full bg-white pt-16 px-14 pb-[50px] shadow-card rounded-lg relative">
            <IconButtonV2
              onClick={() => setVisibility(false)}
              iconType="CLOSE"
              className="p-0"
              iconClassName="w-5 h-5 absolute top-7 right-7"
            />
            <h4 className="font-semibold text-xl text-center">Edit job status</h4>
            <div className="mt-12 grid grid-cols-2 gap-x-14 gap-y-4">
              <Wrapper label="Company name">
                <InputV2 value={props.Company.name} disabled />
              </Wrapper>
              <Wrapper label="Your position">
                <InputV2 value={props.position} disabled />
              </Wrapper>
              <Wrapper label="Term">
                <InputV2
                  className="capitalize"
                  icon={<IconV2 iconType="CLOCK" iconClassName="w-4 h-4" />}
                  value={props.term.toLowerCase()}
                  disabled
                />
              </Wrapper>
              <Wrapper label="Contract length">
                <div className="h-12 w-full flex pl-4 items-center rounded-lg bg-[#F0F1F2]">
                  <IconV2 iconType="DATE" iconClassName="w-5 h-5" />
                  <time className="font-inter text-xs text-darker-gray pl-2 pr-6">
                    {formatDate.yyyy_mm_dd(props.contract_start)}
                  </time>
                  <span className="font-semibold font-inter text-xs pr-6 block">To</span>
                  <IconV2 iconType="DATE" iconClassName="w-5 h-5" />
                  <time className="font-inter text-xs text-darker-gray pl-2">
                    {props.is_ongoing ? "Ongoing" : formatDate.yyyy_mm_dd(props.contract_end)}
                  </time>
                </div>
              </Wrapper>
              <Wrapper label="Experience level">
                <InputV2
                  className="capitalize"
                  icon={<IconV2 iconType="EDUCATION" iconClassName="w-4 h-4" />}
                  value={props.experience_level.toLowerCase()}
                  disabled
                />
              </Wrapper>
              <Wrapper label="Location">
                <InputV2
                  className="capitalize"
                  icon={<IconV2 iconType="LOCATION" iconClassName="w-4 h-4" />}
                  value={props.location.toLowerCase()}
                  disabled
                />
              </Wrapper>
              <Wrapper label="Hourly rate">
                <InputV2
                  className="capitalize"
                  icon={<IconV2 iconType="DOLLAR-BLUE-CIRCLE" iconClassName="w-4 h-4" />}
                  value={props.hourly_rate}
                  disabled
                />
              </Wrapper>
              <Wrapper label="Pay frequency">
                <InputV2
                  className="capitalize"
                  icon={<IconV2 iconType="DOLLAR-BLUE-CIRCLE" iconClassName="w-4 h-4" />}
                  value={props.pay_frequency.toLowerCase()}
                  disabled
                />
              </Wrapper>
              <Wrapper label="Status">
                <DropdownV2
                  directionUp
                  data={statusArray}
                  selectedValue={status.toLowerCase()}
                  onChange={(idx: number) => setStatus(statusArray[idx].value)}
                />
              </Wrapper>
              {status === "inactive" && (
                <Wrapper label="Set inactive date">
                  <InputV2
                    type="date"
                    icon={<IconV2 iconType="DATE" iconClassName="w-4 h-4" />}
                    name="inactive_date"
                    placeholder="MM/DD/YYYY"
                    value={inactiveDate}
                    onChange={(e) => setInactiveDate(e.target.value)}
                    min={formatDate.yyyy_mm_dd(props.contract_start)}
                  />
                  <div className="mt-2">
                    <CheckBoxV2
                      value={"confirmed"}
                      selected={confirmed}
                      onClick={() => setConfirmed(!confirmed)}
                    >
                      <span className="font-inter text-xs leading-6">
                        Confirm setting contract as inactive
                      </span>
                    </CheckBoxV2>
                  </div>
                </Wrapper>
              )}
            </div>
            <div className="flex justify-center mt-20">
              <Button loading={pending} onClick={jobStatusEditHandler} disabled={!enabled}>
                Confirm changes
              </Button>
            </div>
          </div>
        </div>
      </ModalV2>
    </>
  );
}

const Wrapper = ({ children, className, label }: any) => {
  return (
    <div className={className}>
      <span className="block mb-[14px] font-poppins text-xs">{label}</span>
      {children}
    </div>
  );
};
