import OfferCard from "../componentsV2/Card.Offer";
import { EmptyOfferTip } from "./Panel.NewOfferV2";

import useOffersForTalent from "../hooks/useOffersForTalent";

export default function AcceptedOfferPanelV2() {
  const { offers } = useOffersForTalent();
  const acceptedOffers = offers.filter((offer) => offer.offer_status === "ACCEPTED");

  return (
    <div className="mt-8">
      {acceptedOffers.length === 0 && <EmptyOfferTip />}

      {/* Offers */}
      {acceptedOffers.length > 0 && (
        <div className="flex flex-col gap-5 mt-[70px]">
          {acceptedOffers.map((offer) => (
            <OfferCard {...offer} key={offer.id} />
          ))}
        </div>
      )}
    </div>
  );
}
