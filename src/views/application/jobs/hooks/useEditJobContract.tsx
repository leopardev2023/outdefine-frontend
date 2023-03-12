import { useState } from "react";
import jobAPI from "network/job";
import { IContractCard } from "../componentsV2/Card.ContractV2";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

export default function useEditJobContract(props: IContractCard) {
  const [visibility, setVisibility] = useState<boolean>(false);

  const [inactiveDate, setInactiveDate] = useState<string>(props.inactivated_date);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const [pending, setPending] = useState<boolean>(false);

  const jobStatusEditHandler = async () => {
    setPending(true);
    try {
      const response = await jobAPI.updateJobContract({
        ...props,
        contract_status: "INACTIVE",
        inactivated_date: inactiveDate,
      });

      console.log(response);
      if (response?.success) {
        toast.custom(<Toast type="success" message="Successfully updated contract status" />);
        props?.onRefetch && props.onRefetch();
      }
    } catch (e) {
      toast.custom(<Toast type="error" message="There was an error while updating contract status" />);
    }
    setPending(false);
    setVisibility(false);
  };

  return {
    pending,
    confirmed,
    visibility,
    inactiveDate,
    setVisibility,
    setInactiveDate,
    setConfirmed,
    jobStatusEditHandler,
  };
}
