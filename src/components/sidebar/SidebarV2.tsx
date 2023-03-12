import { memo, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "redux/hooks/redux-hooks";
import { RootState } from "app/store";

import { ReactComponent as OutdefineLogo } from "assets/svg/dark-logo.svg";

// menu data from constants
import { menu_data } from "constants/sidebarv2";
import ItemV2 from "./ItemV2";
import { mixpanel_track } from "helpers/mixpanel";
import MobileTopBar from "./MobileTopBar";
import useLogOut from "hooks/useLogOut";
import { AvatarWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";

const SidebarV2: React.FC = (): ReactElement => {
  const user = useAppSelector((root: RootState) => root.authentication);
  const userRole = user.userRole.toLowerCase();
  const logOut = useLogOut();
  const talentProfile = useAppSelector((root) => root.profile);
  const companyProfile = useAppSelector((root) => root.companyprofile);

  // === Calculate Profile data based on what kind of user is logged in ====
  let avatarUrl;
  let background;
  let to;
  let onProfileClick;
  let name;
  let role;
  switch (userRole) {
    case "client":
      avatarUrl = companyProfile?.company?.logo;
      to = "/company";
      onProfileClick = () => mixpanel_track(`Navigation to Company Profile clicked`);
      name = companyProfile.company.name;
      role = companyProfile.company.industry;
      break;
    case "freelancer":
      avatarUrl = talentProfile?.User?.avatar;
      background = talentProfile?.User?.background_number;
      to = "/profile";
      onProfileClick = () => mixpanel_track(`Navigation to Profile clicked`);
      name = talentProfile?.first_name + " " + talentProfile?.last_name;
      role = talentProfile?.Role?.name;
      break;
    default:
      break;
  }

  // === Separete into subcomponents ===
  const MyClientProfileOption = () => {
    return (
      <div className="mt-4 flex flex-col gap-[36px] w-full px-4">
        <ItemV2
          link={"/company/myprofile"}
          text={"My Profile"}
          data={[]}
          dotIcon={true}
          onClick={() => {
            mixpanel_track(`Navigation to My Client Profile clicked`);
          }}
        />
      </div>
    );
  };

  const MainOptions = menu_data[userRole]?.mainlinks.map((elem, index) => (
    <ItemV2
      key={"mainlink" + index}
      link={elem.link}
      text={elem.text}
      data={elem?.children}
      onClick={() => {
        mixpanel_track(`Navigation to ${elem.text} clicked`);
      }}
    />
  ));

  const OtherOptions = menu_data[userRole]?.otherlinks.map((elem, index) => (
    <ItemV2
      key={"otherlink" + index}
      link={elem.link}
      text={elem.text}
      data={elem?.children}
      onClick={() => {
        mixpanel_track(`Navigation to ${elem.text} clicked`);
      }}
    />
  ));

  const AvatarIcon = (
    <AvatarWithDefaultV2 src={avatarUrl} background={background} className="rounded-full" />
  );

  const LogOutOption = (
    <ItemV2 onClick={logOut} addClass="md:mt-[6px]" text="logout" link="#logout" />
  );

  return (
    <>
      {/* DESKTOP */}
      <nav
        className="min-w-[210px] 2xl:min-w-[290px] overflow-x-hidden min-h-screen max-h-screen
     overflow-auto bg-white pt-[28px] pb-5 z-10 no-scroll
      shadow-[0_0_3px_0_rgb(0_0_0_/_12%),_0_2px_3px_0_rgb(0_0_0_/_22%)] hidden md:block"
      >
        <NavLink
          to="/"
          className="flex ml-8 2xl:ml-14 gap-4 items-center font-montserrat font-extrabold text-[15px] leading-[150%] tracking-[0.05em] text-odf"
        >
          <OutdefineLogo className="w-6 h-6" />
          outdefine
        </NavLink>

        {/* Profile section */}
        <NavLink
          to={to}
          className="hidden md:flex mt-[88px] pl-6 items-start gap-4"
          onClick={onProfileClick}
        >
          <div className="w-10 h-10 max-w-[40px] max-h-[40px] rounded-full overflow-hidden">
            {AvatarIcon}
          </div>
          <p>
            <span className="block text-[#201000] font-poppins font-semibold text-base break-words max-w-[130px] min-h-[24px]">
              {name}
            </span>
            <span className="block text-dark-gray font-semibold text-sm leading-[21px] max-w-[100px] break-words">
              {role}
            </span>
          </p>
        </NavLink>
        {userRole === "client" && <MyClientProfileOption />}

        <div className="mt-11 flex flex-col gap-[36px] w-full px-4">
          {MainOptions}
          <hr className="border-odf/50 h-[2px]" />
          {OtherOptions}
          {LogOutOption}
        </div>
      </nav>

      {/* MOBILE */}
      <div className="md:hidden z-50">
        <MobileTopBar />
        <nav className="flex justify-evenly w-full h-[55px] bg-white py-[8px] fixed top-[calc(100vh-55px)]">
          <ItemV2
            onClick={onProfileClick}
            customeIcon={avatarUrl ? AvatarIcon : undefined}
            text={avatarUrl ? "custome" : "logo"}
            link={to}
          />
          {OtherOptions}
          {LogOutOption}
        </nav>
      </div>
    </>
  );
};

export default memo(SidebarV2);
