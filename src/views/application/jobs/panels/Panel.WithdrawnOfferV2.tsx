import OfferCard from "../componentsV2/Card.Offer";
import { EmptyOfferTip } from "./Panel.NewOfferV2";

import useOffersForTalent from "../hooks/useOffersForTalent";

export default function WithdrawnOfferV2() {
  const { offers } = useOffersForTalent();
  const withdrawnOffers = offers.filter((offer) => offer.offer_status === "WITHDRAWN");

  return (
    <div className="mt-8">
      {withdrawnOffers.length === 0 && <EmptyOfferTip />}

      {/* Offers */}
      {withdrawnOffers.length > 0 && (
        <div className="flex flex-col gap-5 mt-[70px]">
          {withdrawnOffers.map((offer) => (
            <OfferCard {...offer} key={offer.id} />
          ))}
        </div>
      )}
    </div>
  );
}
