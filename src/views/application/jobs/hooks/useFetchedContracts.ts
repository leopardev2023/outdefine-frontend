import { RootState } from 'app/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import jobAPI from 'network/job';

export default function useFetchedContracts() {
  const freelancer_id = useSelector(
    (root: RootState) => root.authentication.userId
  );

  const [activeContracts, setActiveContracts] = useState<any[]>([]);
  const [inactiveContracts, setInactiveContracts] = useState<any[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);

  const fetchContractsByFreelancerID = async () => {
    try {
      const response = await jobAPI.getContractsByFreelancerID(
        Number(freelancer_id)
      );
      setActiveContracts(response.actives);
      setInactiveContracts(response.inactives);
    } catch (e) {}
  };

  useEffect(() => {
    fetchContractsByFreelancerID();
    return () => {};
  }, []);

  const refetchHandler = () => {
    fetchContractsByFreelancerID();
  };

  return { fetching, activeContracts, inactiveContracts, refetchHandler };
}
