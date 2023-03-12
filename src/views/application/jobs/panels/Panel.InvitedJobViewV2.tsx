import { ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";

import Button from "components/Button/ButtonV2";

import JobCardV2 from "views/client-application/profile/components/Card.JobV2";
import { EmptyJobPanel } from "./Panel.AppliedJobViewV2";

import IconButtonV2 from "components/V2/IconButton/IconButtonV2";
import IconV2 from "components/V2/Icons/IconV2";
import ModalV2 from "components/Modal/ModalV2";
import { LogoWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";

import useJobInvitations from "../hooks/useJobInvitations";

export default function InvitedJobViewPanelV2(): ReactElement {
  const {
    invitations: invitedJobs,
    action,
    menu,
    setMenu,
    addressInviteHandler,
  } = useJobInvitations();

  const [modal, setModal] = useState({ id: Infinity, visibility: false });

  return (
    <>
      {invitedJobs.length === 0 && <EmptyJobPanel />}
      {invitedJobs.map((invitation, index) => (
        <JobCardV2
          key={invitation.id}
          {...invitation.PostedJobs}
          viewFromTalent
          companyLogo={invitation.PostedJobs?.Company?.logo}
          dateType="INVITED"
          otherDate={invitation.createdAt}
        >
          <div className="min-w-fit flex flex-col items-end justify-between">
            <div className="flex flex-col items-end gap-10 relative">
              <IconButtonV2
                iconType="TRIPLE-DOT"
                className="p-0"
                onClick={() =>
                  setMenu({
                    id: invitation.id,
                    visibility: menu.id === invitation.id ? !menu.visibility : true,
                  })
                }
              />
              {menu.visibility && menu.id === invitation.id && (
                <ul className="w-[200px] px-[14px] py-4 bg-white rounded-lg shadow-lg font-inter text-xs absolute right-0 top-5">
                  <li
                    onClick={() => {
                      setModal({ id: index, visibility: true });
                      setMenu({ id: Infinity, visibility: false });
                    }}
                    className="py-5 flex items-center gap-4 cursor-pointer hover:bg-[#D2D6ED] pl-[10px] rounded-lg"
                  >
                    <IconV2 iconType="MESSAGE" iconClassName="w-4 h-4" />
                    View message
                  </li>
                  <li
                    onClick={() =>
                      addressInviteHandler(
                        "DECLINE",
                        invitation.company_id,
                        invitation.job_id,
                        invitation.id,
                      )
                    }
                    className="py-5 flex items-center gap-4 cursor-pointer hover:bg-[#D2D6ED] pl-[10px] rounded-lg"
                  >
                    <IconV2 iconType="CLOSE" iconClassName="w-4 h-4" />
                    Decline invite
                  </li>
                </ul>
              )}
              {/* <div className='flex items-center gap-1'>
                <span className='text-[#8A8A8A] font-inter text-xs font-semibold'>
                  Response due:
                </span>{' '}
                <BadgeV2>10/10/22</BadgeV2>
              </div> */}
            </div>
            <div className="flex gap-5">
              <NavLink to={`/jobs/post/${invitation.job_id}`}>
                <Button variant="secondary" className="w-fit">
                  View job
                </Button>
              </NavLink>
              <Button
                onClick={() =>
                  addressInviteHandler(
                    "ACCEPT",
                    invitation.company_id,
                    invitation.job_id,
                    invitation.id,
                  )
                }
                className="w-[140px] px-0"
                loading={action.pending && action.id === invitation.id}
              >
                Accept invite
              </Button>
            </div>
          </div>
        </JobCardV2>
      ))}

      <ModalV2
        isOpen={modal.visibility}
        onClose={() => setModal({ id: Infinity, visibility: false })}
      >
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          className="overflow-x-hidden w-[720px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-full pt-12 pb-11 px-14 bg-white rounded-lg relative">
            <IconButtonV2
              onClick={() => setModal({ id: Infinity, visibility: false })}
              iconType="CLOSE"
              iconClassName="w-5 h-5"
              className="p-0 top-8 right-8 absolute"
            />
            <h3 className="font-poppins font-semibold text-xl text-center">Message</h3>
            <div className="mt-8 flex items-center gap-5">
              <LogoWithDefaultV2
                src={invitedJobs[modal.id]?.PostedJobs?.Company?.logo}
                className="w-[66px] h-[66px] rounded-full"
              />
              <div>
                <p className="font-poppins font-semibold text-base">
                  {invitedJobs[modal.id]?.PostedJobs?.job_title}
                </p>
                <p className="text-sm font-bold text-darker-gray">
                  {invitedJobs[modal.id]?.PostedJobs?.Company?.name}
                </p>
              </div>
            </div>
            <pre className="mt-9 py-5 px-4 w-full h-[136px] rounded-lg border-[1px] border-light-gray bg-[#F9F9F9] text-xs font-inter whitespace-pre-wrap">
              {invitedJobs[modal.id]?.introduction}
            </pre>
          </div>
        </div>
      </ModalV2>
    </>
  );
}
