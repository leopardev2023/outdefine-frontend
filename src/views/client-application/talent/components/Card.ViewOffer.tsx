import { ReactChildren } from "react";
import { useAppSelector } from "redux/hooks/redux-hooks";
import dollarSVG from "assets/svg/talent/dollar.svg";
import BadgeV2 from "components/V2/Badges/BadgeV2";
import prototype from "helpers/prototype";
import object from "helpers/object";
import formatDate from "helpers/date";
import IconV2 from "components/V2/Icons";
import IconButtonV2 from "components/V2/IconButton/IconButtonV2";
import AvatarRoleNameGroup from "./Group.AvatarRoleName";
import { PreviewItem } from "../pages/application/offer/PreviewOffer";
import OfferPresentation from "./Presentation.Offer";

interface ICheckBoxV2 {
  value: string | number;
  selected?: boolean;
  disabled?: boolean;
  onClick?: Function;
  children?: ReactChildren;
}

interface PropsType {
  setOfferModal: (enabled: boolean) => void;
  offer: IOfferResponse;
}

const ViewOffer = ({ setOfferModal, offer }: PropsType) => {
  return (
    <div className="absolute top-[150px] left-1/2 -translate-x-1/2 z-10 pb-20">
      <div className="flex flex-col items-center bg-white w-[720px] rounded-lg px-16">
        <div className="flex flex-col justify-center items-center gap-y-5">
          <IconButtonV2
            onClick={() => setOfferModal(false)}
            iconType="CLOSE"
            className="p-0 absolute right-6 top-6"
          />
          <h2 className="font-poppins font-extrabold text-[20px] mt-10 text-center">Offer</h2>
        </div>
        <div className="mt-7 w-full">
          <AvatarRoleNameGroup user={offer?.User} role={offer?.FreelancerProfile?.role} />
        </div>

        <OfferPresentation offer={offer} />
      </div>
    </div>
  );
};

export default ViewOffer;
