import { AppDispatch, RootState } from 'app/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvitations } from 'redux/slices/jobs';
import jobApi from 'network/job';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

export default function useJobInvitations() {
  const dispatch = useDispatch<AppDispatch>();
  const userID = useSelector((root: RootState) => root.authentication.userId);

  const invitations = useSelector(
    (root: RootState) => root.job.invitations
  ).filter((invitation) => !invitation.is_declined);
  const pending = useSelector((root: RootState) => root.job.loading);
  const [menu, setMenu] = useState({ id: Infinity, visibility: false });

  const [action, setAction] = useState<IAction>({
    pending: false,
    id: Infinity,
    type: '',
  });

  useEffect(() => {
    const timerID = setTimeout(() => {
      dispatch(getInvitations(userID));
    }, 200);
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const addressInviteHandler = async (
    type: 'ACCEPT' | 'DECLINE',
    company_id: number,
    job_id: number,
    id: number
  ) => {
    setAction({ id, pending: true, type });
    try {
      const response = await jobApi.addressInvitation(
        userID,
        company_id,
        job_id,
        type
      );
      toast.custom(<Toast type="success" message="Success" />);
      console.log(response);
      dispatch(getInvitations(userID));
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error, please try again" />);
    }
    setAction({ id: Infinity, pending: false, type: '' });
  };

  return { action, menu, invitations, pending, setMenu, addressInviteHandler };
}
