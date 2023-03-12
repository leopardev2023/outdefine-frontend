import * as Sentry from "@sentry/react";
import { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";

import TalentSkeleton from "../../components/Talent.Skeleton";
import applicationApi from "network/application";

import Button from "components/Button/ButtonV2";
import robotBikeImg from "assets/img/application/robotBike.png";
import bgBikeImg from "assets/img/application/bgBike.png";
import ModalV2 from "components/Modal/ModalV2";
import TextareaV2 from "components/V2/Textarea/TextareaV2";
import IconV2 from "components/V2/Icons/IconV2";
import IconButtonV2 from "components/V2/IconButton";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

interface PropsType {
  selectedId?: number;
  appList?: any;
  loading?: boolean;
  invited?: boolean;
  onRefetch: () => void;
}

import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import TalentCardV2 from "../../components/Card.TalentV2";
import useTalentProfile from "../../hooks/useTalentProfile";
import TalentInfoView from "../../components/TalentInfoView";
import AvatarRoleNameGroup from "../../components/Group.AvatarRoleName";

const Applicants = ({ selectedId, appList, loading = true, invited, onRefetch }: PropsType) => {
  const [msgModal, setMsgModal] = useState<boolean>(false);
  const [declineModal, setDeclineModal] = useState<boolean>(false);
  const [interviewModal, setInterviewModal] = useState<boolean>(false);
  const [inviteDesc, setInviteDesc] = useState<string>("");
  const [talentApp, setTalentApp] = useState<any>({});

  const { goToTalentProfile, loading: redirectLoading } = useTalentProfile();

  const [pending, setPending] = useState<boolean>(false);

  const sendInvite = async () => {
    setPending(true);
    try {
      const response = await applicationApi.interviewApplication(
        talentApp.id,
        talentApp.company_id,
        talentApp.freelancer_id,
        talentApp.job_id,
        inviteDesc,
      );
      if (response.success) {
        toast.custom(<Toast type="success" message="Successfully invited for interview" />);
        onRefetch();
      } else {
        throw new Error("There was an error while sending invitation");
      }
    } catch (err) {
      toast.custom(<Toast type="error" message={JSON.stringify(err)} />);
      //Sentry.captureException(err);
    }
    setPending(false);
    setInterviewModal(false);
  };

  const decline = async () => {
    setPending(true);
    try {
      const result = await applicationApi.declineApplication({
        application_id: talentApp.id,
        freelancer_id: talentApp?.freelancer_id,
      });
      if (result.success) {
        toast.custom(<Toast type="success" message="Talent Declined" />);
        onRefetch();
      }
    } catch (err) {
      toast.custom(<Toast type="error" message={JSON.stringify(err)} />);
      //Sentry.captureException(err);
    }
    setPending(false);
    setDeclineModal(false);
  };

  if (loading) return <TalentSkeleton />;

  return (
    <>
      <div className="flex flex-col justify-center gap-y-5 items-center bg-background">
        {(() => {
          const applications = appList
            ?.filter((app) => app.application_status === "APPLIED" && selectedId === app.job_id)
            .filter((app) => (invited ? app.is_invited : !app.is_invited));
          return applications.length === 0 ? (
            <EmptyPanelV2
              image={"/common/spaceboy/astronaut-celebrating.png"}
              title={"No applicants"}
              description={"Create job posts that talent can apply to."}
              imageClassName="w-[150px] h-[155px]"
              className="h-[440px] pt-16"
            >
              <NavLink to={"/talent"} className="mt-6">
                <Button>Find talent</Button>
              </NavLink>
            </EmptyPanelV2>
          ) : (
            <>
              <div className="flex justify-start items-start w-full bg-orange-hue-1 py-2 gap-x-10 rounded-md">
                <div className="w-[172px] h-[104px] relative shrink-0 pl-4">
                  <img alt="bgBikeImg" src={bgBikeImg} className="w-[170px] h-[104px] absolute" />
                  <img
                    alt="robotBikeImg"
                    src={robotBikeImg}
                    className="w-[125px] h-[125px] absolute left-1/2 -translate-x-1/3 bottom-[-1px]"
                  />
                </div>
                <div className="flex flex-col gap-y-2 mt-2 pr-40">
                  <span className="font-poppins font-semibold text-xl">
                    Check out who’s applying to your job post
                  </span>
                  <span className="text-sm font-inter">
                    Interview talent by pressing “interview”, see the talent’s profile by pressing
                    “profile”. Use the “...” to view the talents message, see their scores or
                    decline the applications.
                  </span>
                </div>
              </div>
              {applications.map((item) => {
                return (
                  <TalentCardV2
                    key={item.id}
                    talent={{
                      ...item.FreelancerProfile,
                      User: item.User,
                      boosted: item.boosted,
                    }}
                    menu={{
                      actions: [
                        () => {
                          setMsgModal(true);
                          setTalentApp(item);
                        },
                        // () => {},
                        () => {
                          setDeclineModal(true);
                          setTalentApp(item);
                        },
                      ],
                      texts: [
                        <>
                          <IconV2 iconType="MESSAGE" /> View message
                        </>,
                        // <>
                        //   <IconV2 iconType='DOCUMENT' iconClassName='w-5 h-5' />
                        //   View scores
                        // </>,
                        <>
                          <IconV2 iconType="CLOSE" iconClassName="w-[18px] h-[18px]" />
                          Decline talent
                        </>,
                      ],
                    }}
                  >
                    <div className="flex gap-x-9 shadow-none">
                      <Button
                        onClick={() => goToTalentProfile(item.freelancer_id)}
                        loading={loading}
                        type="button"
                        variant="secondary"
                        className="w-[160px] px-0"
                      >
                        Profile
                      </Button>
                      <Button
                        type="button"
                        variant="primary"
                        className="w-[160px] px-0"
                        onClick={() => {
                          setInterviewModal(true);
                          setTalentApp(item);
                        }}
                      >
                        {invited ? "Set as interviewing" : "Interview"}
                      </Button>
                    </div>
                  </TalentCardV2>
                );
              })}
            </>
          );
        })()}
      </div>
      <ModalV2 isOpen={msgModal}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col items-center bg-white w-[720px] rounded-lg">
            <div>
              <IconButtonV2
                onClick={() => setMsgModal(false)}
                iconType="CLOSE"
                className="p-0 absolute right-6 top-6"
                iconClassName="w-5 h-5"
              />
              <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">Message</h2>
            </div>
            {Object.keys(talentApp).length !== 0 && (
              <div className="w-full px-14 pt-7 pb-11 flex items-start justify-start flex-col">
                <AvatarRoleNameGroup
                  boosted={talentApp?.boosted}
                  role={talentApp?.FreelancerProfile?.role}
                  user={talentApp?.User}
                />

                <div className="w-full mt-7 h-[160px] pt-4 pl-4 bg-lighter-gray border border-light-gray rounded-lg">
                  <pre className="whitespace-pre-wrap font-inter text-xs">
                    {talentApp?.cover_letter}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalV2>
      <ModalV2 isOpen={declineModal}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col items-center bg-white w-[650px] rounded-lg px-12">
            <div>
              <IconButtonV2
                onClick={() => setDeclineModal(false)}
                iconType="CLOSE"
                className="p-0 absolute right-6 top-6"
                iconClassName="w-5 h-5"
              />
              <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">
                Decline Modal
              </h2>
            </div>
            {Object.keys(talentApp).length !== 0 && (
              <div className="border-dark-gray border rounded-md mt-9 px-4 py-6 w-[550px]">
                <TalentInfoView
                  talent={{
                    ...talentApp.FreelancerProfile,
                    User: talentApp.User,
                  }}
                />
              </div>
            )}
            <div className="my-7">
              <Button type="button" variant="primary" loading={pending} onClick={decline}>
                Decline
              </Button>
            </div>
          </div>
        </div>
      </ModalV2>
      <ModalV2 isOpen={interviewModal}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col items-center bg-white w-[720px] rounded-lg">
            <div className="">
              <IconButtonV2
                onClick={() => setInterviewModal(false)}
                iconType="CLOSE"
                className="p-0 absolute right-6 top-6"
                iconClassName="w-5 h-5"
              />
              <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">
                Interview invite
              </h2>
            </div>
            <form className="w-full mt-7 px-14 flex items-start justify-start flex-col">
              <AvatarRoleNameGroup
                boosted={talentApp?.boosted}
                role={talentApp?.FreelancerProfile?.role}
                user={talentApp?.User}
              />

              <span className="mt-5 text-xs">Introduce yourself (optional)</span>
              <div className="w-full pt-3 ">
                <TextareaV2
                  value={inviteDesc}
                  placeholder="Tell them why they would be a great fit for this role."
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInviteDesc(e.target.value)}
                  className={"text-xs h-[120px] resize-none"}
                />
              </div>
              <span className="mt-1 mb-5 font-bold text-xs">
                An email will be sent to you and the talent regarding this invite, you can then
                schedule your interview based on your prefer method.
              </span>
            </form>
            <div className="mb-6">
              <Button
                className="w-[120px]"
                type="button"
                variant="primary"
                loading={pending}
                onClick={sendInvite}
              >
                Invite
              </Button>
            </div>
          </div>
        </div>
      </ModalV2>
    </>
  );
};
export default Applicants;
