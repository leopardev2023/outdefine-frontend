import { useLocation } from "react-router-dom";

import { DASHBOARD } from "constants/sidebar";
import DashboardIcon from "./icons/dashboard";
import JobIcon from "./icons/talent-job";
import AssessmentIcon from "./icons/talent-assessment";
import AccountIcon from "./icons/talent-account";
import LogoutIcon from "./icons/logout";
import TokenIcon from "./icons/talent-token";
import MessageIcon from "./icons/message";
import SettingIcon from "./icons/setting";
import CustomeIcon from "./icons/customeIcon";
import LogoIcon from "./icons/logo";

interface IconType {
  active: boolean;
  item: string;
  customeItem?: JSX.Element; // customed Icon element
  dotIcon?: boolean;
  groupActive?: boolean;
  light?: boolean; // set if you want fixed color style
}

const NavIconV2 = ({ active, item, groupActive, dotIcon, light, customeItem }: IconType) => {
  const path = useLocation().pathname;
  const sub_active =
    path.split("/")[1] === item || (path === "/" && item === DASHBOARD);
  const _active = sub_active && path.split("/")[2] === undefined;
  let lightStatus = _active || active || groupActive;
  lightStatus = light !== undefined ? light : lightStatus;

  const icons = {
    dashboard: <DashboardIcon light={lightStatus} />,
    jobs: <JobIcon light={lightStatus} />,
    assessments: <AssessmentIcon light={lightStatus} />,
    account: <AccountIcon light={lightStatus} />,
    tokens: <TokenIcon light={lightStatus} />,
    logout: <LogoutIcon light={lightStatus} />,
    logo: <LogoIcon light={lightStatus} />,
    talent: <JobIcon light={lightStatus} />,
    messages: <MessageIcon light={lightStatus} />,
    settings: <SettingIcon light={lightStatus} />,
    custome: <CustomeIcon children={customeItem} />,
  };

  if (dotIcon) {
    return (
      <span className='w-6 h-6 flex'>
        <span
          className={`w-2 h-2 m-auto rounded-full ${
            lightStatus ? "bg-white" : "bg-odf"
          }`}
        />
      </span>
    );
  }
  return (
    icons[item] ?? (
      <span className={"w-[24px] md:w-6 h-[24px] md:h-6 bg-odf rounded-full hover:bg-white"} />
    )
  );
};

export default NavIconV2;
