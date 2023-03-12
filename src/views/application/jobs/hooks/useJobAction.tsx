import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { doApplyForAJobAction, doSaveAJobAction, setOnePageInfo } from "redux/slices/jobs";
import { AppDispatch, RootState } from "app/store";
import { mixpanel_track } from "helpers/mixpanel";
import { getBalance } from "redux/slices/token";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

interface IApplyModal {
  type: "NORMAL" | "TOKEN";
  visibility: boolean;
}

export default function useJobAction() {
  const dispatch = useDispatch<AppDispatch>();
  const action = useSelector((root: RootState) => root.job.action);
  const loading = useSelector((root: RootState) => root.job.loading);
  const userId = useSelector((root: RootState) => root.authentication.userId);
  const tokenBalance = useSelector((root: RootState) => root.token.balance);

  const invitations = useSelector((root: RootState) => root.job.invitations);
  const [modal, setModal] = useState<IApplyModal>({
    type: "NORMAL",
    visibility: false,
  });

  const { jobId } = useParams();

  const companyProfile = useSelector((root: RootState) =>
    root.job.posts.find((post) => post.id?.toString() === jobId),
  );

  const onePageInfo = useSelector((root: RootState) => root.job.one_page_info);

  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [invitation, setInvitation] = useState(
    invitations.find((invitation) => Number(invitation.job_id) === Number(jobId)),
  );

  const openNormalModal = () => {
    setMessage("");
    setModal({ type: "NORMAL", visibility: true });
  };

  const openTokenModal = () => {
    setMessage("");
    setModal({ type: "TOKEN", visibility: true });
  };

  const closeModal = () => {
    setModal({ type: "NORMAL", visibility: false });
  };

  const changeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const applyHandler = async () => {
    try {
      const result = await dispatch(
        doApplyForAJobAction({
          freelancer_id: Number(userId),
          company_id: companyProfile !== undefined ? Number(companyProfile?.company_id) : 0,
          job_id: Number(jobId),
          cover_letter: message,
          token_amount: modal.type === "TOKEN" ? amount : undefined,
        }),
      );
      if (result.payload?.success) {
        mixpanel_track("Talent applied for a job", { jobId });
        dispatch(setOnePageInfo({ ...onePageInfo, isApplied: true }));
        if (modal.type === "TOKEN") {
          dispatch(getBalance(Number(userId)));
        }
        toast.custom(<Toast type="success" message="Successfully applied for a job" />);
        
      } else {
        throw new Error("Error");
      }
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error while applying for a job." />);
    }
    closeModal();
  };

  const saveHandler = async (jobId?: number) => {
    if (!jobId || !userId) return;
    try {
      const response = await dispatch(
        doSaveAJobAction({ freelancer_id: Number(userId), job_id: jobId }),
      );

      if (response.payload?.success) {
        toast.custom(<Toast type="success" message="Success" />);
        dispatch(setOnePageInfo({ ...onePageInfo, isSaved: !onePageInfo.isSaved }));
      }
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error while saving the job." />);
    }
  };

  const acceptInvitationHandler = async () => {
    setInvitation(undefined);
    dispatch(setOnePageInfo({ ...onePageInfo, isApplied: true, isAccepted: true }));
  };

  return {
    jobId,
    isSaved: onePageInfo.isSaved && jobId?.toString() === onePageInfo.jobID.toString(),
    isApplied: onePageInfo.isApplied && jobId?.toString() === onePageInfo.jobID.toString(),
    isAccepted: onePageInfo.isAccepted && jobId?.toString() === onePageInfo.jobID.toString(),
    action,
    loading,
    modal,
    tokenBalance,
    message,
    amount,
    companyProfile,
    invitation,
    setInvitation,
    saveHandler,
    applyHandler,
    acceptInvitationHandler,
    setAmount,
    openNormalModal,
    openTokenModal,
    closeModal,
    changeMessageHandler,
  };
}
