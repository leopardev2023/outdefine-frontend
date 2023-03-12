import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import Button from 'components/Button/ButtonV2';
import JobCardV2 from 'views/client-application/profile/components/Card.JobV2';

import useAppliedJob from '../hooks/useAppliedJob';
import EmptyPanelV2 from 'views/client-application/profile/panels/Panel.EmptyV2';

export function EmptyJobPanel() {
  return (
    <EmptyPanelV2
      image={'/common/spaceboy/astro-computer.png'}
      title={'No jobs found'}
      description={
        'You don’t have any jobs yet. Visit our jobs search page to get started!'
      }
      className='pt-[52px] pb-8'
    >
      <NavLink to='/jobs' className='mt-5'>
        <Button>Job search</Button>
      </NavLink>
    </EmptyPanelV2>
  );
}

export default function AppliedJobViewPanelV2({
  status,
}: {
  status: 'APPLIED' | 'INTERVIEW';
}): ReactElement {
  const { appliedJobs: applications } = useAppliedJob();

  const appliedJobs = applications.filter(
    (job) => job.application_status === status
  );

  return (
    <>
      {appliedJobs.length === 0 && <EmptyJobPanel />}

      {appliedJobs.map((job) => (
        <JobCardV2
          key={job.id}
          {...job.PostedJobs}
          viewFromTalent
          companyLogo={job.PostedJobs?.Company?.logo}
          dateType='APPLIED'
          otherDate={job.createdAt}
        >
          <div className='min-w-fit flex items-end'>
            <NavLink to={`/jobs/post/${job.job_id}`}>
              <Button className='w-fit h-10'>View job</Button>
            </NavLink>
          </div>
        </JobCardV2>
      ))}
    </>
  );
}
