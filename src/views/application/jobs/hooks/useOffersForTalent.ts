import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import jobAPI from "network/job";

export default function useOffersForTalent() {
  const freelancer_id = useSelector((root: RootState) => root.authentication.userId);

  const [offers, setOffers] = useState<IOfferResponse[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  const fetchOffers = async () => {
    try {
      setFetching(true);
      const response = await jobAPI.getOffersByTalentID(Number(freelancer_id));
      if (response.success) {
        setOffers(response.offers);
        setFetching(false);
      } else {
        fetchOffers();
      }
    } catch (e) {
      fetchOffers();
    }
  };

  useEffect(() => {
    fetchOffers();
    return () => {};
  }, []);

  return { fetching, offers };
}
