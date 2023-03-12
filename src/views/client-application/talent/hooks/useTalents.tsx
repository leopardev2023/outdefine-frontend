import { useEffect, useState } from "react";
import applicationApi from "network/application";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

export default function useTalents() {
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<IInviteTalentModal>({
    calendarLink: "",
    intervewDescription: "Hey, we are excited for you to interview for this job.",
    talentToInvite: null,
    visibility: false,
    selectedJobID: undefined,
  });
  const [allTalents, setAllTalents] = useState<Array<any>>([]);
  const [talentList, setTalentList] = useState<Array<any>>([]);
  const searchInfo = useSelector((root: RootState) => root.talentSearchQuery);

  function searchCriteriaIsAbsent(searchInfo: any) {
    return Object.values(searchInfo).every((value) => {
      if (!value || value === "") {
        return true;
      }
      return false;
    });
  }

  const roleSearchCriteriaMatch = (item: any, value: string) => {
    return (
      item?.Role?.name?.toLowerCase().includes(value?.toLowerCase()) ||
      item?.skills?.some((item) => value?.toLowerCase().includes(item?.name?.toLowerCase())) ||
      item?.skills?.some((item) => item?.name?.toLowerCase().includes(value?.toLowerCase()))
    );
  };

  const locationSearchCriteriaMatch = (item: any, value: any) => {
    if (value?.length === 0) return true;

    try {
      const talentPreferences: any = JSON.parse(item?.roles_open_to);
      return talentPreferences?.some((item) =>
        value?.join(",")?.toLowerCase().includes(item?.value?.toLowerCase()),
      );
    } catch (e) {
      return false;
    }
  };

  const termSearchCriteriaMatch = (item: any, value: any) => {
    if (value?.length === 0) return true;

    try {
      const talentPreferences: any = JSON.parse(item?.terms_open_to);
      return talentPreferences?.some((item) =>
        value?.join(",")?.toLowerCase().includes(item?.value?.toLowerCase()),
      );
    } catch (e) {
      return false;
    }
  };

  const securityLevelCriteriaMatch = (item: any, value: any) => {
    try {
      if (value?.length === 0) return true;
      return value?.join(",").toLowerCase().includes(item?.level_of_experience?.toLowerCase());
    } catch (e) {
      return false;
    }
  };

  const talentLocationCriteriaMatch = (item: any, value: string) => {
    return item?.city?.toLowerCase().includes(value?.toLowerCase());
  };

  const nameCriteriaMatch = (item: any, value: string) => {
    const fullName = `${item?.User.first_name} ${item?.User?.last_name}`;
    return fullName.toLowerCase().includes(value?.toLowerCase());
  };

  function processSearchCriteria(talentList: any, searchInfo: any) {
    return (
      talentList?.length > 0 &&
      talentList.filter((item) => {
        for (const key in searchInfo) {
          if (key === "text" && searchInfo.text) {
            if (
              !nameCriteriaMatch(item, searchInfo.text) &&
              !roleSearchCriteriaMatch(item, searchInfo.text) &&
              !locationSearchCriteriaMatch(item, searchInfo[key]) &&
              !termSearchCriteriaMatch(item, searchInfo[key]) &&
              !securityLevelCriteriaMatch(item, searchInfo[key]) &&
              !talentLocationCriteriaMatch(item, searchInfo[key])
            ) {
              return false;
            }
          }

          if (key === "min_hourly" && searchInfo[key]) {
            if ((item.markup_hourly_rate || item.hourly_rate) < searchInfo.min_hourly) {
              return false;
            }
          }

          if (key === "max_hourly" && searchInfo[key]) {
            if ((item.markup_hourly_rate || item.hourly_rate) > searchInfo.max_hourly) {
              return false;
            }
          }

          if (key === "location" && searchInfo[key]) {
            if (!locationSearchCriteriaMatch(item, searchInfo[key])) {
              return false;
            }
          }

          if (key === "term" && searchInfo[key]) {
            if (!termSearchCriteriaMatch(item, searchInfo[key])) {
              return false;
            }
          }

          if (key === "seniority_level" && searchInfo[key]) {
            if (!securityLevelCriteriaMatch(item, searchInfo[key])) {
              return false;
            }
          }

          if (key === "talent_location" && searchInfo.talent_location) {
            if (!talentLocationCriteriaMatch(item, searchInfo[key])) {
              return false;
            }
          }
        }

        return true;
      })
    );
  }

  useEffect(() => {
    try {
      setLoading(true);
      Promise.all([applicationApi.getTalentList({})])
        .then(([talentList]) => {
          setAllTalents(talentList);
          setTalentList(talentList);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err: any) {
      //Sentry.captureException(err);
      setLoading(false);
      toast.custom(<Toast type="error" message={JSON.stringify(err)} />);
    }
  }, []);

  useEffect(() => {
    if (searchInfo === undefined) return;
    const filteredTalentList = processSearchCriteria(allTalents, searchInfo);

    const isSearchFalsy = searchCriteriaIsAbsent(searchInfo);
    if (isSearchFalsy) {
      setTalentList(allTalents);
    } else {
      setTalentList(filteredTalentList);
    }
  }, [searchInfo]);

  return { loading, modal, talentList, setModal };
}
