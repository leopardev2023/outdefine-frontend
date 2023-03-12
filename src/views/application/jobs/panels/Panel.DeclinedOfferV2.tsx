import OfferCard from "../componentsV2/Card.Offer";
import useOffersForTalent from "../hooks/useOffersForTalent";
import { EmptyOfferTip } from "./Panel.NewOfferV2";

export default function DeclinedOfferV2() {
  const { offers } = useOffersForTalent();

  const declinedOffers = offers.filter((offer) => offer.offer_status === "DECLINED");

  return (
    <div className="mt-8">
      {declinedOffers.length === 0 && <EmptyOfferTip />}

      {/* Offers */}
      {declinedOffers.length > 0 && (
        <div className="flex flex-col gap-5 mt-[70px]">
          {declinedOffers.map((offer) => (
            <OfferCard {...offer} key={offer.id} />
          ))}
        </div>
      )}
    </div>
  );
}
