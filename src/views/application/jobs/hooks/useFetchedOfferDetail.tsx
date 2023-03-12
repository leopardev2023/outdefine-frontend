import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { RootState } from "app/store";

import useFetchedContracts from "./useFetchedContracts";
import useOffersForTalent from "./useOffersForTalent";
import jobAPI from "network/job";
import applicationApi from "network/application";
import { useAppSelector } from "redux/hooks/redux-hooks";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

export default function useFetchedOfferDetail() {
  const navigate = useNavigate();
  const { offerID } = useParams();

  const freelancer_id = useSelector((root: RootState) => root.authentication.userId);

  const { activeContracts, inactiveContracts } = useFetchedContracts();
  const skills = useSelector((root: RootState) => root.prototype.skills);
  const [pending, setPending] = useState<boolean>(false);
  const [actionType, setActionType] = useState<"ACCEPT" | "DECLINE" | undefined>(undefined);
  // success modal visibility
  const [visibility, setVisibility] = useState<boolean>(false);

  const { offers, fetching } = useOffersForTalent();

  const offer = offers.find((offer) => offer.id === Number(offerID));

  const addressOffer = async (method: "ACCEPTED" | "DECLINED") => {
    if (offer === undefined) return;

    setPending(true);
    setActionType(method === "ACCEPTED" ? "ACCEPT" : "DECLINE");

    try {
      const successMsg: Record<string, string> = {
        ACCEPTED: "Successfully accepted",
        DECLINED: "Declined offer",
      };

      const response = await jobAPI.addressOffer(
        offer.id,
        Number(freelancer_id),
        Number(offer.company_id),
        method,
      );

      if (response.success || true) {
        if (method === "DECLINED") toast.custom(<Toast type="success" message={successMsg[method]} />);
        else setVisibility(true);
      }
    } catch (e) {
      const errorMsg: Record<string, string> = {
        ACCEPTED: "There was an error while accepting this offer",
        DECLINED: "There was an error while declining this offer",
      };
      toast.custom(<Toast type="error" message={errorMsg[method]} />);
    }

    setPending(false);
    setActionType(undefined);
    method === "DECLINED" && navigate("/jobs/offer");
  };

  // const isAcceptedOffer = activeContracts.filter((contract)=>contract.)
  return {
    pending,
    actionType,
    skills,
    fetching,
    offer,
    visibility,
    setVisibility,
    addressOffer,
  };
}
