import { useState, useEffect } from "react";
import * as Sentry from "@sentry/react";

import { useAppSelector } from "redux/hooks/redux-hooks";
import applicationApi from "network/application";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import {
  expData,
  locationData,
  payFreqData,
  termData,
  termThData,
  timezoneData,
} from "../pages/application/offer/dataTypes";
import formatDate from "helpers/date";

const statusData = [
  { value: "Active", id: 1 },
  { value: "Inactive", id: 2 },
  // { value: "Terminated", id: 3 },
];

interface IContractV2 {
  experience_level: string;
  term: string;
  contract_start: string;
  contract_end: string;
  pay_frequency: string;
  location: string;
  timezone: string;
  is_ongoing: boolean;
  contract_status: string;
  term_of_hours: number;
  term_of_hours_duration: string;
  hourly_rate: number;
  duties: string;
  inactivated_date: string;
}

export default function useUpdateContract(setUpdateModal, selectedItem, onRefetch) {
  const [contract, setContract] = useState<IContractV2>({
    contract_end: new Date().toLocaleDateString(),
    contract_start: new Date().toLocaleDateString(),
    contract_status: "",
    experience_level: "",
    hourly_rate: 0,
    is_ongoing: false,
    location: "",
    pay_frequency: "",
    term: "",
    term_of_hours: 0,
    timezone: "",
    term_of_hours_duration: "",
    duties: "",
    inactivated_date: formatDate.yyyy_mm_dd(new Date().toLocaleDateString()),
  });

  const skills = useAppSelector((state) => state.prototype.skills);

  const companyId = useAppSelector((state) => state.companyprofile.id);
  const clientId = useAppSelector((state) => state.companyprofile.client_id);

  const [pending, setPending] = useState<boolean>(false);

  const onChangeHandler = (name: string, value: string | number | boolean) => {
    if (name === "contract_start") {
      const limit = new Date(String(value));
      limit.setMonth(limit.getMonth() + 3);
      if (
        limit.getTime() > new Date(contract.contract_end).getTime() ||
        contract.contract_end === ""
      ) {
        setContract({
          ...contract,
          contract_start: String(value),
          contract_end:
            limit.getTime() > new Date(contract.contract_end).getTime() ||
            contract.contract_end === ""
              ? formatDate.yyyy_mm_dd(limit.toLocaleDateString())
              : formatDate.yyyy_mm_dd(contract.contract_end),
        });
      }
      return;
    } else if (name === "contract_end") {
      const limit = new Date(String(value));
      limit.setMonth(limit.getMonth() - 3);
      if (limit.getTime() < new Date(contract.contract_start).getTime()) {
        // toast.info("Contract length should be at least 3 months");
        return;
      } else {
        setContract({
          ...contract,
          contract_end: String(value),
        });
      }
      return;
    }

    setContract({ ...contract, [name]: value });
  };

  const init = () => {
    setContract({
      experience_level:
        expData.find(
          (item) => item.value.toLowerCase() === selectedItem?.experience_level?.toLowerCase(),
        )?.value ?? "",
      hourly_rate: selectedItem?.hourly_rate ?? 0,
      pay_frequency:
        payFreqData.find(
          (item) => item.value.toLowerCase() === selectedItem?.pay_frequency?.toLowerCase(),
        )?.value ?? "",
      location:
        locationData.find(
          (item) => item.value.toLowerCase() === selectedItem?.location.toLowerCase(),
        )?.value ?? "",
      timezone:
        timezoneData.find(
          (item) => item.value.toLowerCase() === selectedItem?.timezone.toLowerCase(),
        )?.value ?? "",
      contract_start: formatDate.yyyy_mm_dd(selectedItem?.contract_start ?? new Date()),
      contract_end: formatDate.yyyy_mm_dd(selectedItem?.contract_end ?? new Date()),
      contract_status:
        statusData.find(
          (item) => item.value.toLowerCase() === selectedItem?.contract_status.toLowerCase(),
        )?.value ?? "",
      term_of_hours: selectedItem?.term_of_hours,
      is_ongoing: selectedItem?.is_ongoing ?? false,
      term:
        termData.find((item) => item.value.toLowerCase() === selectedItem?.term.toLowerCase())
          ?.value ?? "",
      term_of_hours_duration: selectedItem?.term_of_hours_duration,
      duties: selectedItem?.duties ?? "",
      inactivated_date: selectedItem?.inactivated_date ?? "",
    });
  };

  useEffect(() => {
    init();
  }, [selectedItem]);

  const update = async () => {
    setPending(true);
    try {
      const updateInfo = {
        ...contract,
        id: selectedItem?.id,
        company_id: companyId,
        freelancer_id: selectedItem?.FreelancerProfile?.freelancer_id,
        client_id: clientId,
        term: contract.term,
        contract_status: contract.contract_status.toUpperCase(),
        timezone: contract.timezone.toUpperCase(),
        location: contract.location.toUpperCase(),
        pay_frequency: contract.pay_frequency,
      };

      // setUpdateModal(false);

      const result = await applicationApi.updateContract(updateInfo);
      if (result?.success) {
        toast.custom(<Toast type="success" message="Success" />);
        onRefetch();
      }

      setUpdateModal(false);
    } catch (err: any) {
      toast.custom(<Toast type="error" message={JSON.stringify(err)} />);
      Sentry.captureException(err);
    }
    setPending(false);
  };

  return {
    // types
    pending,
    expData,
    locationData,
    payFreqData,
    termData,
    termThData,
    timezoneData,
    statusData,
    skills,
    //
    contract,

    update,
    onChangeHandler,
  };
}
