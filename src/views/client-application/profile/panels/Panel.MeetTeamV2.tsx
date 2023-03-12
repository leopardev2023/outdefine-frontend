import { ReactElement, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

// components
import IconButtonV2 from "components/V2/IconButton";
import Heading from "components/Heading/HeadingV2";
import ModalV2 from "components/Modal/ModalV2";
import Button from "components/Button/ButtonV2";
import IconV2 from "components/V2/Icons";

import TeamMemberCardV2 from "../components/Card.TeamMemberV2";
import TeamRoleAccordionV2 from "../components/Accordion.TeamRoleV2";
import InviteGroupV2 from "../components/Group.InvitesV2";
import MemberEditModal from "../components/Modal.MemberEdit";

const MeetTeamPanelV2: React.FC = (): ReactElement => {
  const [searchParam, setSearchParam] = useSearchParams();

  const pending = useSelector((root: RootState) => root.companyprofile.is_busy);
  const members: ITeamMember[] = useSelector((root: RootState) => root.companyprofile.memebers);

  console.log("members", members);

  const [modal, setModal] = useState<IMemberModal>({
    type: "INVITE",
    visibility: false,
    data: {},
  });
  const [editable, setEditable] = useState<boolean>(false);

  useEffect(() => {
    searchParam.get("action") === "invite" &&
      setModal({ type: "INVITE", visibility: true, data: {} });
  }, [searchParam]);

  const closeModalHandler = () => {
    setModal({ ...modal, visibility: false });
    searchParam.get("action") === "invite" && setSearchParam("tab=team");
  };

  return (
    <>
      <div className="bg-white rounded-lg p-[16px_32px_32px_32px] mb-8 shadow-card">
        <div className="flex justify-between">
          <Heading variant="h6" className="text-xl font-semibold leading-[30px]">
            Meet the team
          </Heading>
          <div className="flex gap-[10px]">
            {!editable ? (
              <>
                <IconButtonV2
                  iconType="EDIT"
                  onClick={() => setEditable(true)}
                  iconClassName="w-4 h-4"
                />
                <IconButtonV2
                  iconType="ADD"
                  onClick={() => setModal({ ...modal, type: "INVITE", visibility: true })}
                  iconClassName="w-4 h-4"
                />
              </>
            ) : (
              <button onClick={() => setEditable(false)} className="w-8 h-8 flex">
                <IconV2 iconType="CLOSE" iconClassName="w-5 h-5 block m-auto" />
              </button>
            )}
          </div>
        </div>
        <div className="mt-5 gap-10 grid grid-cols-3">
          {members?.map((member: ITeamMember, index: number) => (
            <TeamMemberCardV2 key={member?.client_id ?? index + index} {...member}>
              {editable && (
                <div className="flex flex-col justify-between items-end">
                  <IconButtonV2
                    onClick={() => setModal({ data: member, type: "EDIT", visibility: true })}
                    iconClassName="w-4 h-4"
                    iconType="EDIT"
                  />
                  <button
                    onClick={() =>
                      setModal({
                        data: member,
                        type: "DELETE",
                        visibility: true,
                      })
                    }
                    className="text-sm leading-[21px] font-inter active:font-semibold"
                  >
                    Remove
                  </button>
                </div>
              )}
            </TeamMemberCardV2>
          ))}
        </div>
      </div>
      <ModalV2 onClose={closeModalHandler} isOpen={modal.visibility}>
        {modal.type === "INVITE" && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className="overflow-x-hidden w-[720px] pb-20 absolute left-1/2 top-[70px] -translate-x-1/2 z-10"
          >
            <div className="w-full rounded-lg bg-white p-[66px_56px_30px_56px] flex flex-col relative">
              <button
                onClick={() => setModal({ ...modal, visibility: false })}
                className="absolute top-7 right-8"
              >
                <IconV2 iconType={"CLOSE"} />
              </button>
              <Heading variant="h6" className="font-semibold text-xl leading-[30px] text-center">
                Invite your team
              </Heading>
              <TeamRoleAccordionV2 />
              <InviteGroupV2 onClose={closeModalHandler} />
            </div>
          </div>
        )}
        {modal.type === "DELETE" && (
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            className="overflow-x-hidden w-[440px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
          >
            <div className="w-full p-[44px_66px_40px_66px] bg-white rounded-lg flex flex-col relative">
              <IconButtonV2
                className="absolute top-[22px] right-[22px]"
                onClick={closeModalHandler}
                iconType="CLOSE"
              />
              <h6 className="text-xl font-poppins font-semibold leading-[150%] text-center">
                Confirm removal
              </h6>
              <p className="mt-[18px] mb-[18px] text-center">
                Confirm removal of team member below
              </p>
              <TeamMemberCardV2 {...modal.data} />
              <Button onClick={closeModalHandler} className="mt-8 mx-auto min-w-[170px]">
                Remove
              </Button>
            </div>
          </div>
        )}
        {modal.type === "EDIT" && (
          <MemberEditModal
            pending={pending}
            onClose={() => setModal({ ...modal, visibility: false })}
            {...modal.data}
          />
        )}
      </ModalV2>
    </>
  );
};

export default MeetTeamPanelV2;
