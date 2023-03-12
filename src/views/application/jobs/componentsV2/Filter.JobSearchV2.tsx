import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "app/store";

import InputV2 from "components/V2/Input/InputV2";
import IconV2 from "components/V2/Icons";

import MultiSelectDropdownV2 from "components/V2/MultiSelectDropdown/MultiSelectDropdownV2";

import protoHelper from "helpers/prototype";
import ENUMS from "constants/v2/enums";
import { setFilterQuery } from "redux/slices/jobs";
import RateRangeDropdownV2 from "./Dropdown.RateRangeV2";

export default function JobSearchFilterV2(): ReactElement {
  const query = useSelector((root: RootState) => root.job.query);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className='bg-white rounded-lg shadow-card p-1 md:p-[36px_48px_24px_48px] flex flex-col gap-5'>
      <InputV2
        name='job_title'
        value={query.job_title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch(setFilterQuery({ name: "job_title", value: e.target.value }))
        }
        placeholder='Search for roles and skills'
        icon={
          <IconV2 iconType='SEARCH' iconClassName='w-6 h-6 translate-y-[1px]' />
        }
      />
      {/* <InputV2
        placeholder='Location'
        icon={<IconV2 iconType='LOCATION' iconClassName='w-6 h-6' />}
      /> */}
      <div className='flex gap-[10px] flex-wrap'>
        {/* <MultiSelectDropdownV2
          filterDropdown
          buttonText='Industry'
          buttonClassName='gap-2 h-8 w-fit text-xs font-inter'
          listClassName='w-[250px] capitalize text-xs font-inter'
          listData={protoHelper.addIndexArrayElem(ENUMS.profession, true)}
          selectedData={query.industry}
          onChange={(new_array: IData[]) =>
            dispatch(setFilterQuery({ name: 'industry', value: new_array }))
          }
        /> */}
        <MultiSelectDropdownV2
          filterDropdown
          buttonText='Timezone'
          buttonClassName='gap-2 h-8 w-fit text-xs font-inter'
          listClassName='w-[180px] uppercase text-xs font-inter'
          listData={protoHelper.addIndexArrayElem(ENUMS.timezone, true)}
          selectedData={query.timezone}
          onChange={(new_array: IData[]) =>
            dispatch(setFilterQuery({ name: "timezone", value: new_array }))
          }
        />
        <RateRangeDropdownV2
          popupClassName='w-[300px]'
          buttonText={"Compensation"}
        />
        <MultiSelectDropdownV2
          filterDropdown
          buttonText='Term'
          buttonClassName='gap-2 h-8 w-fit text-xs font-inter'
          listClassName='w-[180px] capitalize text-xs font-inter'
          listData={protoHelper.addIndexArrayElem(ENUMS.term, true)}
          selectedData={query.term}
          onChange={(new_array: IData[]) =>
            dispatch(setFilterQuery({ name: "term", value: new_array }))
          }
        />
        <MultiSelectDropdownV2
          filterDropdown
          buttonText='Onsite/Remote'
          buttonClassName='gap-2 h-8 w-fit text-xs font-inter'
          listClassName='w-[180px] capitalize text-xs font-inter'
          listData={protoHelper.addIndexArrayElem(ENUMS.location, true)}
          selectedData={query.location}
          onChange={(new_array: IData[]) =>
            dispatch(setFilterQuery({ name: "location", value: new_array }))
          }
        />
        <MultiSelectDropdownV2
          filterDropdown
          buttonText='Experience'
          buttonClassName='gap-2 h-8 w-fit text-xs font-inter'
          listClassName='w-[200px] capitalize text-xs font-inter'
          listData={protoHelper.addIndexArrayElem(ENUMS.level, true)}
          selectedData={query.experience_level}
          onChange={(new_array: IData[]) =>
            dispatch(
              setFilterQuery({ name: "experience_level", value: new_array }),
            )
          }
        />
        <MultiSelectDropdownV2
          filterDropdown
          buttonText='Visa Sponsor'
          buttonClassName='gap-2 h-8 w-fit text-xs font-inter'
          listClassName='w-[180px] capitalize text-xs font-inter'
          listData={[{ index: 1, value: "Visa Sponsor" }]}
          selectedData={query.visa_sponsor}
          onChange={(new_array: IData[]) =>
            dispatch(setFilterQuery({ name: "visa_sponsor", value: new_array }))
          }
        />
      </div>
    </div>
  );
}
