import { ChangeEvent, useEffect, useState } from "react";
import InputV2 from "components/V2/Input/InputV2";
import MultiSelectDropdownV2 from "components/V2/MultiSelectDropdown/MultiSelectDropdownV2";
import CompensationSelectV2 from "components/V2/MultiSelectDropdown/CompensationSelectV2";
import locationSVG from "assets/svg/talent/location.svg";
import searchSVG from "assets/svg/application/Search.svg";
import IconV2 from "components/V2/Icons";
import {
  updateLocation,
  updateMaxHourlyRate,
  updateMinHourlyRate,
  updateSeniorityLevel,
  updateTalentLocation,
  updateTerm,
  updateText,
} from "redux/slices/client/talentSearchQuery";
import { RootState } from "app/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/hooks/redux-hooks";

const industryData = [
  { value: "Engineering", index: 0 },
  { value: "Design", index: 1 },
  { value: "Product", index: 2 },
];

const timezoneData = [
  { value: "PST", index: 0 },
  { value: "EST", index: 1 },
  { value: "CST", index: 2 },
  { value: "AST", index: 3 },
  { value: "MST", index: 4 },
  { value: "AKST", index: 5 },
  { value: "HST", index: 6 },
  { value: "UTC-11", index: 7 },
  { value: "UTC+10", index: 8 },
];
const compData = [
  { value: "Comp", index: 0 },
  { value: "Comp1", index: 1 },
  { value: "Comp2", index: 2 },
];
const termData = [{ value: "Full time contract", index: 0 }];
const onsiteData = [
  { value: "Onsite", index: 0 },
  { value: "Hybrid", index: 1 },
  { value: "Remote", index: 2 },
];
const expData = [
  { value: "Entry-level", index: 0 },
  { value: "Mid-level", index: 1 },
  { value: "Senior-level", index: 2 },
  { value: "Director-level", index: 3 },
];
const sponsorData = [{ value: "Visa Sponsor", index: 0 }];

const FilterPanel = () => {
  const { text, talent_location, term, location, seniority_level } = useSelector(
    (root: RootState) => root.talentSearchQuery,
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center justify-between gap-y-5 w-full bg-white rounded-[15px] pt-9 pb-5 px-10 mb-16">
      <div className="w-full">
        <InputV2
          icon={<IconV2 iconType="SEARCH" iconClassName="w-4 h-4 translate-y-[1px]" />}
          onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(updateText(e.target.value))}
          className="text-sm font-inter border border-dark-gray"
          value={text}
          placeholder="Search our trusted talent"
        />
      </div>
      <div className="w-full">
        <InputV2
          icon={<img alt="location" src={locationSVG} className="w-4 h-4" />}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch(updateTalentLocation(e.target.value))
          }
          className="text-sm font-inter border border-dark-gray"
          value={talent_location}
          placeholder="Location"
        />
      </div>
      <div className="flex gap-x-2 mx-10 w-full">
        {/* <MultiSelectDropdownV2
          filterDropdown
          buttonText='Timezone'
          selectedData={selectedTimezoneID}
          onChange={(new_options: Array<IData>) =>
            setSelectedTimezoneID(new_options)
          }
          listData={timezoneData}
          buttonClassName='w-[120px] h-8'
          listClassName='w-[300px]'
        /> */}
        <CompensationSelectV2
          buttonText="Compensation"
          buttonClassName="w-[160px] h-8 text-xs font-inter"
          onChange={(val) => {
            dispatch(updateMinHourlyRate(val?.[0]));
            dispatch(updateMaxHourlyRate(val?.[1]));
          }}
        />
        <MultiSelectDropdownV2
          filterDropdown
          buttonText="Experience"
          selectedData={seniority_level}
          onChange={(new_options: Array<IData>) => dispatch(updateSeniorityLevel(new_options))}
          listData={expData}
          buttonClassName="w-[130px] h-8 text-xs font-inter"
          listClassName="w-[300px]"
        />
        <MultiSelectDropdownV2
          filterDropdown
          buttonText="Term"
          selectedData={term}
          onChange={(new_options: Array<IData>) => dispatch(updateTerm(new_options))}
          listData={termData}
          buttonClassName="w-[90px] h-8 text-xs font-inter"
          listClassName="w-[300px]"
        />
        <MultiSelectDropdownV2
          filterDropdown
          buttonText="Onsite/Remote"
          selectedData={location}
          onChange={(new_options: Array<IData>) => dispatch(updateLocation(new_options))}
          listData={onsiteData}
          buttonClassName="w-[160px] h-8 text-xs font-inter"
          listClassName="w-[300px]"
        />
      </div>
    </div>
  );
};

export default FilterPanel;
