import { ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

import TabV2 from 'components/V2/Tab/TabV2';

import MeetTeamTabV2 from '../components/Tab.MeetTeamV2';
import CompanyJobPanelV2 from '../panels/Panel.CompanyJobV2';
import CompanyProfilePanelV2 from '../panels/Panel.CompanyProfileV2';
import CompanyReviewPanelV2 from '../panels/Panel.CompanyReviewV2';

const getTabIndex = (tab?: string | null) => {
  if (tab === undefined || tab === null) return 0;

  const tabIndexes = {
    company: 0,
    job: 1,
    team: 2,
    review: 3,
  };
  return tabIndexes[tab];
};

const CompanyProfileViewV2: React.FC = (): ReactElement => {
  const [searchParam, setSearchParam] = useSearchParams();

  return (
    <section className='mt-8'>
      <TabV2
        key={(1000 * Math.random()).toString().slice(0, 10)}
        addClass='mx-auto'
        tabClass='w-[175px] h-11 font-poppins font-semibold text-xs'
        contents={[
          <CompanyProfilePanelV2
            onTabChange={(name: string, action: string) => {
              setSearchParam(`tab=${name}&action=${action}`);
            }}
          />,
          <CompanyJobPanelV2 />,
          <MeetTeamTabV2 />,
          <CompanyReviewPanelV2 />,
        ]}
        wrapperAsFragment
        tabs={['Company', 'Jobs', 'Meet the team', 'Reviews']}
        initIndex={getTabIndex(searchParam.get('tab'))}
        tabNavigations={['company', 'job', 'team', 'review']}
      />
    </section>
  );
};

export default CompanyProfileViewV2;
