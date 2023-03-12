import React, { ChangeEvent, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import TypographyV2 from "components/Typography/TypographyV2";
import InputV2 from "components/V2/Input/InputV2";
import DropdownV2 from "components/V2/Dropdown/DropdownV2";
import Button from "components/Button/ButtonV2";

import applicationAPI from "network/application";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const initState = {
  email: "",
  role: "",
  role_id: undefined,
};

export const roles = [
  {
    id: 0,
    value: "Admin",
  },
  {
    id: 1,
    value: "Recruiter",
  },
  {
    id: 2,
    value: "Hiring Manager",
  },
  {
    id: 3,
    value: "Billing",
  },
];

const InviteToTeamV2 = () => {
  const user_id = useSelector((root: RootState) => root.authentication.userId);

  const [invites, setInvites] = useState<Array<IInvite>>([initState]);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const changeHandler = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const clone_invites = structuredClone(invites);
    clone_invites[index].email = e.target.value;
    setInvites(clone_invites);
  };

  const addInviteFormHandler = () => {
    const thelast = invites[invites.length - 1];

    if (thelast.email === "" || thelast.role === undefined) return;

    setInvites([...invites, initState]);
  };

  const removeInviteHandler = () => {
    if (invites.length < 2) return;
    setInvites([...invites.slice(0, invites.length - 1)]);
  };

  const roleSelectHandler = (index: number, id: number) => {
    const _invites: Array<IInvite> = structuredClone(invites);
    _invites[index].role_id = id;
    _invites[index].role = roles.find((elem) => elem.id === id)?.value ?? "";
    setInvites(_invites);
  };

  const inviteBatchHandler = async () => {
    if (invites[0].email === "" || invites[0].role === "" || invites[0].role_id === undefined)
      return;

    var invitesGrouped = invites.reduce(function (r: IInvite, a: IInvite) {
      r[a.role] = r[a.role] || [];
      r[a.role].push(a);
      return r;
    }, Object.create(null));

    var success = true;
    setIsBusy(true);
    for (const key in invitesGrouped) {
      if (Object.prototype.hasOwnProperty.call(invitesGrouped, key)) {
        const element: Array<IInvite> = invitesGrouped[key];
        const emailList = element.map((elem) => elem.email).join(",");

        const result = await applicationAPI.inviteTeamMembers({
          client_id: user_id,
          email_list: JSON.stringify(emailList),
          position: key,
        });
        if (!result.success) {
          success = false;
        }
      }
    }
    setIsBusy(false);
    if (success) {
      toast.custom(<Toast type="success" message="Invitation sent" />);
      setInvites([initState]);
    }
  };

  return (
    <div className="pt-9 pb-7 pl-10 pr-2">
      <div className="max-h-[600px] overflow-auto pr-8 auto-hide-scrollbar-parent">
        <TypographyV2 variant="subtitle2" className="font-semibold text-base font-poppins">
          Invite more team members!
        </TypographyV2>
        <ul className="mt-6 text-xs leading-[18px]">
          <li className="first:mt-0 mt-[10px]">
            <span className="block font-bold">Admin:</span>A “Admin” will be allowed to manage all
            aspects of company account. They are also allowed to invite other team memebers.
          </li>
          <li className="first:mt-0 mt-[10px]">
            <span className="block font-bold">Recruiter:</span>A “Recruiter” will be allowed to post
            jobs and contact candidates. They
            <span className="font-bold"> cannot</span> change any company information or invite
            other team members.
          </li>
          <li className="first:mt-0 mt-[10px]">
            <span className="block font-bold">Hiring manager:</span>A “Hiring manager” will be
            allowed to post jobs, contact candidates, send offers and pay invoices. They{" "}
            <span className="font-bold">cannot </span>
            change any company information or invite other team members.
          </li>
          <li className="first:mt-0 mt-[10px]">
            <span className="block font-bold">Billing:</span>A “Billing” team member will be allowed{" "}
            <span className="font-bold">ONLY</span> pay invoices or other billing needs in account.
            They
            <span className="font-bold"> cannot</span> change any company information or invite
            other team members, create/edit any job posts or contact talent.
          </li>
        </ul>
        <div className="mt-6">
          {invites.map((invite, index) => (
            <Fragment key={"frag" + index}>
              <label
                key={"label" + index}
                className="block first:mt-0 mt-3 mb-3 text-xs font-poppins"
              >
                Email
              </label>
              <InputV2
                key={"email" + index}
                value={invite.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => changeHandler(index, e)}
                placeholder="joesmith@company.com"
              />
              <label key={"role label +" + index} className="block mt-3 mb-3 text-xs font-poppins">
                Role
              </label>
              <DropdownV2
                key={"role dropdown" + index}
                directionUp={!(invites.length >= 3 && index < invites.length - 1)}
                data={roles}
                selectedIndex={invites[index]?.role_id}
                onChange={(id: number) => roleSelectHandler(index, id)}
                placeholder={"Select a role"}
              />
            </Fragment>
          ))}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={addInviteFormHandler}
              className={`flex items-center text-xs font-poppins ${
                invites[invites.length - 1].email === "" ||
                invites[invites.length - 1].role === undefined
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              Add more team members
            </button>
            {invites.length >= 2 && (
              <button onClick={removeInviteHandler} className="font-bold text-xs">
                Remove
              </button>
            )}
          </div>
        </div>
        <Button
          disabled={
            invites[0].email === "" || invites[0].role === "" || invites[0].role_id === undefined
          }
          loading={isBusy}
          onClick={inviteBatchHandler}
          className="w-full mt-6"
        >
          Invite team
        </Button>
      </div>
    </div>
  );
};

export default InviteToTeamV2;
