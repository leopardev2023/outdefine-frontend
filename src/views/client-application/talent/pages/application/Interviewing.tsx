import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import Button from "components/Button/ButtonV2";
import robotBikeImg from "assets/img/application/robotBike.png";
import bgBikeImg from "assets/img/application/bgBike.png";
import ModalV2 from "components/Modal/ModalV2";

import CreateOffer from "./offer/CreateOffer";
import PreviewOffer from "./offer/PreviewOffer";
import applicationApi from "network/application";
import TalentSkeleton from "../../components/Talent.Skeleton";

import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import TalentCardV2 from "../../components/Card.TalentV2";

import useTalentProfile from "../../hooks/useTalentProfile";
import IconV2 from "components/V2/Icons/IconV2";
import TalentInfoView from "../../components/TalentInfoView";
import IconButtonV2 from "components/V2/IconButton";
import AvatarRoleNameGroup from "../../components/Group.AvatarRoleName";
import { initialOffer, updatedCreatedOffer } from "redux/slices/application";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

interface PropsType {
  selectedId?: number;
  appList?: any;
  loading?: boolean;
  onRefetch: () => void;
}

const Interviewing = ({ selectedId, appList, loading = true, onRefetch }: PropsType) => {
  const [declineModal, setDeclineModal] = useState<boolean>(false);
  const [extendOfferModal, setExtendOfferModal] = useState<boolean>(false);
  const [offerPreviewModal, setOfferPreviewModal] = useState<boolean>(false);
  const [offerConfirmModal, setOfferConfirmModal] = useState<boolean>(false);
  const [talentApp, setTalentApp] = useState<any>({});
  const [freelancerId, setFreelancerId] = useState<number>(0);
  const createdOffer = useAppSelector((state) => state.application.createdOffer);

  const [pending, setPending] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { goToTalentProfile } = useTalentProfile();

  const [visibility, setVisibility] = useState<boolean>(false);

  const create = async () => {
    try {
      setPending(true);
      const result = await applicationApi.createOffer(createdOffer);
      if (result.success) {
        setVisibility(true);
      } else {
        throw new Error("Error");
      }
    } catch (err) {
      toast.custom(<Toast type="error" message="There was an error, please try again" />);
    }
    setPending(false);
    setOfferConfirmModal(false);
    dispatch(updatedCreatedOffer(initialOffer));
  };

  const decline = async () => {
    setPending(true);
    try {
      const result = await applicationApi.declineApplication({
        application_id: talentApp.id,
        freelancer_id: talentApp?.freelancer_id,
      });
      if (result.success) {
        toast.custom(<Toast type="success" message="Talent declined" />);
        onRefetch();
      } else {
        throw new Error("There was an error while declining the application");
      }

      setDeclineModal(false);
    } catch (err) {
      toast.custom(<Toast type="error" message={JSON.stringify(err)} />);
      //Sentry.captureException(err);
    }
    setPending(false);
  };

  const interviews = appList?.filter(
    (item) => item?.application_status === "INTERVIEW" && selectedId === item?.job_id,
  );

  const gotoOfferHandler = () => {
    setVisibility(false);
    navigate("/talent/applications?tab=offers");
    onRefetch();
  };

  if (loading) return <TalentSkeleton />;

  return (
    <>
      {interviews.length === 0 && (
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
      )}
      {interviews.length > 0 && (
        <div className="flex flex-col justify-center gap-y-5 items-center bg-background">
          <div className="flex justify-start items-start w-full bg-orange-hue-1 py-2 gap-x-10 rounded-md">
            <div className="w-[172px] h-[104px] relative shrink-0  pl-4">
              <img alt="bgBikeImg" src={bgBikeImg} className="w-[170px] h-[104px] absolute" />
              <img
                alt="robotBikeImg"
                src={robotBikeImg}
                className="w-[125px] h-[125px] absolute left-1/2 -translate-x-1/3 bottom-[-1px]"
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-2 pr-40">
              <span className="font-poppins font-bold text-xl">
                Have a talent you like? Extend an offer.
              </span>
              <span className="text-xs font-inter">
                Hire any of Outdefine’s talent risk free for 1 week. Outdefine will manage the
                talent’s contract once you hire, and will pay for the first week of salary if you
                are not satisfied with the talent’s performance during that week. Subject to terms
                per the signed Master Services Agreement.
              </span>
            </div>
          </div>
          {interviews?.map(
            (item) =>
              item.application_status === "INTERVIEW" &&
              selectedId === item.job_id && (
                <TalentCardV2
                  key={item.id}
                  talent={{ ...item.FreelancerProfile, User: item.User }}
                  menu={{
                    actions: [
                      // () => {},
                      () => {
                        setTalentApp(item);
                        setDeclineModal(true);
                      },
                    ],
                    texts: [
                      // <>
                      //   <IconV2 iconType='MESSAGE' />
                      //   View scores
                      // </>,
                      <>
                        <IconV2 iconType="CLOSE" iconClassName="w-[18px] h-[18px]" />
                        Decline talent
                      </>,
                    ],
                  }}
                >
                  <div className="flex gap-x-9 shadow-none h-10">
                    <Button
                      loading={loading}
                      onClick={() => goToTalentProfile(item?.freelancer_id)}
                      type="button"
                      variant="secondary"
                      className="w-[160px] px-0"
                    >
                      Profile
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => {
                        setExtendOfferModal(true);
                        setFreelancerId(item?.freelancer_id);
                        setTalentApp(item);
                      }}
                    >
                      Extend offer
                    </Button>
                  </div>
                </TalentCardV2>
              ),
          )}
        </div>
      )}

      <ModalV2 isOpen={declineModal}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col items-center bg-white w-[650] rounded-lg px-16">
            <div>
              <IconButtonV2
                onClick={() => setDeclineModal(false)}
                iconType="CLOSE"
                className="p-0 absolute right-6 top-6"
                iconClassName="w-5 h-5"
              />

              <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">
                Decline Talent
              </h2>
            </div>
            {Object.keys(talentApp).length !== 0 && (
              <form className="border-light-gray border-[1px] rounded-md mt-9 px-4 py-6">
                <TalentInfoView
                  talent={{
                    ...talentApp.FreelancerProfile,
                    User: talentApp.User,
                  }}
                />
              </form>
            )}
            <div className="mb-5 mt-9">
              <Button
                className="w-[120px] px-0"
                loading={pending}
                type="button"
                variant="primary"
                onClick={decline}
              >
                Decline
              </Button>
            </div>
          </div>
        </div>
      </ModalV2>
      <ModalV2 isOpen={extendOfferModal}>
        <CreateOffer
          setOfferPreviewModal={(enabled: boolean) => {
            setOfferPreviewModal(enabled);
          }}
          setExtendOfferModal={(enabled: boolean) => {
            setExtendOfferModal(enabled);
          }}
          freelancerId={freelancerId}
          app={talentApp}
        />
      </ModalV2>
      <ModalV2 isOpen={offerPreviewModal}>
        <PreviewOffer
          setOfferPreviewModal={(enabled: boolean) => {
            setOfferPreviewModal(enabled);
          }}
          setOfferConfirmModal={(enabled: boolean) => {
            setOfferConfirmModal(enabled);
          }}
          setExtendOfferModal={(enabled: boolean) => {
            setExtendOfferModal(enabled);
          }}
          talentApp={talentApp}
        />
      </ModalV2>
      <ModalV2 isOpen={offerConfirmModal}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex flex-col items-center bg-white w-[650px] rounded-lg px-[72px]">
            <div className="flex flex-col gap-y-5">
              <IconButtonV2
                onClick={() => setOfferConfirmModal(false)}
                iconType="CLOSE"
                className="p-0 absolute right-6 top-6"
                iconClassName="w-5 h-5"
              />
              <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">
                Offer confirmation
              </h2>
              <span className="text-sm">Confirm that you want to send an offer to this talent</span>
            </div>
            {Object.keys(talentApp).length !== 0 && (
              <div className="w-full mt-[18px] border-[1px] border-dark-gray rounded-lg pt-6 px-4 pb-8">
                <AvatarRoleNameGroup
                  role={talentApp?.FreelancerProfile?.role}
                  user={talentApp?.User}
                  boosted={talentApp?.boosted}
                  avatarSizeClass="w-[65px] h-[65px]"
                />
              </div>
            )}
            <div className="my-8">
              <Button
                className="w-[180px]"
                type="button"
                variant="primary"
                onClick={create}
                loading={pending}
              >
                Send offer
              </Button>
            </div>
          </div>
        </div>
      </ModalV2>
      <ModalV2 isOpen={visibility}>
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          className="overflow-x-hidden w-[680px] absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-full h-[530px] rounded-lg relative">
            <img
              src="/common/bg-sky.png"
              alt="bg-sky"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 w-full h-full pt-[76px] flex flex-col items-center">
              <h4 className="text-white font-semibold text-2xl w-[420px] text-center">
                Congratulations on extending an offer!
              </h4>
              <img
                src="/common/spaceboy/gamer1.png"
                alt="astro-gamer1"
                className="w-[280px] h-[258px] block mt-2"
                width={280}
                height={258}
              />
              <NavLink to="/talent/applications?tab=offers" className="mt-8">
                <Button variant="secondary" onClick={gotoOfferHandler}>
                  Lets go!
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </ModalV2>
    </>
  );
};
export default Interviewing;
