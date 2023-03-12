import React from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import Layout from "./Layout";
import ExistingCompanyComponent from "./ExistingCompany";
import MyProfileComponent from "./MyProfile";
import { goBackward, goForward } from "redux/slices/clientOnboard";
import ReferralAlert from "views/authentication/component/ReferralAlert";

const ExistingCompany = ({ cancelSelection, user, companyLists }) => {
  const dispatch = useAppDispatch();
  const step = useAppSelector((root) => root.clientOnboard.step);
  const [selectedCompany, setSelectedCompany] = React.useState({ name: "" });

  // const step = 1;
  const onboardTitles = ["Great news", "My profile"];
  const onboardSpaceboys = ["playing", "playing"];

  const goBack = () => {
    dispatch(goBackward());
  };

  const joinCompany = (item) => {
    dispatch(goForward());
    setSelectedCompany(item);
  };

  return (
    <Layout
      title={onboardTitles[step]}
      spaceBoy={onboardSpaceboys[step]}
      spaceBoyClassName={"md:ml-[10vw] md:mt-[-50px] md:w-[12vw]"}
    >
      <ReferralAlert />
      {step === 0 && (
        <ExistingCompanyComponent
          companyLists={companyLists}
          cancelSelection={cancelSelection}
          joinCompany={joinCompany}
        />
      )}
      {step === 1 && (
        <MyProfileComponent user={user} goBack={goBack} selectedCompany={selectedCompany} />
      )}
    </Layout>
  );
};

export default ExistingCompany;
