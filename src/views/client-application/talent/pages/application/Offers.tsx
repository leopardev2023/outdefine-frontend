import * as Sentry from "@sentry/react";
import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppSelector } from "redux/hooks/redux-hooks";

import robotBikeImg from "assets/img/application/robotBike.png";
import bgBikeImg from "assets/img/application/bgBike.png";

import Button from "components/Button/ButtonV2";

import TalentOffer from "../../components/Card.TalentOffer";
import ViewOffer from "../../components/Card.ViewOffer";
import ModalV2 from "components/Modal/ModalV2";
import closeSVG from "assets/svg/assessment/close.svg";
import applicationApi from "network/application";
import WdOffer from "./offer/WdOffer";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import AvatarRoleNameGroup from "../../components/Group.AvatarRoleName";

const Offers = ({ onRefetch }: { onRefetch: () => void }) => {
  const offersList = useAppSelector((state) => state.application.offerList);

  const [checkUser, setCheckUser] = useState<boolean>(false);
  const [viewOfferModal, setViewOfferModal] = useState<boolean>(false);
  const [withdrawModal, setWithdrawModal] = useState<boolean>(false);
  const [pending, setPending] = useState<boolean>(false);
  const [offerItem, setOfferItem] = useState<any>();
  const [withDrawConfirmModal, setWithDrawConfirmModal] = useState<boolean>(false);
  const [withdrawInfo, setWithdrawInfo] = useState<any>({});

  useEffect(() => {
    setCheckUser(!(Array.isArray(offersList) && offersList?.length > 0));
  }, [offersList]);

  const claimWithdrawn = async () => {
    setPending(true);
    try {
      const result = await applicationApi.withdrawn(withdrawInfo);
      if (result.success) {
        toast.custom(<Toast type="success" message="Success" />);
        onRefetch();
      }
    } catch (err: any) {
      //Sentry.captureException(err);
      toast.custom(<Toast type="error" message="There was an error, please try again" />);
      // toast.error(JSON.stringify(err));
    }
    setPending(false);
    setWithDrawConfirmModal(false);
  };

  return (
    <>
      {checkUser && (
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
      {!checkUser && (
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
                Have talent you like? Extend an offer.
              </span>
              <span className="text-xs font-inter font-bold">
                By extending this offer, the talent is able to earn a certain amount of tokens for
                accepting this role.
              </span>
            </div>
          </div>
          {offersList?.length > 0 &&
            offersList.map((item, index) => (
              <TalentOffer
                setWithdrawModal={(enabled: boolean) => {
                  setWithdrawModal(enabled);
                }}
                setWithDrawConfirmModal={(enabled: boolean) => {
                  setWithDrawConfirmModal(enabled);
                }}
                setViewOfferModal={(enabled: boolean) => {
                  setViewOfferModal(enabled);
                }}
                setOfferItem={(enabled: any) => {
                  setOfferItem(enabled);
                }}
                offer={item}
                key={index}
              />
            ))}
        </div>
      )}
      <ModalV2 isOpen={withdrawModal}>
        <WdOffer
          setWithdrawModal={(enabled: boolean) => {
            setWithdrawModal(enabled);
          }}
          setWithDrawConfirmModal={(enabled: boolean) => {
            setWithDrawConfirmModal(enabled);
          }}
          setWithdrawInfo={(enabled: any) => {
            setWithdrawInfo(enabled);
          }}
          offer={offerItem}
        />
      </ModalV2>
      <ModalV2 isOpen={withDrawConfirmModal}>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center bg-white w-[650px] rounded-lg px-16">
            <div className="flex flex-col gap-y-4">
              <button
                className="absolute right-6 top-6"
                onClick={() => setWithDrawConfirmModal(false)}
              >
                <img src={closeSVG} alt="" />
              </button>
              <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">
                Withdraw offer
              </h2>
              <span className="text-sm">
                Confirm that you want to withdraw your offer to this talent
              </span>
            </div>
            <form className="py-4 w-full">
              <div className="flex justify-start border-dark-gray border-[1px] rounded-md pl-4 pt-6 pb-6">
                <AvatarRoleNameGroup
                  role={offerItem?.FreelancerProfile?.role}
                  user={offerItem?.User}
                  avatarSizeClass="w-14 h-14 rounded-full"
                />
              </div>
            </form>
            <div className="mb-9">
              <Button
                type="button"
                variant="primary"
                onClick={claimWithdrawn}
                loading={pending}
                className="w-[200px]"
              >
                Withdraw offer
              </Button>
            </div>
          </div>
        </div>
      </ModalV2>
      <ModalV2 isOpen={viewOfferModal}>
        <ViewOffer
          setOfferModal={(enabled: boolean) => {
            setViewOfferModal(enabled);
          }}
          offer={offerItem}
        />
      </ModalV2>
    </>
  );
};
export default Offers;
