import { ReactElement } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { RootState } from "app/store";

import JobCardV2 from "views/client-application/profile/components/Card.JobV2";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import AssessmentTip from "./Tip.Assessment";
import Button from "components/Button/ButtonV2";
import IconV2 from "components/V2/Icons";

import useJobAction from "../hooks/useJobAction";
import useAppliedJob from "../hooks/useAppliedJob";
import useSavedJob from "../hooks/useSavedJob";
import BadgeV2 from "components/V2/Badges/BadgeV2";

import BookMarkSvg from "assets/V2/svg/bookmark.svg";
import BookMarkFilledSvg from "assets/V2/svg/bookmark-filled.svg";

export default function RecommendedJobPostingGroup(): ReactElement {
  const job = useSelector((root: RootState) => root.job);
  const { posts } = job;

  const { savedJobs, fetAllSavedJobs } = useSavedJob();
  const { saveHandler } = useJobAction();
  const { appliedJobs } = useAppliedJob();

  const saveJobPostingHandler = async (jobID: number | undefined) => {
    await saveHandler(jobID);
    fetAllSavedJobs();
  };

  return (
    <div className="w-full">
      {posts.length > 0 && <AssessmentTip />}
      {posts.length > 0 && (
        <p className="font-poppins font-semibold text-base mt-12 mb-7">Recommended for you</p>
      )}
      {job.loading && job.action === "FETCH" && (
        <div className="fixed z-10 bottom-1/4 left-1/2">
          <ColorRing
            visible={true}
            height="120"
            width="120"
            ariaLabel="blocks-loading"
            colors={
              posts.length !== 0
                ? ["#FF813460", "#FF575760", "#5F5FFF60", "#2F345460", "transparent"]
                : ["#FF8134", "#FF5757", "#5F5FFF", "#2F3454", "transparent"]
            }
          />
        </div>
      )}

      {posts.map((job) => {
        const isSavedOne = savedJobs.find(
          (savedOne) => savedOne.job_id.toString() === job.id?.toString(),
        );
        const isApplied = appliedJobs.find(
          (appliedOne) => appliedOne.job_id.toString() === job.id?.toString(),
        );
        return (
          <JobCardV2 viewFromTalent companyLogo={job.Company?.logo} key={job.id} {...job}>
            <div
              className="max-lg:mt-4 min-w-[200px] flex flex-col lg:items-end justify-between"
              data-cy="job-button-container"
            >
              <div className="max-lg:mb-2 flex flex-row-reverse max-lg:justify-between lg:flex-col items-center lg:items-end gap-y-6">
                <button onClick={() => saveJobPostingHandler(job.id)}>
                  <img
                    src={isSavedOne ? BookMarkFilledSvg : BookMarkSvg}
                    className="w-[18px] h-[21px]"
                    alt="bookmark"
                  />
                </button>
                <BadgeV2 addClass="flex items-ceter gap-1 h-6 text-[#FF8134]" color="orange">
                  <IconV2 iconType="TOKEN" iconClassName="w-4 h-4" />
                  Token rewards eligible
                </BadgeV2>
                {isApplied && (
                  <BadgeV2 color="blue" addClass="h-6 text-[#5F5FFF]">
                    Applied
                  </BadgeV2>
                )}
              </div>
              <NavLink to={"post/" + job.id} className="max-lg:ml-auto" data-cy="button">
                <Button className="w-fit pl-8 pr-4 flex items-center gap-1">
                  {isApplied ? "View job" : "Apply now"}
                  <IconV2 iconClassName="w-6 h-4" iconType="ARROW-RIGHT" />
                </Button>
              </NavLink>
            </div>
          </JobCardV2>
        );
      })}

      {!posts.length && !job.loading && (
        <div className="mt-20">
          <EmptyPanelV2
            image="/common/spaceboy/astro-computer.png"
            title="No jobs found"
            description="We currently don’t have the specific role you are looking for. Search for another job or look through your “Recommended for you”!"
          />
        </div>
      )}
    </div>
  );
}
