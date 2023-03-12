import * as Sentry from "@sentry/react";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";
import { setAccountTypeToCreate } from "redux/slices/authentication";

import Heading from "components/Heading/HeadingV2";

import { SignupAccount } from "@types";
import { AccountType } from "./types";

import ResponsiveSelectImage from "assets/welcome/account-select-mobile-graphic.png";
import "./styles.scss";
import AccountSelectButtons from "./AccountSelectButtons";
import ReferralAlert from "../component/ReferralAlert";

interface Props {
  onSelect: (type?: AccountType) => unknown;
}

function AccountSelect({ onSelect }: Props) {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<AccountType>();
  const handleContinue = () => {
    onSelect(type);
  };

  const setTypeClient = () => {
    setType("company");
    dispatch(setAccountTypeToCreate(SignupAccount.company));
  };

  const setTypeTalent = () => {
    setType("talent");
    dispatch(setAccountTypeToCreate(SignupAccount.talent));
  };

  return (
    <>
      <ReferralAlert />
      <div className="relative hidden md:flex flex-col max-w-screen min-h-screen overflow-hidden md:gap-0 md:flex-row font-inter">
        <div className="h-screen w-full lg:w-[405px] fixed lg:relative shrink-0">
          <img
            src={"/app/common/sidebar-sky.png"}
            alt="Outdefine"
            className="-ml-[10px] w-full h-full object-cover"
          />
          <img
            src="/app/common/spaceboy/flag.png"
            alt="spaceboy"
            className="absolute w-[160px] h-[160px] bottom-[510px] right-[122px] z-10"
          />
        </div>
        <img
          src="/app/common/earth.png"
          width={520}
          alt="spaceboy"
          className="absolute bottom-0 left-0 z-1"
        />
        <div className="w-screen md:w-full flex min-h-screen justify-center items-center py-10">
          <div className="relative md:flex flex-col text-black">
            <Heading
              className="text-white lg:text-black font-extrabold pt-0 pb-4 text-center md:pt-6"
              variant="h6"
            >
              Let's get started!
            </Heading>

            <div className="flex flex-col">
              <p className="text-white lg:text-black mt-4 mb-8 font-bold text-center sm:mb-16 text-p2 font-poppins">
                Select one and press continue
              </p>
              <AccountSelectButtons
                type={type}
                onClientSelect={setTypeClient}
                onTalentSelect={setTypeTalent}
                onContinue={handleContinue}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="flex flex-col min-h-screen px-0 md:hidden">
        <div className="relative flex flex-col items-center mobile-header-background h-[350px]">
          <img src={ResponsiveSelectImage} alt="space-boy" width={350} className="z-10" />
          <div className="w-full h-[150px] bg-white block absolute bottom-[-1px] rounded-t-lg"></div>
        </div>
        <div className="text-center text-black  mb-[17px] z-10">
          <Heading className="font-extrabold text-[25px] text-center " variant="h5">
            Let's get started!
          </Heading>
          <p className="text-center text-[20px] font-bold font-poppins">
            Select one and press continue
          </p>
        </div>
        <div className="flex flex-col items-center px-[4vw] text-center text-black mb-[5vh] h-[50%]">
          <AccountSelectButtons
            type={type}
            onClientSelect={setTypeClient}
            onTalentSelect={setTypeTalent}
            onContinue={handleContinue}
          />
        </div>
      </div>
    </>
  );
}

export default AccountSelect;
