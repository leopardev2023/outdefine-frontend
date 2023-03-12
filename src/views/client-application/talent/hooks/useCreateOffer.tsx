import { RootState } from "app/store";
import formatDate from "helpers/date";
import object from "helpers/object";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import { updatedCreatedOffer } from "redux/slices/application";
import {
  expData,
  locationData,
  payFreqData,
  termData,
  timezoneData,
} from "../pages/application/offer/dataTypes";

export default function useCreateOffer(
  freelancerId,
  app,
  setExtendOfferModal,
  setOfferPreviewModal,
) {
  const dispatch = useAppDispatch();

  const createdOffer = useAppSelector((root: RootState) => root.application.createdOffer);

  const companyId = useAppSelector((state) => state.companyprofile.id);
  const clientId = useAppSelector((state) => state.companyprofile.client_id);
  const skills = useAppSelector((state) => state.prototype.skills);

  const job_id = app?.job_id;

  const [options, setOptions] = useState<boolean>(false);
  const [offerInfo, setOfferInfo] = useState<any>();

  const offer = useSelector((root: RootState) => root.application.createdOffer);

  const onCheckHandler = () => {
    setOptions(!options);
    setOfferInfo({
      ...offerInfo,
      is_ongoing: !options,
    });
  };

  const successValidator = (arg: any) => {
    if (arg === "" || arg === undefined) return undefined;
    return true;
  };

  const skillChangeHandler = (name: "primary_skills" | "secondary_skills", value: number): void => {
    var skills;
    if (name === "primary_skills") {
      skills = object.safeJsonArray(offer.primary_skills).filter((elem) => elem !== value);
    } else if (name === "secondary_skills") {
      skills = object.safeJsonArray(offer.secondary_skills).filter((elem) => elem !== value);
    }

    if (name === "primary_skills") {
      dispatch(
        updatedCreatedOffer({
          ...offer,
          primary_skills: JSON.stringify(skills ? [...skills, value] : [value]),
        }),
      );
      return;
    }
    dispatch(
      updatedCreatedOffer({
        ...offer,
        secondary_skills: JSON.stringify(skills ? [...skills, value] : [value]),
      }),
    );
  };

  const createOffer = async () => {
    setExtendOfferModal(false);
    setOfferPreviewModal(true);
  };

  const init = () => {
    // redux

    dispatch(
      updatedCreatedOffer({
        ...offerInfo,
        job_id,
        company_id: companyId,
        freelancer_id: freelancerId,
        primary_skills: offer.primary_skills,
        secondary_skills: offer.secondary_skills,
        contract_start: offer.contract_start,
        contract_end: offer.contract_end,
        response_due: offer.response_due,
        is_ongoing: offer.is_ongoing,
        welcome_note: offer.welcome_note,
        term: termData[0].value,
        experience_level: expData.find(
          (item) =>
            item.value.toLowerCase() ===
            (createdOffer?.experience_level?.toLowerCase() !== ""
              ? createdOffer?.experience_level?.toLowerCase()
              : app?.PostedJobs?.experience_level?.toLowerCase()),
        )?.value,
        term_of_hours: 40,
        term_of_hours_duration: "WEEKLY",
        pay_frequency: offer?.pay_frequency !== "" ? offer?.pay_frequency : payFreqData[0].value,
        location: locationData.find(
          (item) =>
            item.value.toLowerCase() ===
            (createdOffer?.location?.toLowerCase() !== ""
              ? createdOffer?.location?.toLowerCase()
              : app?.PostedJobs?.location.toLowerCase()),
        )?.value,
        timezone: timezoneData.find(
          (item) =>
            item.value.toLowerCase() ===
            (createdOffer?.timezone?.toLowerCase()
              ? createdOffer?.timezone?.toLowerCase()
              : app?.PostedJobs?.timezone.toLowerCase()),
        )?.value,
        client_id: clientId,
        hourly_rate:
          offer?.hourly_rate !== "" ? offer.hourly_rate : app?.FreelancerProfile?.hourly_rate,
        position: app?.PostedJobs?.job_title ?? "",
        application_id: app?.id,
      }),
    );
  };

  useEffect(() => {
    init();
  }, [app]);

  const offerChangeHandler = (keyName: keyof IOffer, value: boolean | string | number) => {
    if (keyName === "contract_start") {
      const limit = new Date(String(value));
      limit.setMonth(limit.getMonth() + 3);
      dispatch(
        updatedCreatedOffer({
          ...offer,
          contract_start: String(value),
          contract_end:
            limit.getTime() > new Date(offer.contract_end).getTime() || offer.contract_end === ""
              ? formatDate.yyyy_mm_dd(limit.toLocaleDateString())
              : formatDate.yyyy_mm_dd(offer.contract_end),
        }),
      );

      return;
    } else if (keyName === "contract_end") {
      const limit = new Date(String(value));
      limit.setMonth(limit.getMonth() - 3);
      if (limit.getTime() < new Date(offer.contract_start).getTime()) {
        // toast.info("Contract length should be at least 3 months");
        return;
      } else {
        dispatch(
          updatedCreatedOffer({
            ...offer,
            contract_end: String(value),
          }),
        );
      }
      return;
    }

    dispatch(updatedCreatedOffer({ ...offer, [keyName]: value }));
  };

  useEffect(() => {}, [offer]);

  let enabled =
    !!offer.welcome_note &&
    !!offer.hourly_rate &&
    !!offer.term_of_hours &&
    !!offer.contract_start &&
    !!offer.response_due;

  if (!offer.is_ongoing) {
    enabled = enabled && !!offer.contract_end;
  }

  return {
    offer,
    disabled: !enabled,
    skills,
    options,
    offerChangeHandler,
    onCheckHandler,
    successValidator,
    createOffer,
    skillChangeHandler,
  };
}
