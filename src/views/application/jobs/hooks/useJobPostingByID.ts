import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "app/store";

import jobApi from "network/job";
import useSavedJob from "./useSavedJob";
import useAppliedJob from "./useAppliedJob";
import { setOnePageInfo } from "redux/slices/jobs";
import { useSelector } from "react-redux";

export default function useJobPostingByID() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [jobPosting, setJobPosting] = useState<IJobPostingV2 | undefined>(undefined);

  const { savedJobs, fetAllSavedJobs } = useSavedJob();
  const { appliedJobs, getAllApplications } = useAppliedJob();
  const invitations = useSelector((root: RootState) => root.job.invitations);

  const [loading, setLoading] = useState<boolean>(false);
  const fetchJobPostingByID = async () => {
    try {
      await fetAllSavedJobs();
      await getAllApplications();
      const response = await jobApi.getJobPostingByID(jobId!);
      if (response?.data && response.data.length === 0) {
        navigate("/404");
      }
      setJobPosting(response.data[0]);
      setLoading(false);
    } catch (e) {
      fetchJobPostingByID();
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchJobPostingByID();
  }, [jobId]);

  useEffect(() => {
    const isApplied: boolean = appliedJobs.find(
      (appJob) => appJob.job_id.toString() === jobId?.toString(),
    )
      ? true
      : false;
    const isSaved: boolean = savedJobs.find((savedOne) => savedOne.job_id.toString() === jobId)
      ? true
      : false;
    const isAccepted: boolean = invitations.find(
      (invitation) => Number(invitation.job_id) === Number(jobId),
    )
      ? true
      : false;

    dispatch(setOnePageInfo({ jobID: jobId!, isApplied, isSaved, isAccepted: !isAccepted }));
  }, [savedJobs, appliedJobs]);

  return {
    loading,
    companyProfile: {
      is_busy: false,
      company: jobPosting?.Company ?? {},
      memebers: [],
    },
    jobPosting,
  };
}
