import { ReactElement, useEffect } from "react";
import { RootState } from "app/store";
import { useSelector } from "react-redux";
import { AvatarWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";
import { ReactComponent as OdfTokenSvg } from "assets/V2/common/odf-token.svg";
import TypographyV2 from "components/Typography/TypographyV2";
import { getReferrals } from "redux/slices/token";
import { useAppDispatch } from "redux/hooks/redux-hooks";

const ReferralHistoryPanelV2: React.FC = (): ReactElement => {
  const userId = useSelector((root: RootState) => root.authentication.userId);
  const token = useSelector((root: RootState) => root.token);
  const referralsHistory: any = token.referralsHistory;
  console.log(referralsHistory);
  const referral_status: Record<any, any> = {
    PENDING: "INVITED",
    SIGNEDUP: "SIGNED UP",
    TRUSTED: "TRUSTED",
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReferrals(parseInt(userId)));
    return () => {};
  }, []);

  return (
    <div className="pt-9 pb-7 px-4">
      <div className="relative max-h-[560px] min-h-[560px] overflow-auto pr-2 auto-hide-scrollbar-parent">
        {token.is_busy && (
          <div className="lds-ripple absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="border-coral-red border-[4px]"></div>
            <div className="border-coral-red border-[4px]"></div>
          </div>
        )}

        {referralsHistory?.referralHistory?.length === 0 && (
          <div className="mt-32 px-9">
            <img src={"common/spaceboy/refer_friend_astros.png"} alt="refer friend astros" />
            <TypographyV2
              variant="p1"
              className="mt-8 text-center font-poppins font-bold !text-base leading-6"
            >
              Start referring friends to Outdefine
            </TypographyV2>
            <p className="font-inter text-xs leading-[18px] mt-[30px] text-center">
              Refer friends by inviting them to the platform. For every trusted referral you will
              earn <OdfTokenSvg className="inline w-5 h-5" /> 250 tokens.
            </p>
          </div>
        )}

        {referralsHistory?.referralHistory?.map((elem, index) => (
          <div
            key={elem.email + index}
            className="flex px-2 py-3 justify-between border-b-[1px] border-b-[#8A8A8A] last:border-none"
          >
            <div className="flex gap-2 items-center">
              <div className="w-[50px] h-[50px]">
                <AvatarWithDefaultV2 />{" "}
              </div>
              <div className="w-[150px]">
                <span
                  title={elem.email}
                  className="cursor-default block mt-[6px] text-xs leading-[18px] pb-1 font-inter whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {elem.email}
                </span>
              </div>
            </div>

            <div className="font-semibold text-xs flex flex-grow flex-col items-end justify-between font-inter text-[#8A8A8A]">
              Tokens
              <div className="h-[16px] flex w-full pl-2 justify-between text-xs leading-[18px] items-center font-semibold font-inter text-black">
                <span className="first-letter:capitalize w-full text-end">
                  {["TRUSTED", "HIRED"].includes(elem?.referral_status) ? (
                    <div className="flex gap-x-2 justify-end">
                      <OdfTokenSvg className="shrink-0" />
                      {elem?.referral_status === "HIRED" ? 2500 : 250}
                    </div>
                  ) : elem?.referral_status === "PENDING" ? (
                    referral_status["PENDING"].toLocaleLowerCase()
                  ) : (
                    "Pending"
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralHistoryPanelV2;
