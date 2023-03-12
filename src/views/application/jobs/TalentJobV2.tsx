import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import useAppliedJob from './hooks/useAppliedJob';
import useSavedJob from './hooks/useSavedJob';

import JobPostingDetailViewV2 from './pages/JobPostingDetailViewV2';
import TalentJobManageViewV2 from './pages/TalentJobManageViewV2';
import TalentOfferViewV2 from './pages/TalentOfferViewV2';
import TalentJobViewV2 from './pages/TalentJobViewV2';
import TalentMyJobV2 from './pages/TalentMyJobV2';

export default function TalentJobV2(): ReactElement {
  useAppliedJob();
  useSavedJob();

  return (
    <main className='w-full h-full overflow-x-hidden overflow-y-scroll flex'>
      <div className='flex flex-col max-w-[1040px] w-full mx-auto'>
        <Routes>
          <Route path='/' element={<TalentJobViewV2 />} />
          <Route path='/post/:jobId' element={<JobPostingDetailViewV2 />} />
          <Route path='/yours' element={<TalentMyJobV2 />} />
          <Route path='/offer/*' element={<TalentOfferViewV2 />} />
          <Route path='/manage' element={<TalentJobManageViewV2 />} />
        </Routes>
      </div>
    </main>
  );
}
