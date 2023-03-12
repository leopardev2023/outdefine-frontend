import { RootState } from "app/store";
import IconV2 from "components/V2/Icons";
import { isProduction } from "helpers/env";
import object from "helpers/object";
import { ReactNode } from "react";
import { useSelector } from "react-redux";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

export default function ReferralSocialShare() {
  const { firstName, lastName, createdAt } = useSelector((root: RootState) => root.authentication);

  const referralCode = `https://${
    isProduction ? "outdefine.com" : "outdefine.vercel.app"
  }/r/${object.crateReferralFromUserData({
    createdAt: createdAt,
    first_name: firstName,
    last_name: lastName,
  })}`;

  return (
    <>
      <p className=" text-xs mb-4">Use your refer link to invite friends</p>
      <div className="h-10 w-full rounded-lg gradient-box p-[1px] relative">
        <div className="flex items-center pl-3 pr-8 font-semibold text-xs w-full h-full bg-white rounded-[6px]">
          <span className="truncate">{referralCode}</span>
        </div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(referralCode);
            toast.custom(<Toast type="success" message="Referral link copied" />);
          }}
          className="absolute top-1/2 -translate-y-1/2 right-2 opacity-75 hover:opacity-100 transition-opacity duration-150 group"
        >
          <div className="relative">
            <CopySVG />
            <span className="pointer-events-none hidden group-hover:block absolute left-1/2 min-w-[160px] -translate-x-1/2 px-3 py-[6px] bg-theme rounded-lg text-white font-inter text-sm">
              Copy existing link
            </span>
          </div>
        </button>
      </div>
      <div className="flex mt-[10px] gap-x-[10px]">
        <a
          className="w-10 h-10 rounded-lg border-[1px] border-darker-gray
         flex justify-center items-center"
          href={`mailto:test@example.com?subject=Referral&body=Join%20me%20at%20Outdefine,%20a%20web3%20talent%20community%20to%20find%20global%20tech%20jobs%20and%20meet%20with%20like%20minded%20peers.%20Earn%20tokens,%20NFTs%20and%20rewards%20for%20free.%20${referralCode}`}
        >
          <IconV2 iconType={"MESSAGE"} />
        </a>
        <a
          className="w-10 h-10 rounded-lg border-[1px] border-darker-gray
         flex justify-center items-center "
          href={`sms:?&body=Join%20me%20at%20Outdefine,%20a%20web3%20talent%20community%20to%20find%20global%20tech%20jobs%20and%20meet%20with%20like%20minded%20peers.%20Earn%20tokens,%20NFTs%20and%20rewards%20for%20free.%20${referralCode}`}
        >
          <IconV2 iconType={"MESSENGER"} />
        </a>
        <SocialButtonWrapper
          onclick={() => {
            window.open(`https://www.linkedin.com/shareArticle/?mini=true&url=${referralCode}`);
          }}
        >
          <IconV2 iconType={"LINKEDIN"} />
        </SocialButtonWrapper>
        <SocialButtonWrapper
          onclick={() => {
            window.open(
              `http://twitter.com/intent/tweet?text=Join%20me%20at%20Outdefine,%20a%20web3%20talent%20community%20to%20find%20global%20tech%20jobs%20and%20meet%20with%20like%20minded%20peers.%20Earn%20tokens,%20NFTs%20and%20rewards%20for%20free.%20&url=${referralCode}`,
            );
          }}
        >
          <IconV2 iconType={"TWITTER"} />
        </SocialButtonWrapper>
        {/* <SocialButtonWrapper
          onclick={() => {
            window.open(`https://www.instagram.com/share?url=${referralCode}`);
          }}
        >
          <IconV2 iconType={"INSTAGRAM"} />
        </SocialButtonWrapper> */}
      </div>
    </>
  );
}

function CopySVG() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM8.18 16.77C8.16 16.77 8.13 16.77 8.11 16.77C7.14 16.68 6.23 16.23 5.55 15.51C3.95 13.83 3.95 11.1 5.55 9.42L7.74 7.12C8.52 6.3 9.57 5.84 10.69 5.84C11.81 5.84 12.86 6.29 13.64 7.12C15.24 8.8 15.24 11.53 13.64 13.21L12.55 14.36C12.26 14.66 11.79 14.67 11.49 14.39C11.19 14.1 11.18 13.63 11.46 13.33L12.55 12.18C13.61 11.07 13.61 9.26 12.55 8.16C11.56 7.12 9.82 7.12 8.82 8.16L6.63 10.46C5.57 11.57 5.57 13.38 6.63 14.48C7.06 14.94 7.64 15.22 8.25 15.28C8.66 15.32 8.96 15.69 8.92 16.1C8.89 16.48 8.56 16.77 8.18 16.77ZM18.45 14.59L16.26 16.89C15.48 17.71 14.43 18.17 13.31 18.17C12.19 18.17 11.14 17.72 10.36 16.89C8.76 15.21 8.76 12.48 10.36 10.8L11.45 9.65C11.74 9.35 12.21 9.34 12.51 9.62C12.81 9.91 12.82 10.38 12.54 10.68L11.45 11.83C10.39 12.94 10.39 14.75 11.45 15.85C12.44 16.89 14.18 16.9 15.18 15.85L17.37 13.55C18.43 12.44 18.43 10.63 17.37 9.53C16.94 9.07 16.36 8.79 15.75 8.73C15.34 8.69 15.04 8.32 15.08 7.91C15.12 7.5 15.48 7.19 15.9 7.24C16.87 7.34 17.78 7.78 18.46 8.5C20.05 10.17 20.05 12.91 18.45 14.59Z"
        fill="#2F3454"
      />
    </svg>
  );
}

function SocialButtonWrapper(props: { children?: ReactNode; onclick: () => void }) {
  return (
    <button
      onClick={props.onclick}
      className="w-10 h-10 rounded-lg border-[1px] border-darker-gray flex justify-center items-center"
    >
      {props.children}
    </button>
  );
}
