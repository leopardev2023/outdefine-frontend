import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'app/store';
import { getAllSavedJobs } from 'redux/slices/jobs';

export default function useSavedJob() {
  const dispatch = useDispatch<AppDispatch>();
  const userID = useSelector((root: RootState) => root.authentication.userId);

  const savedJobs = useSelector((root: RootState) => root.job.saved_jobs);
  const pending = useSelector((root: RootState) => root.job.loading);

  const fetAllSavedJobs = async () => {
    dispatch(getAllSavedJobs(userID));
  };

  useEffect(() => {
    const timerID = setTimeout(() => {
      fetAllSavedJobs();
    }, 200);
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  return { savedJobs, pending, fetAllSavedJobs };
}
