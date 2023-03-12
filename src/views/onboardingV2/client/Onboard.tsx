import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import OnboardAPI from "network/onboarding";

import AboutCompany from "./AboutCompany";
import AboutMyself from "./AboutMyself";
import CompanyBrand from "./CompanyBrand";
import MasterService from "./MasterService";

import { goBackward, goForward } from "redux/slices/clientOnboard";
import { OnboardComponentProps, OnboardFeedType } from "./Onboard.types";
import OnboardTemplate from "../components/OnboardTemplate";
import ExistingCompanyView from "./ExistingCompany";
import Icon from "components/Icon";
import { ColorRing } from "react-loader-spinner";
import Layout from "./ExistingCompany/Layout";

const onboardComponents: React.FC<OnboardComponentProps>[] = [
  AboutCompany, // step 1
  AboutMyself, // step 2
  MasterService, // step 3
  CompanyBrand, // step 4
];

const onboardTitles = [
  "Tell us about your company",
  "Tell us about yourself!",
  "Review Master Service Agreement",
  "Last step. Add your company logo and share your socials!",
];

const boysStyles = [
  "md:ml-[15vw] md:w-[7vw]",
  "md:ml-[8vw] md:mt-[-35px] md:w-[13vw]",
  "md:ml-[10vw] md:mt-[-30px] md:w-[12vw]",
  "md:ml-[10vw] md:mt-[-30px] md:w-[13vw]",
];

const onboardSpaceboys = ["mooner", "guitar", "playing", "rocketer"];

const Onboard = () => {
  const dispatch = useAppDispatch();
  const step = useAppSelector((root) => root.clientOnboard.step);
  const [initialOnboardData, setInitialOnboardData] = useState<OnboardFeedType>({
    user: undefined,
    msa: undefined,
    companyLists: undefined,
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const goBack = () => {
    dispatch(goBackward());
  };
  const goNext = () => {
    dispatch(goForward());
  };

  const CurOnboardStep: React.FC<OnboardComponentProps> = useMemo(() => {
    const Comp = onboardComponents[step];
    return () => <Comp goBack={goBack} goNext={goNext} feed={initialOnboardData} />;
  }, [step]);

  const fetchInitialOnboardData = async () => {
    setLoading(true);
    const data = await Promise.all([
      OnboardAPI.getUserDetail(),
      OnboardAPI.getActiveMSA(),
      OnboardAPI.getCompanyListsFromEmail(),
    ])
      .then(([userResponse, msaResponse, companyListResponse]) => {
        setLoading(false);
        return {
          user: userResponse.data,
          msa: msaResponse,
          companyLists: companyListResponse.data,
        };
      })
      .catch((err) => {
        setLoading(false);
        console.log("Fetch initial Onboard data failed with: ", err);
      });

    if (data?.companyLists === undefined || data?.companyLists?.length === 0) {
      setToSelectExistingCompany(false);
    } else {
      setToSelectExistingCompany(true);
    }

    setInitialOnboardData(data as OnboardFeedType);
  };
  useEffect(() => {
    fetchInitialOnboardData();
  }, []);

  const Spinner = () => {
    return (
      <div className="absolute z-10 pt-28 flex w-full justify-center">
        <ColorRing
          visible={true}
          height="120"
          width="120"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#FF813460", "#FF575760", "#5F5FFF60", "#2F345460", "transparent"]}
        />
      </div>
    );
  };

  const [toSelectExistingCompany, setToSelectExistingCompany] = useState<boolean>(false);

  return (
    <>
      {isLoading ? (
        <Layout title={""} spaceBoy={onboardSpaceboys[step]} spaceBoyClassName={boysStyles[step]}>
          <Spinner />
        </Layout>
      ) : toSelectExistingCompany ? (
        <ExistingCompanyView
          companyLists={initialOnboardData.companyLists}
          user={initialOnboardData.user}
          cancelSelection={() => {
            setToSelectExistingCompany(false);
          }}
        />
      ) : (
        <OnboardTemplate
          title={onboardTitles[step]}
          spaceBoy={onboardSpaceboys[step]}
          CurrentStepComp={CurOnboardStep}
          spaceBoyClassName={boysStyles[step]}
          step={step}
        />
      )}
    </>
  );
};

export default Onboard;
