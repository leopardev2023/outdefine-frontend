import { ReactElement } from 'react';
import TabV2 from 'components/V2/Tab/TabV2';
import MeetTeamPanelV2 from '../panels/Panel.MeetTeamV2';
import MeetTalentPanelV2 from '../panels/Panel.MeetTalentV2';

const MeetTeamTabV2: React.FC = (): ReactElement => {
  return (
    <TabV2
      addClass='mt-20'
      tabClass='w-[170px] h-11 font-poppins font-semibold text-xs'
      tabs={['Meet the team', 'Meet the talent']}
      contents={[<MeetTeamPanelV2 />, <MeetTalentPanelV2 />]}
      contentWrapperClass='mt-[54px]'
    />
  );
};

export default MeetTeamTabV2;
