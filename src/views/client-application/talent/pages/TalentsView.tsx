import * as Sentry from "@sentry/react";
import { ChangeEvent } from "react";
import { useAppSelector } from "redux/hooks/redux-hooks";

import TalentSkeleton from "../components/Talent.Skeleton";
import TalentCardV2 from "../components/Card.TalentV2";
import FilterPanel from "../components/FilterPanel";

import Button from "components/Button/ButtonV2";
import ModalV2 from "components/Modal/ModalV2";
import InputV2 from "components/V2/Input/InputV2";
import DropdownV2 from "components/V2/Dropdown/DropdownV2";
import TextareaV2 from "components/V2/Textarea/TextareaV2";
import IconButtonV2 from "components/V2/IconButton/IconButtonV2";
import { LogoWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";

import useJobs from "views/client-application/hooks/useJobs";
import useTalents from "../hooks/useTalents";
import useInviteTalent from "../hooks/useInviteTalent";
import useTalentProfile from "../hooks/useTalentProfile";
import AvatarRoleNameGroup from "../components/Group.AvatarRoleName";
import formatDate from "helpers/date";

const Talents = () => {
  const companyProfile = useAppSelector((state) => state.companyprofile);
  const companyId = useAppSelector((state) => state.companyprofile.id);

  const { jobs } = useJobs();
  const { goToTalentProfile, loading: redirectLoading } = useTalentProfile();

  const { loading, talentList, modal, setModal } = useTalents();
  const { disabled, invitePending, inviteTalentHandler } = useInviteTalent(
    jobs,
    modal,
    setModal,
    companyId,
  );

  return (
    <main className="pt-[66px] w-full min-h-screen max-h-screen overflow-x-hidden overflow-y-scroll">
      <div className="flex flex-row justify-start items-center gap-x-7 w-full mx-[100px] 2xl:mx-[200px] mb-12">
        <div>
          <LogoWithDefaultV2
            src={companyProfile?.company?.logo ?? ""}
            className="w-[100px] h-[100px] rounded-full border bg-white border-white"
          />
        </div>
        <div className="flex flex-col gap-y-1 font-semibold">
          <span className="font-poppins text-xl ">
            Hello {companyProfile?.company?.name ?? "Company"}
          </span>
          <span className="font-poppins font-semibold text-xs text-inactive-gray">
            Search through our vetted talent pool
          </span>
        </div>
      </div>
      <div className="mx-[100px] 2xl:mx-[200px]">
        <FilterPanel />
      </div>
      <div className="mx-[100px] 2xl:mx-[200px] mt-15 flex flex-col items-center">
        <div
          className="flex gap-2 font-poppins text-base mb-6 w-full font-semibold"
          data-cy="card-label"
        >
          Recommended for you
        </div>
        {!loading ? (
          <div className="flex flex-col gap-x-12 w-full gap-y-7 mb-10">
            {talentList.map((talent: any, index: number) => {
              return (
                <TalentCardV2 talent={talent} key={talent.id || index}>
                  <div className="ml-auto flex gap-x-5 shadow-none h-11" data-cy="card-talent">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        goToTalentProfile(talent.freelancer_id);
                      }}
                    >
                      Profile
                    </Button>

                    {jobs.length > 0 && (
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() =>
                          setModal({
                            ...modal,
                            visibility: true,
                            talentToInvite: talent,
                          })
                        }
                      >
                        Invite to apply
                      </Button>
                    )}
                  </div>
                </TalentCardV2>
              );
            })}
          </div>
        ) : (
          <TalentSkeleton />
        )}
      </div>
      <ModalV2 isOpen={modal.visibility}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col items-center bg-white w-[720px] rounded-lg">
            <div>
              <IconButtonV2
                onClick={() =>
                  setModal({
                    visibility: false,
                    calendarLink: "",
                    intervewDescription: "",
                    talentToInvite: undefined,
                    selectedJobID: undefined,
                  })
                }
                iconType="CLOSE"
                className="p-0 absolute right-6 top-6"
                iconClassName="w-5 h-5"
              />
              <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">
                Interview invite
              </h2>
            </div>
            <form className="w-full mt-8 pr-11 pl-16 flex items-start justify-start flex-col">
              <AvatarRoleNameGroup
                role={modal.talentToInvite?.role}
                user={modal.talentToInvite?.User}
              />

              <span className="mt-5 mb-1 text-xs font-poppins">
                Choose an active job post and invite talent to apply
              </span>
              <DropdownV2
                placeholder="Choose active job post"
                data={jobs.map((job) => {
                  return {
                    id: job.id,
                    value: `${job.job_title} - created at ${formatDate.mmddyyyy(
                      new Date(job.createdAt).toLocaleDateString(),
                    )}`,
                  };
                })}
                selectedIndex={modal.selectedJobID}
                onChange={(idx: number) => setModal({ ...modal, selectedJobID: idx })}
              />
              <span className="mt-5 text-xs font-poppins">Introduce yourself</span>
              <div className="w-full pt-2">
                <TextareaV2
                  value={modal.intervewDescription}
                  placeholder="Tell them why they would be a great fit for this role."
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setModal({ ...modal, intervewDescription: e.target.value })
                  }
                  className={"text-xs h-[120px]"}
                />
              </div>
              <span className="mt-1 mb-5 font-bold text-xs">
                An email will be sent to you and the talent regarding this invite, you can then
                schedule your interview based on your preferred method.
              </span>
            </form>
            <div className="mb-7">
              <Button
                disabled={disabled}
                type="button"
                variant="primary"
                loading={invitePending}
                onClick={inviteTalentHandler}
                className="w-[180px]"
              >
                Invite
              </Button>
            </div>
          </div>
        </div>
      </ModalV2>
    </main>
  );
};

export default Talents;
