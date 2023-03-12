import { ChangeEvent, ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';

import Button from 'components/Button/ButtonV2';
import DropdownV2 from 'components/V2/Dropdown/DropdownV2';
import InputV2 from 'components/V2/Input/InputV2';

import { roles } from 'views/client-application/dashboard/components/Panel.InviteToTeamV2';

import applicationAPI from 'network/application';

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const initState = {
  email: '',
  role: '',
  role_id: undefined,
};

const InviteGroupV2: React.FC<{ onClose: () => void }> = (
  props
): ReactElement => {
  const user_id = useSelector((root: RootState) => root.authentication.userId);

  const [invites, setInvites] = useState<Array<IInvite>>([initState]);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const changeHandler = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const clone_invites = structuredClone(invites);
    clone_invites[index].email = e.target.value;
    setInvites(clone_invites);
  };

  const removeInviteHandler = () => {
    if (invites.length < 2) return;
    setInvites([...invites.slice(0, invites.length - 1)]);
  };

  const inviteBatchHandler = async () => {
    if (
      invites[0].email === '' ||
      invites[0].role === '' ||
      invites[0].role_id === undefined
    )
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
        const emailList = element.map((elem) => elem.email).join(',');

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
    props.onClose();
    if (success) {
      toast.success(
        `Successfully invited ${invites.length} people to the team`
      );
      setInvites([initState]);
    }
  };

  const addInviteFormHandler = () => {
    const thelast = invites[invites.length - 1];

    if (thelast.email === '' || thelast.role === undefined) return;

    setInvites([...invites, initState]);
  };

  const roleSelectHandler = (index: number, id: number) => {
    const _invites: Array<IInvite> = structuredClone(invites);
    _invites[index].role_id = id;
    _invites[index].role = roles.find((elem) => elem.id === id)?.value ?? '';
    setInvites(_invites);
  };

  return (
    <>
      {' '}
      <p className='mt-[38px] font-poppins font-semibold text-sm leading-4'>
        Invite your team
      </p>
      <div className='mt-6 grid grid-cols-2 gap-x-14 gap-y-8'>
        {invites.map((invite, index) => (
          <>
            <div>
              <label
                key={'label' + index}
                className='block mb-[14px] text-xs font-poppins'
              >
                Email
              </label>
              <InputV2
                key={'email' + index}
                value={invite.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  changeHandler(index, e)
                }
                placeholder='joesmith@company.com'
              />
            </div>
            <div>
              <label
                key={'role label +' + index}
                className='block mb-[14px] text-xs font-poppins'
              >
                Role
              </label>
              <DropdownV2
                key={'role dropdown' + index}
                directionUp={
                  !(invites.length >= 3 && index < invites.length - 1)
                }
                data={roles}
                selectedIndex={invites[index]?.role_id}
                onChange={(id: number) => roleSelectHandler(index, id)}
                placeholder={'Select a role'}
              />
            </div>
          </>
        ))}
        <button
          onClick={addInviteFormHandler}
          className='w-fit font-poppins text-xs leading-4'
        >
          Add more team members
        </button>
      </div>
      <Button
        disabled={
          invites[0].email === '' ||
          invites[0].role === '' ||
          invites[0].role_id === undefined
        }
        loading={isBusy}
        onClick={inviteBatchHandler}
        className='w-fit mx-auto mt-12'
      >
        Invite team
      </Button>
    </>
  );
};

export default InviteGroupV2;
