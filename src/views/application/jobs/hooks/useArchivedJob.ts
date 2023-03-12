import { useSelector } from "react-redux";

import { RootState } from "app/store";
import useJobInvitations from "./useJobInvitations";

export default function useArchivedJob() {
  const archivedApplications = useSelector((root: RootState) => root.job.applied_jobs).filter(
    (job) => ["REJECTED", "ARCHIVED"].includes(job.application_status),
  );

  const invitations = useSelector((root: RootState) => root.job.invitations).filter(
    (invitation) => invitation.is_declined,
  );

  useJobInvitations();

  return { archivedJobs: [...archivedApplications, ...invitations] };
}
