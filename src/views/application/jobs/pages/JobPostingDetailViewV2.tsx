import { ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "app/store";

import BannerV2 from "views/client-application/profile/components/BannerV2";
import SocialBoxV2 from "views/client-application/profile/components/Card.SocialBoxV2";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import AboutCompanyV2 from "views/client-application/profile/components/Card.AboutCompanyV2";

import JobPosingOverviewPanel from "../componentsV2/Panel.JobPostingOverview";
import ApplyButtonGroup from "../componentsV2/ApplyButtonGroup";
import AssessmentTip from "../componentsV2/Tip.Assessment";

import IconButtonV2 from "components/V2/IconButton";
import TabV2 from "components/V2/Tab/TabV2";

import useJobPostingByID from "../hooks/useJobPostingByID";
import { JobDetailPageSkeleton } from "./Skeletons";

export default function JobPostingDetailViewV2(): ReactElement {
  const vetted = useSelector((root: RootState) => root.profile.is_trusted_talent === "TRUSTED");

  const { companyProfile, jobPosting, loading } = useJobPostingByID();

  const navigate = useNavigate();

  if (loading) return <JobDetailPageSkeleton />;

  return (
    <main className="flex flex-col min-h-fit pt-[35px] pb-[70px] px-4 md:px-8">
      <div className="relative">
        <BannerV2
          data={companyProfile}
          viewFromTalent
          viewWithJobPosting
          jobTitle={jobPosting?.job_title}
        />
      </div>
      {vetted && (
        <div className="mt-4 relative w-fit mx-auto flex gap-8">
          <ApplyButtonGroup />
        </div>
      )}

      <AssessmentTip />

      <div className="relative">
        <IconButtonV2
          onClick={() => {
            if (window.history.state) {
              navigate(-1);
            } else {
              navigate("/jobs", { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
            }
          }}
          iconType="BTN-BACK-RECTANGLE"
          className="absolute top-36"
        />
        <TabV2
          addClass="mx-auto mt-10"
          tabClass="w-[120px] md:w-[175px] h-11 font-poppins font-semibold text-xs"
          tabs={["Overview", "Company", "Reviews"]}
          contentWrapperClass="mt-12 w-full px-2 md:px-20"
          contents={[
            <JobPosingOverviewPanel data={jobPosting} />,
            <div>
              <AboutCompanyV2 viewFromTalent data={companyProfile} />
              <SocialBoxV2 viewFromTalent data={companyProfile} />
            </div>,
            <EmptyPanelV2
              image={"/common/spaceboy/astro-meaningless.png"}
              imageClassName="w-[150px] h-[144px] block mb-6"
              title={"No reviews"}
              className="flex flex-col text-center w-full h-[360px] pt-9 pb-11 px-[150px]"
              description={
                "This company doesn’t have any reviews yet. You cans till apply and then share your experience with your community!"
              }
            />,
          ]}
        />
      </div>
    </main>
  );
}
