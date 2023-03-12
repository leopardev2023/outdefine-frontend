import * as Sentry from "@sentry/react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks/redux-hooks";

import Button from "components/Button/ButtonV2";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import TalentCardV2 from "../../components/Card.TalentV2";

import useTalentProfile from "../../hooks/useTalentProfile";

const WithDrawn = () => {
  const dispatch = useAppDispatch();
  const withdrawnList = useAppSelector((state) => state.application.withdrawnList);

  const [checkUser, setCheckUser] = useState<boolean>(false);

  const { goToTalentProfile, loading: redirectLoading } = useTalentProfile();

  useEffect(() => {
    setCheckUser(!(Array.isArray(withdrawnList) && withdrawnList?.length > 0));
  }, [withdrawnList]);

  return (
    <>
      {checkUser && (
        <EmptyPanelV2
          image={"/common/spaceboy/astronaut-celebrating.png"}
          title={"No applicants"}
          description={"Create job posts that talent can apply to."}
          imageClassName="w-[150px] h-[155px]"
          className="h-[440px] pt-16"
        >
          <NavLink to={"/talent"} className="mt-6">
            <Button>Find talent</Button>
          </NavLink>
        </EmptyPanelV2>
      )}
      {!checkUser && (
        <div className="flex flex-col justify-center gap-y-5 items-center bg-background">
          {withdrawnList?.length > 0 &&
            withdrawnList.map((item, index) => {
              return (
                <TalentCardV2 talent={{ ...item.FreelancerProfile, User: item.User }}>
                  <div className="flex gap-x-9 shadow-none">
                    <Button
                      onClick={() => goToTalentProfile(item.freelancer_id)}
                      type="button"
                      className="w-[160px] px-0"
                    >
                      Profile
                    </Button>
                  </div>
                </TalentCardV2>
              );
            })}
        </div>
      )}
    </>
  );
};
export default WithDrawn;
