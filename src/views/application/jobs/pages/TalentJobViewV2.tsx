import { AppDispatch, RootState } from "app/store";
import { ReactElement, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getRecommendedPostsAction } from "redux/slices/jobs";

import JobSearchFilterV2 from "../componentsV2/Filter.JobSearchV2";
import RecommendedJobPostingGroup from "../componentsV2/Group.RecommendedJobs";

export default function TalentJobViewV2(): ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((root: RootState) => root.job.query);
  const { userId } = useSelector((root: RootState) => root.authentication);

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(getRecommendedPostsAction({ query, userId }));
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [query]);

  return (
    <main className="py-[60px] px-[20px] relative">
      <JobSearchFilterV2 />
      <RecommendedJobPostingGroup />
    </main>
  );
}
