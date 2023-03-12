import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

import Button from "components/Button/ButtonV2";
import Heading from "components/Heading/HeadingV2";
import EmptyPanelV2 from "views/client-application/profile/panels/Panel.EmptyV2";
import TalentBadgeCardV2 from "../componentsV2/Card.BadgeV2";

interface PropsType {
  userRole?: string;
}

export default function TalentCollectionV2({ userRole }: PropsType) {
  return (
    <EmptyPanelV2
      className={`h-[480px] mt-[54px] mb-20 pt-[54px] pb-20 flex flex-col ${
        userRole === "Client" ? "justify-center" : ""
      }`}
      image={"/common/spaceboy/astro-roller.png"}
      title={"No collections"}
      description={
        userRole === "Client"
          ? "There are no badges to show for this candidate."
          : "Earn your first badge when you complete your assessment!"
      }
    >
      {userRole !== "Client" && (
        <NavLink to="/assessments">
          <Button className="mt-5">Assessment</Button>
        </NavLink>
      )}
    </EmptyPanelV2>
  );
}
