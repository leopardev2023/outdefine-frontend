import * as React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "redux/hooks/redux-hooks";

import { RootState } from "app/store";
import { mixpanel_track } from "helpers/mixpanel";
import useClickOutside from "hooks/utils/clickOutsideHook";
import { menu_data } from "constants/sidebarv2";
import NavIconV2 from "./IconsV2";
import IconV2 from "components/V2/Icons/IconV2";
import { ReactComponent as OutdefineLogo } from "assets/svg/dark-logo.svg";
import useWindowDimensions from "hooks/utils/useWindowDimensions";

// Utility component for the MobileTopBar only
const ContextMenuOption = ({ onClick, option }) => {
  const { text, link, children } = option;
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpenClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <NavLink
        className="rounded hover:bg-[#F0F1F2] px-5 py-3 flex w-full"
        to={link}
        onClick={onClick}
      >
        <NavIconV2 active={false} item={text.toLocaleLowerCase()} light={false} />
        <span className="ml-[10px] font-inter text-[14px]">{text}</span>
        {children && (
          <div className="w-[50px] flex ml-auto" onClick={handleOpenClick}>
            <IconV2 iconType="ARROW-DOWN" iconClassName="w-[20px] ml-auto self-center" />
          </div>
        )}
      </NavLink>
      {open &&
        children.map((subOption) => (
          <NavLink
            className="rounded hover:bg-[#F0F1F2] px-8 py-3 flex w-full"
            to={`${link}/${subOption.link}`}
            onClick={onClick}
          >
            <NavIconV2 active={false} dotIcon item="" light={false} />
            <span className="ml-[10px] font-inter text-[14px]">{subOption.text}</span>
          </NavLink>
        ))}
    </>
  );
};

// Side Bar on the top of the screen to be displayed on mobile
const MobileTopBar = () => {
  const { isMobile } = useWindowDimensions();
  // This state is only used for the mobile version
  const [clickedProfile, setClickedProfile] = React.useState<boolean>(false);
  const profileRef = React.useRef<HTMLDivElement>(null);
  useClickOutside(profileRef, () => setClickedProfile(false));
  const user = useAppSelector((root: RootState) => root.authentication);
  const userRole = user.userRole.toLowerCase();

  // Get the main links
  const mainLinks = menu_data[userRole]?.mainlinks;

  return (
    <>
      {/* MOBILE   h-[6vh] is not neccessary because this component will be invisible for 768+px devices, refer SidebarV2.tsx */}
      <div
        className={`fixed bg-background w-screen px-5 py-5 top-0 left-0 h-[66px]`}
        ref={profileRef}
      >
        <div
          className="h-full hover:cursor-pointer"
          onClick={() => setClickedProfile(!clickedProfile)}
        >
          <IconV2 iconType="HAMBURGER" />
          <div
            className="font-montserrat font-extrabold text-odf select-none absolute left-1/2"
            style={{ transform: "translate(-55%, -128%)" }}
          >
            <div className="flex">
              <OutdefineLogo className="w-6 h-6 mr-3" />
              outdefine
            </div>
          </div>
        </div>
        {clickedProfile && (
          <div className="absolute top-[6vh] left-[10px] bg-white px-2 py-1 rounded z-10">
            {mainLinks.map((option) => (
              <ContextMenuOption
                option={option}
                onClick={() => mixpanel_track(`Navigation to ${option.text} clicked`)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MobileTopBar;
