export const teamMemberRoles = [
  { id: 1, name: "ADMIN: Allow user to manage all aspects of company account.", title: "ADMIN" },
  { id: 2, name: "RECRUITER: Allow user to post jobs and contact candidates.", title: "RECRUITER" },
  { id: 3, name: "HIRING MANAGER: Allow user to post jobs, contact candidates, send offers and pay invoices.", title: "HIRING MANAGER" },
  { id: 4, name: "BILLING: Allow user to ONLY pay invoices or other billing needs in account", title: "BILLING" },
];

export interface Props {
  setNextStepEnabled: (enabled: boolean) => void;
}
