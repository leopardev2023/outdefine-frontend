import { useState } from "react";
import { useAppSelector } from "redux/hooks/redux-hooks";

import Button from "components/Button/ButtonV2";
import CheckBoxV2 from "components/V2/Buttons/CheckBoxV2";
import IconButtonV2 from "components/V2/IconButton/IconButtonV2";
import AvatarRoleNameGroup from "views/client-application/talent/components/Group.AvatarRoleName";
import OfferPresentation from "views/client-application/talent/components/Presentation.Offer";

interface PropsType {
  setWithdrawModal: (enabled: boolean) => void;
  setWithDrawConfirmModal: (enabled: boolean) => void;
  setWithdrawInfo: (enabled: any) => any;
  offer: IOfferResponse;
}

const reasons = ["OVERDUE", "FILLED FROM OUT", "ALREADY ACCEPTED"];

const WdOffer = ({
  setWithdrawModal,
  setWithDrawConfirmModal,
  setWithdrawInfo,
  offer,
}: PropsType) => {
  const [options1, setOptions1] = useState<boolean>(false);
  const [options2, setOptions2] = useState<boolean>(false);
  const [options3, setOptions3] = useState<boolean>(false);

  const onCheckHandler1 = (value: boolean) => {
    setOptions1(!options1);
    setOptions2(false);
    setOptions3(false);
  };
  const onCheckHandler2 = (value: string | number) => {
    setOptions2(!options2);
    setOptions1(false);
    setOptions3(false);
  };
  const onCheckHandler3 = (value: string | number) => {
    setOptions3(!options3);
    setOptions1(false);
    setOptions2(false);
  };

  const withdrawn = () => {
    let reason = "";
    if (options1) {
      reason = reasons[0];
    } else if (options2) {
      reason = reasons[1];
    } else {
      reason = reasons[2];
    }
    const withdrawObj = {
      id: offer.id,
      company_id: offer.company_id,
      withdraw_reason: reason,
    };
    setWithdrawModal(false);
    setWithDrawConfirmModal(true);
    setWithdrawInfo(withdrawObj);
  };

  return (
    <div className="absolute top-[150px] left-1/2 -translate-x-1/2 z-10 pb-20">
      <div className="flex flex-col items-center bg-white w-[720px] rounded-lg px-16">
        <div className="flex flex-col justify-center items-center gap-y-5">
          <IconButtonV2
            onClick={() => setWithdrawModal(false)}
            iconType="CLOSE"
            className="p-0 absolute right-6 top-6"
          />

          <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">
            Withdraw offer
          </h2>
        </div>
        <div className="w-full mt-7">
          <AvatarRoleNameGroup
            role={offer?.FreelancerProfile?.role}
            user={offer?.User}
            avatarSizeClass="w-14 h-14 rounded-full"
          />
        </div>
        <OfferPresentation offer={offer} />
        <div className="-mt-10 flex flex-col w-full gap-y-[14px] justify-between mb-5">
          <span className="text-sm font-semibold">Reason for withdraw of offer</span>
          <div className="flex flex-col justify-start text-xs gap-y-3">
            <CheckBoxV2 value={1} selected={options1} onClick={onCheckHandler1}>
              <span className="text-xs leading-6">Overdue response</span>
            </CheckBoxV2>
            <CheckBoxV2 value={2} selected={options2} onClick={onCheckHandler2}>
              <span className="text-xs leading-6">Position has been filled</span>
            </CheckBoxV2>
            <CheckBoxV2 value={3} selected={options3} onClick={onCheckHandler3}>
              <span className="text-xs leading-6">Another talent has accepted the offer</span>
            </CheckBoxV2>
          </div>
        </div>
        <div className="my-8 flex justify-center gap-x-8">
          <Button
            type="button"
            variant="primary"
            onClick={withdrawn}
            disabled={options1 === false && options2 === false && options3 === false}
          >
            Withdraw
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WdOffer;
