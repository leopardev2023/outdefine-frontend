import { ReactElement, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import tokenAPI from "network/token";

import toast from "react-hot-toast";
import Toast from "components/Toast/Toast";

import Button from "components/Button/ButtonV2";
import TypographyV2 from "components/Typography/TypographyV2";
import GradientBorderInputV2 from "./GradientBorderInputV2";
import validateEmail from "helpers/validations/email";
import { mixpanel_track } from "helpers/mixpanel";
import object from "helpers/object";
import IconButtonV2 from "components/V2/IconButton/IconButtonV2";
import { isProduction } from "helpers/env";
import ReferralSocialShare from "./SocialShare";

const lists = [
  "Use the form below to invite as many friends as you’d like.",
  "Invite your friends to join and earn 250 tokens per referral when they sign up and become trusted members.",
];

const InviteFriendPanelV2: React.FC = (): ReactElement => {
  const userId = useSelector((root: RootState) => root.authentication.userId);
  const [emails, setEmails] = useState<Array<string>>([]);
  const [pending, setPending] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>("");

  const [collapsed, setCollapsed] = useState<boolean>(true);

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
    toast.custom(<Toast type="success" message="Invitation successed." />);
    setEmails([]);
  };

  return (
    <div className="pt-10 px-9 font-inter">
      <div className="">
        <TypographyV2 variant="subtitle2" className="font-bold font-poppins text-base">
          Refer friends and earn tokens!
        </TypographyV2>
      </div>
      <ul className=" mt-[52px] text-xs list-disc mx-2">
        {lists.map((list, index) => (
          <li key={list.slice(0, 10) + index} className="mb-6">
            {list}
          </li>
        ))}
      </ul>

      <ReferralSocialShare />

      <p className="mt-8 text-xs flex items-center gap-7">
        Send referrals to a group of people by email{" "}
        <IconButtonV2
          onClick={() => setCollapsed(!collapsed)}
          iconType="TRIANGLE-ARROW-SOLID"
          className={`p-0 ${collapsed ? "rotate-180" : ""}`}
        />
      </p>

      {!collapsed && (
        <>
          <p className="mt-5 text-xs">
            Add your friend’s email by typing their email followed by the Enter, repeat to add more.
          </p>
          <div className="mt-2">
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
              className="w-full mt-4"
            >
              Invite friends
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default InviteFriendPanelV2;
