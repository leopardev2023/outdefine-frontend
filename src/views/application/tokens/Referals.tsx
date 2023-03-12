import Button from "components/Button/ButtonV2";
import Heading from "components/Heading/HeadingV2";
import TypographyV2 from "components/Typography/TypographyV2";
import IconV2 from "components/V2/Icons/IconV2";
import { useState, useEffect } from "react";
import { Container } from "./components/Container";
import GradientBorderInputV2 from "views/application/dashboard/components/GradientBorderInputV2";
import { mixpanel_track } from "helpers/mixpanel";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "app/store";
import validateEmail from "helpers/validations/email";
import tokenAPI from "network/token";
import token, { getReferrals } from "redux/slices/token";
import moment from "moment";
import { AvatarWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";
import ReferralSocialShare from "../dashboard/components/SocialShare";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

const referalInstruction = [
  "Use the form below to invite as many friends as you’d like.",
  "You will receive 250 tokens for each of your friends who signs up and becomes trusted talent.",
];

const ENUM_REFERRAL_TYPE = ["INVITED", "SIGNEDUP", "TRUSTED"];

const referral_code: Record<any, any> = {
  PENDING: "Invited",
  SIGNEDUP: "Pending",
  TRUSTED: "Trusted",
};

type ReferalsProps = {
  items: {
    id: string;
    referralHistory: {
      email: string;
      referral_status: string;
      referralSentAt: Date;
      joinedAt: Date;
    }[];
  };
};

function InviteHistory(props: ReferalsProps) {
  const [allInviteClassName, setAllClassName] = useState<string>(
    "text-xs font-semibold font-poppins",
  );
  const [vettedClassName, setVettedClassName] = useState<string>("text-xs font-poppins");

  const [inviteHistory, setInviteHistory] = useState<ReferalsProps["items"]["referralHistory"]>(
    props.items.referralHistory,
  );

  function onClickHandler(classType: string) {
    if (classType == "All") {
      setAllClassName("text-xs font-semibold font-poppins");
      setVettedClassName("text-xs font-normal font-poppins");
      setInviteHistory(props.items.referralHistory);
    } else {
      setAllClassName("text-xs font-normal font-poppins");
      setVettedClassName("text-xs font-semibold font-poppins");
      setInviteHistory(
        inviteHistory &&
          inviteHistory.filter(function (el) {
            return el.referral_status == ENUM_REFERRAL_TYPE[2];
          }),
      );
    }
  }
  if (
    props == null ||
    props.items == null ||
    props.items.referralHistory == null ||
    props.items.referralHistory.length === 0
  ) {
    return <div />;
  }
  return (
    <div className="flex flex-col gap-y-10">
      <TypographyV2 variant="caption" className="text-sm font-semibold font-poppins">
        Friends you have referred
      </TypographyV2>
      <div className="w-full border border-dark-gray rounded-lg pb-12">
        <div className="m-5 flex flex-row gap-x-8">
          <div
            className={`cursor-pointer ${allInviteClassName}`}
            onClick={function () {
              onClickHandler("All");
            }}
          >
            All invites
          </div>
          <div
            className={`cursor-pointer ${vettedClassName}`}
            onClick={function () {
              onClickHandler("vetted");
            }}
          >
            Trusted Members
          </div>
        </div>

        {inviteHistory?.map((token) => (
          <div className="m-5 border border-dark-gray rounded-lg" key={token.email}>
            <div className="m-2 flex flex-row gap-x-2">
              <div className="w-7 h-7 xl:w-14 xl:h-14 shrink-0 self-center">
                <AvatarWithDefaultV2 />{" "}
              </div>
              <div className="relative w-full flex flex-col justify-center px-2 pt-4 md:px-4 md:pt-0 lg:pl-8 lg:pr-28">
                <div className="absolute top-0 right-0 flex gap-x-[5px]"></div>
                <div className="flex flex-row items-center justify-between flex-wrap xl:flex-nowrap">
                  <div className="flex flex-row items-center w-[250px]">
                    <TypographyV2
                      variant="caption"
                      className="grow font-poppins text-sm font-bold leading-[150%] whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {token.email}
                    </TypographyV2>
                  </div>
                  <div className="flex flex-col items-center gap-x-3">
                    <TypographyV2
                      variant="label"
                      className="text-xs font-semibold font-inter leading-[150%] text-dark-gray"
                    >
                      Invited
                    </TypographyV2>
                    <TypographyV2
                      variant="caption"
                      className="text-xs font-semibold font-inter leading-[150%] text-[#2D2F33]"
                    >
                      {moment(token.referralSentAt).format("MM/DD/YY")}
                    </TypographyV2>
                  </div>
                  <div className="flex flex-col items-center gap-x-3">
                    <TypographyV2
                      variant="label"
                      className="text-xs font-semibold font-inter leading-[150%] text-dark-gray"
                    >
                      Joined
                    </TypographyV2>
                    <TypographyV2
                      variant="caption"
                      className="text-xs font-semibold font-inter leading-[150%] text-[#2D2F33]"
                    >
                      {token.joinedAt ? moment(token.joinedAt).format("MM/DD/YY") : "--"}
                    </TypographyV2>
                  </div>
                  <div className="flex flex-col items-center gap-x-3">
                    <TypographyV2
                      variant="label"
                      className="text-xs font-semibold font-inter leading-[150%] text-dark-gray"
                    >
                      Status
                    </TypographyV2>
                    <TypographyV2
                      variant="caption"
                      className="first-letter:capitalize text-xs font-semibold font-inter leading-[150%] text-[#2D2F33]"
                    >
                      {referral_code[token.referral_status]}
                      {/* {token.referral_status === "PENDING" ? "Invited" : }
                      {token.referral_status.toLowerCase().replace("pending", "Invited")} */}
                    </TypographyV2>
                  </div>
                  <div className="flex flex-col items-center gap-x-3">
                    <TypographyV2
                      variant="label"
                      className="text-xs font-semibold font-inter leading-[150%] text-dark-gray"
                    >
                      Tokens
                    </TypographyV2>
                    <TypographyV2
                      variant="caption"
                      className="flex w-full gap-x-1 text-xs font-semibold leading-[150%]"
                    >
                      <IconV2 iconType="DOLLAR" iconClassName="w-[16px] h-[16px]" />
                      {token.referral_status == ENUM_REFERRAL_TYPE[2] ? 250 : 0}
                    </TypographyV2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Referals() {
  const userId = useSelector((root: RootState) => root.authentication.userId);
  const [emails, setEmails] = useState<Array<string>>([]);
  const [pending, setPending] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>("");
  const token = useSelector((root: RootState) => root.token);
  const dispatch = useDispatch<AppDispatch>();
  const referralsHistory: any = token.referralsHistory;

  useEffect(() => {
    dispatch(getReferrals(parseInt(userId)));
  }, [dispatch]);

  const inviteBatchHandler = async () => {
    if (emails.length <= 0 && !validateEmail(currentValue)) return;
    setPending(true);
    const result = await tokenAPI.inviteFriends(
      Number(userId),
      emails.length === 0 ? [currentValue] : emails,
    );
    setPending(false);
    mixpanel_track("Talent referral", {
      referrals: emails,
    });
    if (result.data.status === 500) {
      toast.custom(<Toast type="error" message={result.data.message} />);
      return;
    }
    setCurrentValue("");
    toast.custom(<Toast type="success" message="Invite success!" />);
    setEmails([]);
  };
  return (
    <Container className="bg-white rounded">
      <div className="flex flex-col gap-y-6">
        <Heading variant="h6" className="text-xl font-semibold font-poppins">
          Refer a friend
        </Heading>
        <TypographyV2 variant="caption" className="text-base font-semibold font-poppins">
          Earn more tokens when you refer a friend
        </TypographyV2>
        <TypographyV2 variant="caption" className="text-sm font-normal font-poppins">
          Follow the instructions below:
        </TypographyV2>

        <ul className="pl-2 text-xs list-disc mx-2 font-inter">
          {referalInstruction.map((list, index) => (
            <li key={list.slice(0, 10) + index} className="mb-6">
              {list}
            </li>
          ))}
        </ul>
        <div className="w-[260px]">
          <ReferralSocialShare />
        </div>
        <div className="flex flex-col gap-y-3">
          <TypographyV2 variant="caption" className="text-xs font-normal font-inter">
            Type your friend’s email followed by the space bar to add as many friends as you like.
          </TypographyV2>
          <GradientBorderInputV2
            currentValue={currentValue}
            data={emails}
            onChange={(_emails: Array<string>) => setEmails(_emails)}
            onCurrentChange={(value: string) => setCurrentValue(value)}
          />
          <Button
            disabled={emails.length === 0 ? (!validateEmail(currentValue) ? true : false) : false}
            loading={pending}
            onClick={inviteBatchHandler}
            className="ml-auto"
          >
            Send invite
          </Button>
        </div>
        <InviteHistory items={referralsHistory} />
      </div>
    </Container>
  );
}
