import { useState } from "react";

import DropdownV2 from "components/V2/Dropdown/DropdownV2";
import TabV2 from "components/V2/Tab/TabV2";
import activeJobSVG from "assets/svg/application/activeJob.svg";
import robotComputerImg from "assets/img/application/robotComputer.png";

import Applicants from "../pages/application/Applicants";
import Interviewing from "../pages/application/Interviewing";
import Offers from "../pages/application/Offers";
import Declined from "../pages/application/Declined";

const data = [
  { value: "Romil Verma", id: 1 },
  { value: "Alex Tanaka", id: 2 },
  { value: "James Jin", id: 3 },
  { value: "Aaron Porcha", id: 4 },
  { value: "Mike Mu", id: 5 },
  { value: "Karla", id: 6 },
];

const PageHeading = ({ children }: any) => {
  const [selectedID, setSelectedID] = useState<number | undefined>(0);

  return (
    <div className="flex justify-between ml-60 mr-48 gap-x-10">
      <div className="flex flex-col justify-between gap-y-7 w-full">
        <h2 className="font-poppins font-bold text-xl mb-7">Applications</h2>
        <span className="">Choose one of your exisitng jobs to see the applicants</span>
        <DropdownV2
          icon={<img alt="search" src={activeJobSVG} rounded-full className="w-4 h-4" />}
          placeholder="Choose an acitve job post"
          data={data}
          selectedIndex={selectedID}
          onChange={(idx: number) => setSelectedID(idx)}
        />
        <div className="mt-8 w-full">
          <TabV2
            tabClass="w-[226px] h-11 font-poppins font-semibold text-xs"
            tabs={["Applicants", "Interviewing", "Offers", "Declined"]}
            contents={[
              <Applicants onRefetch={() => {}} />,
              <Interviewing onRefetch={() => {}} />,
              <Offers onRefetch={() => {}} />,
              <Declined />,
            ]}
            contentWrapperClass="mt-10 mb-10 bg-white shadow-3xl rounded-lg min-h-[480px]"
          />
        </div>
      </div>
      <img
        alt="robotComputerImg"
        src={robotComputerImg}
        rounded-full
        className="w-[228px] h-[228px] "
      />
    </div>
  );
};

export default PageHeading;
