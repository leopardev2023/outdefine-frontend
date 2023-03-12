import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import Button from "components/Button/ButtonV2";
import IconButtonV2 from "components/V2/IconButton/IconButtonV2";

import JobCardV2 from "views/client-application/profile/components/Card.JobV2";
import { EmptyJobPanel } from "./Panel.AppliedJobViewV2";

import useSavedJob from "../hooks/useSavedJob";
import useAppliedJob from "../hooks/useAppliedJob";
import useJobAction from "../hooks/useJobAction";

export default function SavedJobViewPanelV2(): ReactElement {
  const { savedJobs, fetAllSavedJobs } = useSavedJob();
  const { saveHandler } = useJobAction();
  const { appliedJobs: applications } = useAppliedJob();

  const saveJobHandler = async (jobId: number) => {
    await saveHandler(jobId);
    fetAllSavedJobs();
  };

  return (
    <>
      {savedJobs.length === 0 && <EmptyJobPanel />}
      {savedJobs.length > 0 && (
        <div>
          {savedJobs.map((job) => (
            <JobCardV2
              key={job.id}
              {...job.PostedJobs}
              viewFromTalent
              companyLogo={job.PostedJobs?.Company?.logo}
              otherDate={job.createdAt}
              dateType="SAVED"
            >
              <div className="min-w-fit flex flex-col items-end justify-between">
                <IconButtonV2
                  onClick={() => saveJobHandler(job.job_id)}
                  iconType="BOOKMARKFILLED"
                  className="p-0"
                />
                {(() => {
                  const isApplied = applications.find(
                    (application) => application.job_id === job.job_id,
                  )
                    ? true
                    : false;

                  return (
                    <NavLink to={`/jobs/post/${job.job_id}`}>
                      <Button
                        className={`w-fit h-10 ${
                          isApplied ? "px-[52px]" : "pl-9 pr-6"
                        } flex items-center gap-4`}
                      >
                        {isApplied ? (
                          "View job"
                        ) : (
                          <>
                            Apply now
                            <svg
                              width="15"
                              height="8"
                              viewBox="0 0 15 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464466C10.9763 0.269204 10.6597 0.269204 10.4645 0.464466C10.2692 0.659728 10.2692 0.976311 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM0 4.5L14 4.5V3.5L0 3.5L0 4.5Z"
                                fill="white"
                              />
                            </svg>
                          </>
                        )}
                      </Button>
                    </NavLink>
                  );
                })()}
              </div>
            </JobCardV2>
          ))}
        </div>
      )}
    </>
  );
}
