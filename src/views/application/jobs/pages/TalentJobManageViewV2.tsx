import TabV2 from "components/V2/Tab/TabV2";

import TalentJobViewPanelV2 from "../panels/Panel.TalentJobVewV2";

export default function TalentJobManageViewV2() {
  return (
    <div className="px-2 py-[80px] lg:p-[100px]">
      <h1 className='font-bold text-xl leading-[30px] mt-[60px]'>
        Manage jobs
      </h1>
      <TabV2
        wrapperAsFragment
        addClass='mt-14'
        tabClass='w-[124px] h-11 font-poppins font-semibold text-xs'
        tabs={["Active", "Inactive"]}
        contents={[
          <TalentJobViewPanelV2 active />,
          <TalentJobViewPanelV2 active={false} />,
        ]}
      />
    </div>
  );
}
