import TabV2 from 'components/V2/Tab/TabV2';
import { ReactElement } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from 'redux/hooks/redux-hooks';

import TalentBannerV2 from './componentsV2/TalentBannerV2';

import TalentProjectPanelV2 from './panels/Panel.ProjectV2';
import TalentCollectionV2 from './panels/Panel.TalentCollectionV2';
import TalentProfilePanelV2 from './panels/Panel.TalentProfileV2';
import TalentReviewPanelV2 from './panels/Panel.TalentReviewV2';
import TalentAssessmentPanelV2 from './panels/Panel.TalentAssessmentV2';

const getTabIndex = (tab?: string | null) => {
  if (tab === undefined || tab === null) return 0;

  const tabIndexes = {
    profile: 0,
    projects: 1,
    reviews: 2,
    collections: 3,
    assessment: 4,
  };
  return tabIndexes[tab];
};

export default function EngineerProfile(): ReactElement {
  const [searchParam, setSearchParam] = useSearchParams();
  const { userRole } = useAppSelector((state) => state.authentication);
  const { is_trusted_talent: isTrusted } = useAppSelector((state) => state.profile);

  return (
    <main className='w-full h-full overflow-x-hidden overflow-y-scroll flex px-[20px] py-[30px]'>
      <div className='flex flex-col max-w-[1040px] w-full mx-auto'>
        <TalentBannerV2 userRole={userRole} />
        <TabV2
          key={(1000 * Math.random()).toString().slice(0, 10)}
          tabs={[userRole === "Client" ? "Profile" : "My profile", "Projects", "Reviews", "Collections", userRole === "Client" || isTrusted ? "Assessments" : ""].filter((tab) => tab !== "")}
          contents={[
            <TalentProfilePanelV2
              userRole={userRole}
              onTabChange={(name: string, action: string) => {
                setSearchParam(`tab=${name}&action=${action}`);
              }}
            />,
            <TalentProjectPanelV2 userRole={userRole} />,
            <TalentReviewPanelV2 userRole={userRole} />,
            <TalentCollectionV2 userRole={userRole} />,
            <TalentAssessmentPanelV2 userRole={userRole} />,
          ]}
          addClass='mt-8 mx-auto'
          tabClass='w-[175px] h-11 font-poppins font-semibold text-xs'
          initIndex={getTabIndex(searchParam.get('tab'))}
          tabNavigations={
            userRole === 'Client'
              ? undefined
              : ["profile", "projects", "reviews", "collections", "assessments"]
          }
        />
      </div>
    </main>
  );
}