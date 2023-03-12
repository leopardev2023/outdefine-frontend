import { AppDispatch, RootState } from 'app/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { declineInvitationAction, getAllAppliedJobs } from 'redux/slices/jobs';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

export default function useAppliedJob() {
  const dispatch = useDispatch<AppDispatch>();
  const userID = useSelector((root: RootState) => root.authentication.userId);

  const appliedJobs = useSelector((root: RootState) => root.job.applied_jobs);
  const pending = useSelector((root: RootState) => root.job.loading);

  const declineInvitation = async (application_id: number) => {
    const freelancer_id = Number(userID);

    try {
      const response = await dispatch(
        declineInvitationAction({ application_id, freelancer_id })
      );
      if (response.payload.success === true) {
        toast.custom(<Toast type="success" message="Successfully declined invitation." />);
      }
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error, please try again later" />);
    }
    getAllAppliedJobs(userID);
  };

  const getAllApplications = async () => {
    dispatch(getAllAppliedJobs(userID));
  };

  useEffect(() => {
    const timerID = setTimeout(() => {
      getAllApplications();
    }, 200);
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  return { appliedJobs, pending, declineInvitation, getAllApplications };
}
