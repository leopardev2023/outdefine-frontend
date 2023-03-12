import { ReactElement } from "react";

import TabV2 from "components/V2/Tab/TabV2";

import AppliedJobViewPanelV2 from "../panels/Panel.AppliedJobViewV2";
import SavedJobViewPanelV2 from "../panels/Panel.SavedJobViewV2";
import ArchivedJobViewV2 from "../panels/Panel.ArchivedJobViewV2";
import InvitedJobViewPanelV2 from "../panels/Panel.InvitedJobViewV2";

export default function TalentMyJobV2(): ReactElement {
  return (
    <div className="px-2 py-[80px] lg:p-[100px]">
      <div className='relative w-full flex'>
        <h1 className='hidden lg:block font-bold text-xl leading-[30px] mt-[60px]'>My jobs</h1>
        <img
          src={"/common/spaceboy/astro-angle.png"}
          alt='astro is angling'
          className='ml-auto lg:ml-0 lg:absolute w-[150px] lg:w-[176px] right-0 top-[15px]'
        />
      </div>
      <TabV2
        addClass='lg:max-w-[80%] flex-wrap  mt-14'
        tabClass='w-[100px] h-11 font-poppins font-semibold text-xs'
        contentWrapperClass='w-full mt-[72px] flex flex-col gap-6'
        tabs={["Applied", "Invited", "Interviewing", "Saved", "Archived"]}
        contents={[
          <AppliedJobViewPanelV2 status='APPLIED' />,
          <InvitedJobViewPanelV2 />,
          <AppliedJobViewPanelV2 status='INTERVIEW' />,
          <SavedJobViewPanelV2 />,
          <ArchivedJobViewV2 />,
        ]}
      />
    </div>
  );
}
