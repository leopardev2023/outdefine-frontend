import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import { useState } from "react";

import applicationApi from "network/application";

export default function useInviteTalent(
  jobs: any[],
  modal: any,
  setModal: (props: IInviteTalentModal) => void,
  companyId?: number,
) {
  const [invitePending, setInvitePending] = useState<boolean>(false);

  const inviteTalentHandler = async () => {
    if (
      companyId === undefined ||
      companyId === null ||
      modal.selectedJobID === null ||
      modal.selectedJobID === undefined
    )
      return;
    setInvitePending(true);
    applicationApi
      .sendInvitation(
        modal.talentToInvite?.freelancer_id,
        companyId,
        jobs[modal.selectedJobID].id,
        modal.calendarLink,
        modal.intervewDescription,
      )
      .then((data) => {
        if (data?.success === true) {
          toast.custom(<Toast type="success" message="Invite Sent!" />);
          setModal({
            visibility: false,
            calendarLink: "",
            intervewDescription: "Hey, we are excited for you to interview for this job.",
            talentToInvite: undefined,
            selectedJobID: undefined,
          });
        } else {
          throw new Error("Send invitation failed...");
        }
      })
      .finally(() => setInvitePending(false))
      .catch((err) => {
        console.log(err)
        toast.custom(<Toast type="error" message="Send invitation failed, please try again" />);
      });
  };

  return {
    disabled:
      companyId === undefined ||
      companyId === null ||
      modal.selectedJobID === null ||
      modal.selectedJobID === undefined ||
      modal.intervewDescription === "" ||
      modal.intervewDescription === undefined,
    invitePending,
    inviteTalentHandler,
  };
}
