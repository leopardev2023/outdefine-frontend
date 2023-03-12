import { ReactElement } from 'react';

import JobCardV2 from 'views/client-application/profile/components/Card.JobV2';
import { EmptyJobPanel } from './Panel.AppliedJobViewV2';

import useArchivedJob from '../hooks/useArchivedJob';

export default function ArchivedJobViewV2(): ReactElement {
  const { archivedJobs } = useArchivedJob();

  return (
    <>
      {archivedJobs.length === 0 && <EmptyJobPanel />}

      <div className='flex flex-col'>
        {archivedJobs.map((job) => (
          <JobCardV2
            key={job.id}
            viewFromTalent
            {...job.PostedJobs}
            companyLogo={job.PostedJobs?.Company?.logo}
            otherDate={job.updatedAt}
            dateType='REJECTED'
          ></JobCardV2>
        ))}
      </div>
    </>
  );
}
