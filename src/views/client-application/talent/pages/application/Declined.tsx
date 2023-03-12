import * as Sentry from "@sentry/react";
import { NavLink } from "react-router-dom";
import Button from "components/Button/ButtonV2";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import TalentCardV2 from "../../components/Card.TalentV2";

import useTalentProfile from "../../hooks/useTalentProfile";

interface PropsType {
  appList?: any;
  loading?: boolean;
}

const Declined = ({ appList, loading = true }: PropsType) => {
  const { goToTalentProfile, loading: redirectLoading } = useTalentProfile();

  return (
    <div className="">
      {appList?.length <= 0 && (
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
      {appList?.length > 0 && (
        <div className="flex flex-col justify-center gap-y-5 items-center bg-background">
          {appList.map((item) => (
            <TalentCardV2 key={item.id} talent={{ ...item.FreelancerProfile, User: item.User }}>
              <div className="flex gap-x-9 shadow-none">
                <Button
                  onClick={() => goToTalentProfile(item.freelancer_id)}
                  loading={loading}
                  type="button"
                  className="w-[160px] px-0"
                >
                  Profile
                </Button>
              </div>
            </TalentCardV2>
          ))}
        </div>
      )}
    </div>
  );
};

export default Declined;
