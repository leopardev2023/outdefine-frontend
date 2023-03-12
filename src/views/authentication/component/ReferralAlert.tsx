import { useEffect, useState } from "react";
import { getCookie } from "utils/storageUtils";

export default function ReferralAlert() {
  const [code, setCode] = useState<string | undefined>();

  useEffect(() => {
    (() => {
      if (getCookie("referral_code")) {
        setCode(getCookie("referral_code"));
        return;
      }
      setTimeout(() => {
        const referralCode = getCookie("referral_code");
        if (referralCode) {
          setCode(referralCode);
        }
      }, 500);
    })();

    return () => {};
  }, []);

  if (!!code) {
    return (
      <div className="fixed top-0 left-0 z-20 w-full min-h-[64px] bg-[#D9D9FF] flex items-center flex-wrap px-10 lg:pl-16 lg:pr-0 py-2 lg:py-0">
        <b className="inline-block font-poppins font-semibold text-lg pr-2">{`You’ve been referred by ${
          code.split("-")[0]
        }`}</b>
        <span className="inline-block font-inter text-base">
          Become a trusted talent and earn{" "}
          <span className="text-blue2 font-semibold">500 Outdefine tokens, apply for jobs</span> and
          start <span className="text-blue2 font-semibold">owning your career</span>
        </span>
      </div>
    );
  }
  return <></>;
}
