import Button from "components/Button/ButtonV2";
import IconV2 from "components/V2/Icons/IconV2";
import { NavLink } from "react-router-dom";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import OfferCard from "../componentsV2/Card.Offer";

import useOffersForTalent from "../hooks/useOffersForTalent";

export default function NewOfferPanelV2() {
  const { offers } = useOffersForTalent();

  const newOffers = offers.filter((offer) => offer.offer_status === "OFFERED");

  return (
    <div className="mt-8">
      {newOffers.length === 0 && <EmptyOfferTip />}

      {/* Offers */}
      {newOffers.length > 0 && (
        <>
          <CongratsOfferTip />
          <div className="mt-14 flex flex-col gap-5">
            {newOffers.map((offer) => (
              <OfferCard {...offer} key={offer.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function EmptyOfferTip() {
  return (
    <EmptyPanelV2
      description="Start applying to jobs!"
      title="No current offers"
      image="/common/spaceboy/astronaut-celebrating.png"
      className="mt-[90px] pt-16 pb-[60px]"
    >
      <NavLink to="/jobs" className="block mt-6">
        <Button>Find jobs</Button>
      </NavLink>
    </EmptyPanelV2>
  );
}

function CongratsOfferTip() {
  return (
    <div className="flex w-full bg-orange/75 rounded-lg p-2 gap-5">
      <div className="relative">
        <img src="/common/universe-background.png" alt="universal-background" />
        <img
          src="/common/spaceboy/astronaut-riding-on-rocket.png"
          alt="astornaut-riding-on-rocket"
          className="absolute -top-2 left-6"
        />
      </div>

      <div className="pt-2">
        <h4 className="font-semibold text-base">Congrats on the offer</h4>
        <p className="mt-5 font-inter font-semibold text-xs">
          Earn <IconV2 iconType="TOKEN" iconClassName="w-4 h-4 inline" /> 250 tokens for accepting
          the offer and starting work.
        </p>
      </div>
    </div>
  );
}
